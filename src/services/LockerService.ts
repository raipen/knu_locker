import { Students, Applied, Allocated, Lockers } from '../models';
import config from '../config';
import axios from 'axios';
import jsonBigint from 'json-bigint';
import { DeadLineError, ValidationError, StudentNotFoundError,
  StudentAlreadyAppliedError, PhoneAlreadyAppliedError,
  KakaoIdAlreadyAppliedError, NoResultsError } from '../errors';

type UserDTO = {
  name: string;
  studentId: string;
};

type applyDTO = {
  name: string;
  studentId: string;
  phone: string;
  first_floor: number;
  first_height: number;
  second_floor: number;
  second_height: number;
};

const validateApplyDTO = (applyDTO: applyDTO) => {
  if(applyDTO.name === undefined || applyDTO.studentId === undefined || applyDTO.phone === undefined) throw new ValidationError();
  if(applyDTO.first_floor === undefined || applyDTO.first_height === undefined || applyDTO.second_floor === undefined || applyDTO.second_height === undefined) throw new ValidationError();
  if(/^[가-힣| ]+$/.test(applyDTO.name) === false) throw new ValidationError();
  if(/^[0-9]{10}$/.test(applyDTO.studentId) === false) throw new ValidationError();
  if(/^010\d{8}$/.test(applyDTO.phone) === false) throw new ValidationError();
  if([-1,1,3].includes(applyDTO.first_floor) === false) throw new ValidationError();
  if([-1,1,3].includes(applyDTO.second_floor) === false) throw new ValidationError();
  if(applyDTO.first_height < 1 || applyDTO.first_height > 5) throw new ValidationError();
  if(applyDTO.second_height < 1 || applyDTO.second_height > 5) throw new ValidationError();
}

const validateKakaoAccessToken = (kakaoAccessToken: string) => {
  if(kakaoAccessToken === undefined || kakaoAccessToken === "") throw new ValidationError();
}

export const apply = async (userDTO: applyDTO, kakaoAccessToken: string) => {
  validateApplyDTO(userDTO);
  validateKakaoAccessToken(kakaoAccessToken);
  const now = new Date();
  const deadline = new Date(config.DEAD_LINE);
  if (now > deadline) throw new DeadLineError();

  const phone = userDTO.phone;
  if (phone === undefined || !(/^010\d{8}$/.test(phone))) throw new ValidationError();

  // Check if the student is already applied
  if (!(await isStudent(userDTO))) throw new StudentNotFoundError();
  if (await isAppledStudent(userDTO.studentId)) throw new StudentAlreadyAppliedError();
  if (await isAppledPhone(phone)) throw new PhoneAlreadyAppliedError();

  const { id } = (await axios.get<{id:bigint}>('https://kapi.kakao.com/v1/user/access_token_info', {
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`
    },
    transformResponse: [data=>jsonBigint.parse(data)]
  })).data;
  if (await isAppledKakaoId(id.toString())) throw new KakaoIdAlreadyAppliedError();

  await Applied.create({
    student_id: userDTO.studentId,
    phone: phone,
    kakao_id: id.toString(),
    first_floor: userDTO.first_floor,
    first_height: userDTO.first_height,
    second_floor: userDTO.second_floor,
    second_height: userDTO.second_height,
  });
  await axios.post('https://kapi.kakao.com/v1/user/logout', undefined, {
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`
    }
  });
  return { success: true };
}

const isStudent = async ({ name, studentId }: UserDTO) => {
  let result = await Students.findOne({
    where: {
      name: name,
      student_id: studentId
    }
  });
  if (result) return true;
  return false;
}

const isAppledStudent = async (studentId: string) => {
  let result = await Applied.findOne({
    where: {
      student_id: studentId
    }
  });
  if (result) return true;
  return false;
}

const isAppledPhone = async (phone: string) => {
  let result = await Applied.findOne({
    where: {
      phone: phone
    }
  });
  if (result) return true;
  return false;
}

const isAppledKakaoId = async (kakaoId: string) => {
  let result = await Applied.findOne({
    where: {
      kakao_id: kakaoId
    }
  });
  if (result) return true;
  return false;
}

export const result = async (kakaoAccessToken: string) => {
  validateKakaoAccessToken(kakaoAccessToken);
  const { id:kakaoId } = (await axios.get<{id:bigint}>('https://kapi.kakao.com/v1/user/access_token_info', {
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`
    },
    transformResponse: [data=>jsonBigint.parse(data)]
  })).data;
  const result = await Applied.findOne({
    where: {
      kakao_id: kakaoId.toString()
    }
  });
  if (!result) throw new NoResultsError();
  const { student_id: studentId } = result;
  const allocate = await Allocated.findOne({
    where: {
      student_id: studentId
    },
    include: [{
      model: Lockers,
      attributes: ['pw'],
    }]
  }) as any;
  if (!allocate) throw new NoResultsError();
  
  return {
    locker: allocate.locker,
    password: allocate.locker_info.pw,
  };
}

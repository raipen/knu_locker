import { Students, Applied, Allocated, Lockers } from '../models';
import config from '../config';
import axios from 'axios';
import jsonBigint from 'json-bigint';

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

export const apply = async (userDTO: applyDTO, cookies: any) => {
  const now = new Date();
  const deadline = new Date(config.DEAD_LINE);
  if (now > deadline) throw new Error("Application deadline has passed");

  const phone = userDTO.phone;
  if (phone === undefined || !(/^010\d{8}$/.test(phone))) throw new Error("Phone number is not verified");

  // Check if the student is already applied
  if (!(await isStudent(userDTO))) throw new Error("Student is not found");
  if (await isAppledStudent(userDTO.studentId)) throw new Error("Already applied student");
  if (await isAppledPhone(phone)) throw new Error("Already applied phone number");

  const kakaoAccessToken = cookies.access_token;
  console.log(kakaoAccessToken);
  const { id } = (await axios.get<{id:bigint}>('https://kapi.kakao.com/v1/user/access_token_info', {
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`
    },
    transformResponse: [data=>jsonBigint.parse(data)]
  })).data;
  console.log(id);
  if (await isAppledKakaoId(id.toString())) throw new Error("Already applied kakao id");

  await Applied.create({
    student_id: userDTO.studentId,
    phone: phone,
    kakao_id: id.toString(),
    first_floor: userDTO.first_floor,
    first_height: userDTO.first_height,
    second_floor: userDTO.second_floor,
    second_height: userDTO.second_height,
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

export const result = async (kakaoId: string) => {
  const result = await Applied.findOne({
    where: {
      kakao_id: kakaoId
    }
  });
  if (!result) throw new Error("No results found");
  const { student_id: studentId } = result;
  const allocate = await Allocated.findOne({
    where: {
      student_id: studentId
    },
    include: [{
      model: Lockers,
      attributes: ['pw'],
    }]
  });
  if (!allocate) throw new Error("No results found");
  console.log(allocate);
  return {
    locker: allocate.locker,
  };
}

export const status = async () => {
  let deadline = new Date(config.DEAD_LINE);
  let nextDayOfDeadline = new Date(deadline.getTime() + 24 * 60 * 60 * 1000);

  return [{
    isDisabled: new Date() > deadline || new Date() < new Date(config.START_DATE),
    date: new Date() > deadline || new Date() < new Date(config.START_DATE) ? "신청기간이 아닙니다." : ("~" + config.DEAD_LINE),
  },
  {
    isDisabled: true /*new Date() > new Date(CLEAN_DEAD_LINE)*/,
    date: "신청기간이 아닙니다." /*+CLEAN_DEAD_LINE*/,
  },
  {
    isDisabled: new Date() < nextDayOfDeadline,
    date: (new Date(nextDayOfDeadline.getTime() + 9 * 60 * 60 * 1000)).toISOString().substring(0, 19).replace('T', ' ') + "~",
  }];
}

import { Students, Applied, Allocated, Lockers } from '../models';
import config from '../config';
import axios from 'axios';

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

export const checkDues = async (userDTO: { name: string, number: string }) => {
  const result = await Students.findOne({
    where: {
      name: userDTO.name,
      student_id: userDTO.number
    }
  });
  if (result) return { success: true, isStudent: true, dues: result.dues === 1 }
  return { success: true, isStudent: false }
}

export const checkStudent = async (userDTO: UserDTO) => {
    const result = await Students.findOne({
      where: {
        name: userDTO.name,
        student_id: userDTO.studentId
      }
    });
    if (result) return { isStudent: true };

    const noStudentIdResult = await Students.findOne({
      where: {
        name: userDTO.name,
        student_id: null
      }
    });
    if (noStudentIdResult === null) throw new Error("No results found");

    const update = await Students.update({ student_id: userDTO.studentId }, { where: { name: userDTO.name, student_id: null } });

    if (update) return { isStudent: true };
    throw new Error("Update failed");
}

export const apply = async (userDTO: applyDTO, cookies: any) => {
  const now = new Date();
  const deadline = new Date(config.DEAD_LINE);
  if (now > deadline) throw new Error("Application deadline has passed");

  const phone = cookies.phone;
  if (phone === undefined || !(/^010\d{8}$/.test(phone))) throw new Error("Phone number is not verified");

  // Check if the student is already applied
  if (!(await isStudent(userDTO))) throw new Error("Student is not found");
  if (await isAppledStudent(userDTO.studentId)) throw new Error("Already applied student");
  if (await isAppledPhone(phone)) throw new Error("Already applied phone number");

  const kakaoAccessToken = cookies.access_token;
  //TODO: Check isAppled KakaoId

  await Applied.create({
    student_id: userDTO.studentId,
    phone: phone,
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

export const fetchApply = async (userDTO: UserDTO) => {
  if (!await isStudent(userDTO))
    throw new Error("Student is not found");
  const allocate = await Allocated.findOne({
    where: {
      student_id: userDTO.studentId
    },
    include: [{
      model: Applied,
      attributes: ['phone'],
    }, {
      model: Lockers,
      attributes: ['pw'],
    }]
  });
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

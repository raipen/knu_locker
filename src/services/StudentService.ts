import { Students } from '../models';
import { StudentUpdateError } from '../errors';

export const checkDues = async (userDTO: {
  name: string, number: string
}) => {
  const result = await Students.findOne({
    where: {
      name: userDTO.name,
      student_id: userDTO.number
    }
  });
  if (result) return { success: true, isStudent: true, dues: result.dues === 1 }
  return { success: true, isStudent: false }
}

export const checkStudent = async (userDTO: {
  name: string;
  studentId: string;
}) => {
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
    if (noStudentIdResult === null) return { isStudent: false };

    const update = await Students.update({ student_id: userDTO.studentId }, { where: { name: userDTO.name, student_id: null } });

    if (update) return { isStudent: true };
    throw new StudentUpdateError();
}

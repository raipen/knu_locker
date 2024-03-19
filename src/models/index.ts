import { Sequelize } from 'sequelize';
import config from '../config';
import Allocate,{AllocateModel} from './Allocate';
import Apply,{ApplyModel} from './Apply';
import Locker,{LockerModel} from './Locker';
import Student,{StudentModel} from './Student';
const DBconfig = config.DB;

const sequelize = new Sequelize(DBconfig.database, DBconfig.username, DBconfig.password, {
  host: DBconfig.host,
  dialect: DBconfig.dialect,
});

const Allocated = sequelize.define<AllocateModel>(...Allocate);
const Applied = sequelize.define<ApplyModel>(...Apply);
const Lockers = sequelize.define<LockerModel>(...Locker);
const Students = sequelize.define<StudentModel>(...Student);

Students.hasOne(Applied, {foreignKey: 'student_id', sourceKey: 'student_id'});
Applied.belongsTo(Students, {foreignKey: 'student_id', targetKey: 'student_id'});

Applied.hasOne(Allocated, {foreignKey: 'student_id', sourceKey: 'student_id', as: 'allocate'});
Allocated.belongsTo(Applied, {foreignKey: 'student_id', targetKey: 'student_id'});

Lockers.hasOne(Allocated, {foreignKey: 'locker', sourceKey: 'locker', as: 'allocate'});
Allocated.belongsTo(Lockers, {foreignKey: 'locker', targetKey: 'locker'});

export default sequelize;
export { Students, Applied, Allocated, Lockers };

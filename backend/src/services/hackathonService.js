const Sequelize = require('sequelize');
const teamModel = require('../models/HackathonTeam');
const memberModel = require('../models/HackathonMember');

class UserService {
    async status() {
        let teamCount = await teamModel.count();
        let memberCount = await memberModel.count();
        return {
            success: true,
            team: teamCount,
            applicant: memberCount
        };
    }

    async teamList() {
        let result = await teamModel.findAll({});
        return result;
    }

    async memberList() {
        let result = await memberModel.findAll({});
        return result;
    }

    async apply(userDTO) {
        if (!this.checkTeamName(userDTO.team))
            throw new Error("팀 이름을 입력해주세요.");
        
        var teamName = userDTO.team.trim();
        //teamName 중복 확인 from DB
        let team = await teamModel.findOne({
            where: {
                team: teamName
            }
        });
        if (team != null)
            throw new Error("이미 존재하는 팀 이름입니다.");

        //leader 정보 확인
        let leader = this.readLeaderInfo(teamName, userDTO.member[0]);
        if (!this.checkLeaderInfo(leader))
            throw new Error("팀장 정보를 확인해주세요.");

        //member 정보 확인
        let member = [];
        for (let i = 1; i < userDTO.member.length; i++) {
            let temp = this.readMemberInfo(teamName, userDTO.member[i]);
            if (!this.checkMemberInfo(temp))
                throw new Error("팀원 정보를 확인해주세요.");
            member.push(temp);
        }

        //DB에 저장
        await teamModel.create({
            team: teamName
        });
        await memberModel.create({
            team: teamName,
            name: leader[1],
            student_number: leader[2],
            member_type: leader[3],
            phone_number: leader[4],
            github: leader[5]
        });
        for (let i = 0; i < member.length; i++) {
            await memberModel.create({
                team: member[i][0],
                name: member[i][1],
                student_number: member[i][2],
                member_type: member[i][3],
                department: member[i][4]
            });
        }
        return {
            success: true
        };
    }

    checkTeamName(team) {
        if (team == undefined || team == null) return false;
        if (team.trim() == "") return false;
        return true;
    }

    readLeaderInfo(teamName, leader) {
        if (leader == undefined || leader == null) return null;
        return [teamName, leader.name, leader.student_number, "leader", leader.phone_number, leader.github];
    }

    checkLeaderInfo(leader) {
        console.log(leader);
        if (leader == null) return false;
        const teamNameReg = /^[가-힣|a-z|A-Z|0-9| ]+$/;
        const nameReg = /^[가-힣| ]+$/;
        const student_numberReg = /^[0-9]{10}$/;
        const phone_numberReg = /^010-?([0-9]{4})-?([0-9]{4})$/;
        const githubReg = /^[a-zA-Z0-9_-]+$/;
        if (student_numberReg.test(leader[2]) && phone_numberReg.test(leader[4]))
            return true;
        else
            return false;
    }

    readMemberInfo(teamName, member) {
        if (member == undefined || member == null) return null;
        return [teamName, member.name, member.student_number, "member", member.department];
    }

    checkMemberInfo(member) {
        console.log(member);
        if (member == null) return false;
        const teamNameReg = /^[가-힣|a-z|A-Z|0-9| ]+$/;
        const nameReg = /^[가-힣| ]+$/;
        const student_numberReg = /^[0-9]{10}$/;
        if (student_numberReg.test(member[2]))
            return true;
        else
            return false;
    }
}

module.exports = new UserService();
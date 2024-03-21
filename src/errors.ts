export class ErrorWithStatus extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class ValidationError extends ErrorWithStatus {
    constructor() {
        super("입력값이 올바르지 않습니다.", 400);
        this.name = "ValidationError";
    }
}

export class DeadLineError extends ErrorWithStatus {
    constructor() {
        super("신청 기간이 아닙니다.", 412);
        this.name = "DeadLineError";
    }
}

export class StudentUpdateError extends ErrorWithStatus {
    constructor() {
        super("학생 정보 업데이트에 실패했습니다.", 500);
        this.name = "StudentUpdateError";
    }
}

export class StudentNotFoundError extends ErrorWithStatus {
    constructor() {
        super("학생 정보를 찾을 수 없습니다.", 404);
        this.name = "StudentNotFoundError";
    }
}

export class StudentAlreadyAppliedError extends ErrorWithStatus {
    constructor() {
        super("이미 신청한 학생입니다.", 409);
        this.name = "StudentAlreadyAppliedError";
    }
}

export class PhoneAlreadyAppliedError extends ErrorWithStatus {
    constructor() {
        super("이미 신청한 전화번호입니다.", 409);
        this.name = "PhoneAlreadyAppliedError";
    }
}

export class KakaoIdAlreadyAppliedError extends ErrorWithStatus {
    constructor() {
        super("이미 신청한 카카오 아이디입니다.", 409);
        this.name = "KakaoIdAlreadyAppliedError";
    }
}

export class NoResultsError extends ErrorWithStatus {
    constructor() {
        super("결과를 찾을 수 없습니다.", 404);
        this.name = "NoResultsError";
    }
}

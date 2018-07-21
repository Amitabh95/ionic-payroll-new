export interface LoginData {
    designation: string;
    email: string;
    exp: number;
    iat: number;
    id: string;
    isAdmin: boolean;
    name: string;
}
export interface CreateUser {
    name: {
        first: string;
        last: string;
    };
    email: string;
    designation: string;
    casualLeave: number;
    privilledgeLeaves: number;
    baseSalary: number;
    address: string;
}
export interface LeaveData {
    error: boolean;
    leaves:
        [
            {
            _id: string;
            leaveType: string;
            startDate: string;
            endDate: string;
            reason: string;
            noOfDays: number;
            _userId: {
                _id: string;
                email: string;
                designation: string;
                casualLeave: number;
                privilledgeLeaves: number;
                baseSalary: number;
                address: string;
                password: string;
                __v: number;
                userSince: string;
                isActive: boolean;
                isAdmin: boolean;
                name: {
                    first: string;
                    last: string;
                    full: string;
                };
                id: string;
            };
            __v: number;
            isRejected: boolean;
            isApproved: boolean;
            requestDate: string;
            id: string;
        }
    ];
}

export interface PayslipData {
    error: boolean;
    payslips: [
        {
        _id: string;
        month: string;
        _userId: {
            _id: string;
            email: string;
            designation: string;
            casualLeave: number;
            privilledgeLeaves: number;
            baseSalary: number;
            address: string;
            password: string;
            __v: number;
            userSince: string;
            isActive: boolean;
            isAdmin: boolean;
            name: {
                first: string;
                last: string;
                full: string;
            };
            id: string;
        };
        transactionId: string;
        da: number;
        hra: number;
        pf: number;
        totalAmount: number;
        __v: number;
        isPaid: boolean;
        bonus: number;
        deduction: number;
        medical: number;
        id: string;
        }
    ];
}
export interface UserIDUserName {
    error: boolean;
    users: [
       {
        _id: string;
        name: {
            first: string;
            last: string;
            full: string;
            }
        }
    ];
}

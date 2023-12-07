export interface Student {
    PartitionKey: string,
    SortKey: string,
    Author: string,
    stClient: string,
    stNotes: string,
    stFirstName: string,
    stLastName: string,
}

export interface Staff {
    PartitionKey: string,
    SortKey: string,
    Author: string,
    staffUser: string,
    staffPass: string,
    staffApproved: boolean,
    staffFirstName: string,
    staffLastName: string,
}

export interface Instructor {
    PartitionKey: string,
    SortKey: string,
    Author: string,
    inFirstName: string,
    inLastName: string,
    inNotes: string
}

export interface Client {
    PartitionKey: string,
    SortKey: string,
    Author: string,
    clStudents: string[],
    clFirstName: string,
    clLastName: string,
    clNotes: string,
    clBalance: number,
}

export interface Class {
    PartitonKey: string,
    SortKey: string,
    Author: string,
    classInstructor: string,
    classNotes: string,
    students: string[],
    clName: string,
}

export interface Booking {
    PartitionKey: string,
    SortKey: string,
    Author: string,
    bkClass: string,
    bkTime: string,
    bkNotes: string,
    bkRoom: string,
}

export interface Transaction {
    PartitionKey: string,
    SortKey: string,
    Author: string,
    trClient: string,
    trInstructor: string,
    trStatus: boolean,
    trAmount: number,
    trNotes: string,
}

export interface Room {
    PartitionKey: string,
    SortKey: string,
    rmMax: number,
}
import {atom} from 'jotai';
import { Booking, Class, Client, Instructor, Room, Staff, Student, Transaction } from './GlobalInterfaces';

export const authToken = atom("");
export const hotKeysVisible = atom(true);
export const activeTab = atom("Home");

export const bookingMap = atom<Map<string, Booking>>(new Map<string, Booking>());
export const classMap = atom<Map<string, Class>>(new Map<string, Class>());
export const clientMap = atom<Map<string, Client>>(new Map<string, Client>());
export const instructorMap = atom<Map<String, Instructor>>(new Map<string, Instructor>());
export const roomMap = atom<Map<string, Room>>(new Map<string, Room>());
export const staffMap = atom<Map<string, Staff>>(new Map<string, Staff>());
export const studentMap = atom<Map<string, Student>>(new Map<string, Student>());
export const transactionMap = atom<Map<string, Transaction>>(new Map<string, Transaction>());


export const bookingStatus = atom(false);
export const classStatus = atom(false);
export const clientStatus = atom(false);
export const instructorStatus = atom(false);
export const roomStatus = atom(false);
export const staffStatus = atom(false);
export const studentStatus = atom(false);
export const transactionStatus = atom(false);

export const user = atom("");
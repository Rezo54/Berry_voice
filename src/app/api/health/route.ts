import {NextResponse} from "next/server";
import {env} from "@/server/config/env";
export function GET(){return NextResponse.json({ok:true,service:"berry-voice",environment:env.APP_ENV,dataMode:env.BERRY_DATA_MODE});}

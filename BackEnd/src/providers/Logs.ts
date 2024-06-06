import morgan from "morgan";
import express from "express";
class Log {
	private log: string;
	constructor(log: string) {
		this.log = log;
	}

	public addLogs(log: string) {
		this.log = log;
		return `Log : ${this.log}`;
	}

	public showLogs(log: string) {
		express().use(morgan("short"));
		console.log(this.addLogs(log));
	}
}

export default new (Log as any)();

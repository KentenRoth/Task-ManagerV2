export interface Projects {
	_id: string;
	created: number;
	owner: string;
	title: string;
	admins?: Teammember[];
	teams?: Teammember[];
	tokens: Array<Tokens>;
	columns?: Array<Columns>;
}

export interface CurrentProject {
	_id: string;
	title: string;
	tokens: Tokens[];
	owner: string;
	admins?: Teammember[];
	teams?: Teammember[];
	columns?: Array<Columns>;
}

export interface AllColumns {
	title: string;
	tickets: Tickets[];
	order?: number;
}

export interface Tickets {
	_id: string;
	title: string;
	summary: string;
	description: string;
	priority: string;
	status: string;
	owner: string;
	assignedTo: string;
	created: number;
	completed: boolean;
	assigned: boolean;
	currentFocus: boolean;
	order: number;
}

export interface Project {
	admins?: Teammember[];
	teams?: Teammember[];
}

export interface Teammember {
	_id: string;
	name: string;
}

interface Tokens {
	_id: string;
	token: string;
}

interface Columns {
	_id: string;
	title: string;
	order: number;
}

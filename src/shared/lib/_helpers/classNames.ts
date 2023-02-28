type Mods = Record<string, boolean | string>;

const createClassNames = (cls: string, mods?: Mods, additional?: string[]): string => {
	const createMode = (mode: string, value?: string | boolean) => {
		if (value && typeof value === 'string') {
			return `${cls}_${mode}-${value}`;
		}
		return `${cls}-${mode}`;
	}

	return [
		cls,
		additional && additional?.map((mode) => createMode(mode)),
		mods && Object.entries(mods)
			?.filter(([_, value]) => Boolean(value))
			?.map(([mode, value]) => createMode(mode, value)).join(' ')
	].filter(Boolean).join(' ');
}

export const classNames = (cls: string | string[], mods?: Mods, additional?: string[]): string => {
	const defaultCreateClassNames = (mainClass: string) => {
		return createClassNames(mainClass, mods, additional);
	}

	if (typeof cls === 'string') {
		return defaultCreateClassNames(cls);
	} else {
		const [mainClass, ...otherClasses] = cls;
		return [
			defaultCreateClassNames(mainClass),
			...otherClasses.filter(Boolean)
		].join(' ')
	}
}
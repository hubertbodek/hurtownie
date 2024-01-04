import fs from 'fs';
const getDirName = require('path').dirname;

export function writeFile(path: string, contents: any, cb?: any) {
	fs.mkdir(getDirName(path), { recursive: true }, function (err) {
		if (err) return cb(err);

		fs.writeFile(path, contents, cb);
	});
}

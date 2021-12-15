/*
 * Generate svg-data for crayons-system icons. These are icons which are used by crayons web components internally.
 * Its a non-prod util file just to help developers to save time in case they modify some internal icons/add new.
 */
const fs = require('fs').promises;
const path = require('path');

const generateIconsExportData = async () => {
	const iconAssetLibPath = './icons';
	const iconLibPath = './dist';

	const getIconsSVGData = async svgFile => {
		try {
			{
				const svgName = path.parse(svgFile).name;
				const svgFilePath = path.join(iconAssetLibPath, svgFile);
				const svgContent = await fs.readFile(svgFilePath);

				const svg_string = svgContent.toString().split('"').join("'");

				const svg_export_data = `'${svgName}' : "${svg_string}",`;
				return svg_export_data;
			}
		} catch (ex) {
			console.error(ex);
			throw ex;
		}
	};
	try {
		const system_icons = [
			'add-contact',
			'agent',
			'alert',
			'calendar',
			'calendar-time',
			'chat-online',
			'check',
			'chevron-down',
			'chevron-up',
			'code',
			'cross',
			'cross-big',
			'delete',
			'ecommerce',
			'error',
			'freshchat',
			'freshconnect',
			'image',
			'info',
			'magic-wand',
			'minus',
			'more-horizontal',
			'phone',
			'plus',
			'reply',
			'rewards',
			'search',
			'success',
			'ticket-primary',
			'verified',
			'vertical-align-bottom',
			'vertical-align-top',
			'warning'
		];

		let indexData = 'const crayons_system_icons = {';
		const allSvgFiles = await fs.readdir(path.join(iconAssetLibPath, ''));
		for (const svgFile of allSvgFiles) {
			const svgName = path.parse(svgFile).name;
			if (system_icons.includes(svgName))
				indexData = indexData + (await getIconsSVGData(svgFile)) + '\n';
		}
		fs.mkdir(iconLibPath, { recursive: true }).catch(console.error);
		indexData = indexData + '};';
		fs.writeFile(path.join(iconLibPath, 'index-system.js'), indexData);
		console.log(
			`Succesfully written @freshworks/crayons-icon/dist/index-system.js`
		);
	} catch (ex) {
		console.error(`Exception occured while building : ${ex}`);
	}
};

generateIconsExportData();

export default function(context) {
	const {
		name,
		current,
	} = context.hash;
	return [
		{
			name: `${name}介紹`,
		},
		{
			name: '預約注意事項',
		},
		{
			name: '填寫預約資料',
		},
		{
			name: '確認預約資料',
		},
		{
			name: '完成預約',
		},
	].map((step, index) => {
		const id = index + 1;
		return Object.assign(step , {
			id,
			current: current === id ? 'current' : '',
			link: current > id ? `./step${id}.html` : '#',
			linkable: current > id ? 'linkable' : '',
		});
	});
}

const userData = [
	{
		data: 'user-name',
		label: '使用人姓名',
		value: '使用人姓名',
	},
	{
		data: 'user-phone',
		label: '使用人手機',
		value: '使用人手機',
	},
	{
		data: 'user-relation',
		label: '關係',
		value: '本人',
	},
];

const data = {
	golf : [
		{
			data: 'golf-name',
			label: '球場名稱',
			value: '台北 高爾夫球場',
		},
		{
			data: 'date',
			label: '使用日期',
			value: '2016/10/19',
		},
		false,
		...userData,
	],
	lounge: [
		{
			data: 'lounge',
			label: '貴賓室',
			value: '尊榮貴賓室',
		},
		false,
		...userData,
	],
	hotel: [
		{
			data: 'hotel-name',
			label: '飯店名稱',
			value: '宜蘭礁溪老爺酒店-洋式山景套房',
		},
		{
			data: 'checkin-date',
			label: '入住日期',
			value: '2016/10/19',
		},
		false,
		...userData,
	],
	health: [
		{
			data: 'clinic-name',
			label: '設施名稱',
			value: '國泰醫院',
		},
		{
			data: 'type',
			label: '健檢項目',
			value: '項目1',
		},
		{
			data: 'date',
			label: '預約日期',
			value: '2016/10/19',
		},
		false,
		...userData,
	],
	teatime: [
		{
			data: 'name',
			label: '餐廳名稱',
			value: '台北 福華飯店',
		},
		{
			data: 'date',
			label: '用餐日期',
			value: '2016/10/19',
		},
		{
			data: 'time',
			label: '用餐時段',
			value: '15:00',
		},
		false,
		...userData,
	],
	shuttle: [
		...userData,
		false,
		{
			data: 'shuttle-type',
			label: '服務類型',
			value: '接機',
		},
		{
			data: 'city',
			label: '縣市',
			value: '台北市',
		},
		{
			data: 'region',
			label: '鄉鎮市區',
			value: '大安區',
		},
		{
			data: 'address',
			label: '地址',
			value: '羅斯福路四段1號',
		},
		false,
		{
			data: 'flight-date',
			label: '航班時間',
			value: '2016/10/30 12:00',
		},
		{
			data: 'flight-number',
			label: '航班編號',
			value: 'ABC123',
		},
		{
			data: 'airport',
			label: '接送機場',
			value: '桃園機場 - 第一航廈',
		},
		{
			data: 'pick-date',
			label: '接送時間',
			value: '2016/10/30 08:00',
		},
		false,
		{
			data: 'car-type',
			label: '指定車型',
			value: '不指定',
		},
		{
			data: 'pet',
			label: '攜帶寵物',
			value: '無寵物',
		},
		{
			data: 'baby-seat',
			label: '嬰兒座椅數',
			value: 0,
		},
		{
			data: 'safe-seat',
			label: '安全座椅數',
			value: 0,
		},
		{
			data: 'higher-seat',
			label: '增高坐墊數',
			value: 0,
		},
		false,
		{
			data: 'luggage-count',
			label: '行李件數',
			value: 2,
		},
		{
			data: 'special-luggage',
			label: '特殊行李',
			value: 0,
		},
		{
			data: 'special-luggage-detail',
			label: '敘述',
			value: '',
		},
	],
};

export default function(content) {
	const { type } = content.hash;
	return data[type];
};

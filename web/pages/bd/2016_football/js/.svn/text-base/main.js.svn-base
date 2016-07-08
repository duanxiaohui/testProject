/**
 * 
 * @authors 张明臣 (vest0804@gamil.com)
 * @date    2016-05-31 15:13:21
 * @version 1.0
 */
(function () {
	var _data ={};
	var keyArray = [];
	var codeArray ={"80fc5e12-ca03-4d8e-954a-92cabc121641": "gQHO8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLy1VeXJYQ2ZsZ1JqNGZJT1RLV0FTAAIE24ZOVwMEAAAAAA==",
					"2b358c25-08bf-4868-845b-270b6a23a064": "gQEz8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0dFeVl2dGJsdGhqUGltWjFHbUFTAAIE2oZOVwMEAAAAAA==", 
					"7e6d9a19-48f4-4b06-b419-953fd2525206": "gQHD8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2xreFE4MGJsZXhnQzJlZzkwbUFTAAIE2oZOVwMEAAAAAA==", 
					"6e28a0b9-79cb-46e2-90a5-e3e5973ef3a6": "gQFF8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzFVeDVObHZsV3hnaVFxdnhfMkFTAAIE2oZOVwMEAAAAAA==", 
					"85f62ab0-48b6-4d6e-9c97-c126362eb55e": "gQGi8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0dreXkwU0RsblJqa0VXUWJNR0FTAAIE3YZOVwMEAAAAAA==",
					"1fff5c14-5525-42b2-9136-2c8d382573f0": "gQEo8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL3dFeGtiaTdsWGhnbmVyNng1bUFTAAIE3YZOVwMEAAAAAA==",
					"2b358c25-08bf-4868-845b-270b6a23a064": "gQEz8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0dFeVl2dGJsdGhqUGltWjFHbUFTAAIE2oZOVwMEAAAAAA==",
					"2d7a5283-0b7f-4bac-8cf8-fd1abb52b2f8": "gQGO8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzYwd1F6SnZsTlJoTVJwVU1rbUFTAAIE24ZOVwMEAAAAAA==",
					"03b81141-ffbb-40aa-a76e-5464968b6542": "gQHT8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzBrd1NXSlhsUEJoRjVheVRrR0FTAAIE3IZOVwMEAAAAAA==",
					"4a51a74f-49cc-46fa-a4b8-86f06e792c2c": "gQGQ8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2FreXRSVWZrZEJnTmtoUjVMMkFTAAIE2oZOVwMEAAAAAA==",
					"4c0a04c8-eb90-4d42-9e41-b2780973a30b": "gQGT8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzYweHhZbG5sWFJna0twV3I4MkFTAAIE3IZOVwMEAAAAAA==",
					"4d91612d-4d85-44e7-9d2b-121c0d91fc24": "gQGD8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1ZFeG5WdHZsVEJnMUl5cVk1V0FTAAIE2IZOVwMEAAAAAA==",
					"5a5a69a4-01d0-451c-b4dc-e52e39044b19": "gQEE8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1IwdzMyZDdsQkJoOXVqa1B0V0FTAAIE24ZOVwMEAAAAAA==",
					"6ddad046-d721-487e-b531-97f1dda846ef": "gQHt8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1pVeDlXaURsV1JnZzVSdWItMkFTAAIE3YZOVwMEAAAAAA==",
					"6e28a0b9-79cb-46e2-90a5-e3e5973ef3a6": "gQFF8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzFVeDVObHZsV3hnaVFxdnhfMkFTAAIE2oZOVwMEAAAAAA==",
					"7c253b67-8523-4063-931d-1c7513d4bb8b": "gQHj8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL09Vd0ZyeVRsTUJoSlNFZC1oMkFTAAIE24ZOVwMEAAAAAA==",
					"7df81ca8-19f6-45ac-a516-cfd83d759696": "gQFv8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2RFeXZ4cVBsakJqMTZ3b0FMV0FTAAIE24ZOVwMEAAAAAA==",
					"7e6d9a19-48f4-4b06-b419-953fd2525206": "gQHD8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2xreFE4MGJsZXhnQzJlZzkwbUFTAAIE2oZOVwMEAAAAAA==",
					"8cdbea2f-29ff-477d-bb9e-dce0a9dad4af": "gQFS8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0YweVdtOXpscGhqZnFtbE9GR0FTAAIE3IZOVwMEAAAAAA==",
					"9adca046-b9be-4201-aa54-8d868f398030": "gQGE8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0dVd3pEWVBsQWhoN2JXZlpzV0FTAAIE2YZOVwMEAAAAAA==",
					"9d3e851b-8709-41db-bbc0-ff3a2a4bf533": "gQF28DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzFreFBaWjNsWnhnZTFLaW96V0FTAAIE3oZOVwMEAAAAAA==",
					"16f077fe-4b6e-4ae7-bc6a-469cfd2c928a": "gQE08ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2dVeDh2OVBsVUJncEYtOTItbUFTAAIE3YZOVwMEAAAAAA==",
					"41ea5604-4569-4dbe-9461-48929b331aea": "gQEI8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL3drd2RfdW5sTGhoWEs3d3NuMkFTAAIE24ZOVwMEAAAAAA==",
					"048c93e7-c47a-4b7e-858a-301009d77d13": "gQFP8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2IweFRwNmpraXhqeW1oR2EwV0FTAAIE3oZOVwMEAAAAAA==",
					"52ea7388-ad2e-414f-9118-8830cd20d9d3": "gQFp8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1Rrd3VNYkhsQ1Jod05ERHpyR0FTAAIE2oZOVwMEAAAAAA==",
					"67a69b68-340f-4a8b-aec7-3125cb64c16f": "gQH/8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL28weVk4UzdsdUJqQmh0MDBHbUFTAAIE3YZOVwMEAAAAAA==",
					"74e39aa2-40e7-4acc-9a5c-ef2bc22d0197": "gQGM8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0hrd1VKWEhsTlJoTXNHRGhsbUFTAAIE2YZOVwMEAAAAAA==",
					"80fc5e12-ca03-4d8e-954a-92cabc121641": "gQHO8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLy1VeXJYQ2ZsZ1JqNGZJT1RLV0FTAAIE24ZOVwMEAAAAAA==",
					"85f62ab0-48b6-4d6e-9c97-c126362eb55e": "gQGi8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0dreXkwU0RsblJqa0VXUWJNR0FTAAIE3YZOVwMEAAAAAA==",
					"532ab88c-1ba6-40dc-87f5-1007c563a632": "gQHK8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1AweU4yYXZrVXhncXQwSGlEMkFTAAIE2YZOVwMEAAAAAA==",
					"541c2f52-b874-430b-8cc5-354cc7e6a657": "gQGm8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzNFeEpiTFBsYWhnVF9hS3F5MkFTAAIE2YZOVwMEAAAAAA==",
					"573fd784-d0f3-40bb-b746-0d87b877b1ce": "gQGN8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL24weG9aS1BrdUJqQm91RlI2bUFTAAIE2oZOVwMEAAAAAA==",
					"927a9f15-530d-423f-a82c-e97f925c69b2": "gQHj8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzhVeUQyR1hsclJqVXRvOFRBV0FTAAIE2oZOVwMEAAAAAA==",
					"1219b6ae-53f1-4054-ac29-c692593c5281": "gQHh8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLy1Vd0xRNHprMFJpb3lJTjhpV0FTAAIE3IZOVwMEAAAAAA==",
					"7306ad8a-dd04-487b-bfd3-17548a173ce8": "gQHY8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL21VeWRCMWZsdUJqQk1fZkhIMkFTAAIE24ZOVwMEAAAAAA==",
					"8089cf31-743f-4eee-a10b-dc5a8ba1310c": "gQGD8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2JFd3NCY2ZsQXhoNlZCTFBybUFTAAIE2YZOVwMEAAAAAA==",
					"09854f86-6579-476f-8938-af5663add0fc": "gQFX8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0Uwd3NzVS1sQUJoNUYyMTRybUFTAAIE24ZOVwMEAAAAAA==",
					"9946a019-7466-4bbb-a259-d7e260e8529f": "gQFq8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL25Vd25BZVRsQmhoLWd1UEZwV0FTAAIE3oZOVwMEAAAAAA==",
					"34288a20-4cdb-4299-adc8-b0f26dc0a89d": "gQES8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1dVeXJqTmJsaXhqeV9TZEpLV0FTAAIE2YZOVwMEAAAAAA==",
					"48237ada-88b9-4712-965e-3b476930a0b3": "gQGF8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzFreHlTVFBsVlJnc1ZxaUw4R0FTAAIE3IZOVwMEAAAAAA==",
					"50239b10-3cff-4653-bd48-ec7744f476b2": "gQFP8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL01FeVMxNzNsdVJqQW9FNFpFR0FTAAIE2oZOVwMEAAAAAA==",
					"095379ae-c663-4b52-bbe2-0922da431f94": "gQGp8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1cwd3N4V1BsREJoMUJ5VUFybUFTAAIE2oZOVwMEAAAAAA==",
					"362218f7-00a7-4b16-87ba-4babe81ba894": "gQFo8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2JVeGdrWXJsVGhnM2pCTmE0bUFTAAIE3IZOVwMEAAAAAA==",
					"09557423-5b71-4841-937e-8bb85fab5cb8": "gQGq8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL21FeXBkOS1sanhqMnl1YTBLMkFTAAIE2YZOVwMEAAAAAA==",
					"63288125-dad8-48f9-872d-ab376fe34aa4": "gQGR8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL04weXV1QzNsbVJqZ1dFbHFMR0FTAAIE3oZOVwMEAAAAAA==",
					"80076653-690c-466d-8eb4-afac8fdfef20": "gQFn8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL19VeXk0ZDdsbmhqblBJY29NR0FTAAIE2YZOVwMEAAAAAA==",
					"a34d47d2-16d0-4ea1-91e0-9442e1ba706c": "gQF58DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL3FreFZLVWpsZXhnQ01kVGkxMkFTAAIE3YZOVwMEAAAAAA==",
					"b9be26b2-5474-4499-9fcb-74af97604421": "gQGE8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0pVd09DWnZsT2hoRFRWdllqR0FTAAIE2YZOVwMEAAAAAA==",
					"c1c75569-f776-4c26-8037-3e120e87185c": "gQHR8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0NreDkzcm5sV2hnamwzUWMtMkFTAAIE3YZOVwMEAAAAAA==",
					"cca9b219-4ccc-437e-b395-df3d8be55a1d": "gQE/8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL3FFeDhndnJsVWhnckt0WkotbUFTAAIE24ZOVwMEAAAAAA==",
					"cfa5c908-66f3-40ec-a322-f184e7fd3cef": "gQFk8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL21reUVpTlRsdWhqRFBPUlRCbUFTAAIE3oZOVwMEAAAAAA==",
					"d18f2421-9d7a-4ac8-aea8-d2f5e0d17e97": "gQGH8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1pVeWo3TjNsblJqa3JoczNJV0FTAAIE3IZOVwMEAAAAAA==",
					"d400585e-918e-4bf1-8175-5f40b4c197e3": "gQGH8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1BVd1g0WFRsTmhoUFVrTWxsV0FTAAIE3YZOVwMEAAAAAA==",
					"e9fc99f4-d578-4a5c-a2b0-cbb361945a61": "gQG48DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2pFd2ZSX1BreEJpOTB2SjVuV0FTAAIE2IZOVwMEAAAAAA==",
					"f9342cb6-fe5e-4c07-be82-5d2c69ad07fe": "gQGQ8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1ZFeXZONDdsaHhqX0Z5cjZMV0FTAAIE3IZOVwMEAAAAAA==",
					"f94775b9-37e8-49bc-9221-aec25d22b471": "gQGd8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1Vrd0ZsT3psTmhoUDBDeENoMkFTAAIE3YZOVwMEAAAAAA=="}
	var groupData = [
				{
					"startDate":"6月11日",
					"contest":[
						{
							"team1":"法国",
							"team1Logo":"/pages/bd/2016_football/images/faguo.jpg",
							"team2":"罗马尼亚",
							"team2Logo":"/pages/bd/2016_football/images/luomaniya.jpg",
							"startTime":"03:00",
							"group":"A组第一轮",
							"key":"e9fc99f4-d578-4a5c-a2b0-cbb361945a61",
							"emp_cion":true
						},
						{
							"team1":"阿尔巴尼亚",
							"team1Logo":"/pages/bd/2016_football/images/aerbaniya.jpg",
							"team2":"瑞士",
							"team2Logo":"/pages/bd/2016_football/images/ruishi.jpg",
							"startTime":"21:00",
							"group":"A组第一轮",
							"key":"4d91612d-4d85-44e7-9d2b-121c0d91fc24",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"6月12日",
					"contest":[
						{
							"team1":"威尔士",
							"team1Logo":"/pages/bd/2016_football/images/weiershi.jpg",
							"team2":"斯洛伐克",
							"team2Logo":"/pages/bd/2016_football/images/siluofake.jpg",
							"startTime":"00:00",
							"group":"B组第一轮",
							"key":"80076653-690c-466d-8eb4-afac8fdfef20",
							"emp_cion":false
						},
						{
							"team1":"英格兰",
							"team1Logo":"/pages/bd/2016_football/images/yinggelan.jpg",
							"team2":"俄罗斯",
							"team2Logo":"/pages/bd/2016_football/images/eluosi.jpg",
							"startTime":"03:00",
							"group":"B组第一轮",
							"key":"541c2f52-b874-430b-8cc5-354cc7e6a657",
							"emp_cion":true
						},
						{
							"team1":"土耳其",
							"team1Logo":"/pages/bd/2016_football/images/tuerqi.jpg",
							"team2":"克罗地亚",
							"team2Logo":"/pages/bd/2016_football/images/keluodiya.jpg",
							"startTime":"21:00",
							"group":"D组第一轮",
							"key":"34288a20-4cdb-4299-adc8-b0f26dc0a89d",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"6月13日",
					"contest":[
						{
							"team1":"波兰",
							"team1Logo":"/pages/bd/2016_football/images/bolan.jpg",
							"team2":"北爱尔兰",
							"team2Logo":"/pages/bd/2016_football/images/beiaierlan.jpg",
							"startTime":"00:00",
							"group":"C组第一轮",
							"key":"532ab88c-1ba6-40dc-87f5-1007c563a632",
							"emp_cion":false
						},
						{
							"team1":"德国",
							"team1Logo":"/pages/bd/2016_football/images/deguo.jpg",
							"team2":"乌克兰",
							"team2Logo":"/pages/bd/2016_football/images/wukelan.jpg",
							"startTime":"03:00",
							"group":"C组第一轮",
							"key":"74e39aa2-40e7-4acc-9a5c-ef2bc22d0197",
							"emp_cion":true
						},
						{
							"team1":"西班牙",
							"team1Logo":"/pages/bd/2016_football/images/xibanya.jpg",
							"team2":"捷克",
							"team2Logo":"/pages/bd/2016_football/images/jieke.jpg",
							"startTime":"21:00",
							"group":"D组第一轮",
							"key":"9adca046-b9be-4201-aa54-8d868f398030",
							"emp_cion":true
						}
					]
				},
				{
					"startDate":"6月14日",
					"contest":[
						{
							"team1":"爱尔兰",
							"team1Logo":"/pages/bd/2016_football/images/aierlan.jpg",
							"team2":"瑞典",
							"team2Logo":"/pages/bd/2016_football/images/ruidian.jpg",
							"startTime":"00:00",
							"group":"E组第一轮",
							"key":"09557423-5b71-4841-937e-8bb85fab5cb8",
							"emp_cion":false
						},
						{
							"team1":"比利时",
							"team1Logo":"/pages/bd/2016_football/images/bilishi.jpg",
							"team2":"意大利",
							"team2Logo":"/pages/bd/2016_football/images/yidali.jpg",
							"startTime":"03:00",
							"group":"E组第一轮",
							"key":"8089cf31-743f-4eee-a10b-dc5a8ba1310c",
							"emp_cion":true
						}
					]
				},
				{
					"startDate":"6月15日",
					"contest":[
						{
							"team1":"奥地利",
							"team1Logo":"/pages/bd/2016_football/images/aodili.jpg",
							"team2":"匈牙利",
							"team2Logo":"/pages/bd/2016_football/images/xiongyali.jpg",
							"startTime":"00:00",
							"group":"F组第一轮",
							"key":"b9be26b2-5474-4499-9fcb-74af97604421",
							"emp_cion":false
						},
						{
							"team1":"葡萄牙",
							"team1Logo":"/pages/bd/2016_football/images/putaoya.jpg",
							"team2":"冰岛",
							"team2Logo":"/pages/bd/2016_football/images/bingdao.jpg",
							"startTime":"03:00",
							"group":"F组第一轮",
							"key":"573fd784-d0f3-40bb-b746-0d87b877b1ce",
							"emp_cion":false
						},
						{
							"team1":"俄罗斯",
							"team1Logo":"/pages/bd/2016_football/images/eluosi.jpg",
							"team2":"斯洛伐克",
							"team2Logo":"/pages/bd/2016_football/images/siluofake.jpg",
							"startTime":"21:00",
							"group":"B组第一轮",
							"key":"4a51a74f-49cc-46fa-a4b8-86f06e792c2c",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"6月16日",
					"contest":[
						{
							"team1":"罗马尼亚",
							"team1Logo":"/pages/bd/2016_football/images/luomaniya.jpg",
							"team2":"瑞士",
							"team2Logo":"/pages/bd/2016_football/images/ruishi.jpg",
							"startTime":"00:00",
							"group":"A组第二轮",
							"key":"2b358c25-08bf-4868-845b-270b6a23a064",
							"emp_cion":false
						},
						{
							"team1":"法国",
							"team1Logo":"/pages/bd/2016_football/images/faguo.jpg",
							"team2":"阿尔巴尼亚",
							"team2Logo":"/pages/bd/2016_football/images/aerbaniya.jpg",
							"startTime":"03:00",
							"group":"A组第二轮",
							"key":"6e28a0b9-79cb-46e2-90a5-e3e5973ef3a6",
							"emp_cion":false
						},
						{
							"team1":"英格兰",
							"team1Logo":"/pages/bd/2016_football/images/yinggelan.jpg",
							"team2":"威尔士",
							"team2Logo":"/pages/bd/2016_football/images/weiershi.jpg",
							"startTime":"21:00",
							"group":"B组第二轮",
							"key":"095379ae-c663-4b52-bbe2-0922da431f94",
							"emp_cion":true
						}
					]
				},
				{
					"startDate":"6月17日",
					"contest":[
						{
							"team1":"乌克兰",
							"team1Logo":"/pages/bd/2016_football/images/wukelan.jpg",
							"team2":"北爱尔兰",
							"team2Logo":"/pages/bd/2016_football/images/beiaierlan.jpg",
							"startTime":"00:00",
							"group":"C组第二轮",
							"key":"52ea7388-ad2e-414f-9118-8830cd20d9d3",
							"emp_cion":false
						},
						{
							"team1":"德国",
							"team1Logo":"/pages/bd/2016_football/images/deguo.jpg",
							"team2":"波兰",
							"team2Logo":"/pages/bd/2016_football/images/bolan.jpg",
							"startTime":"03:00",
							"group":"C组第二轮",
							"key":"927a9f15-530d-423f-a82c-e97f925c69b2",
							"emp_cion":false
						},
						{
							"team1":"意大利",
							"team1Logo":"/pages/bd/2016_football/images/yidali.jpg",
							"team2":"瑞典",
							"team2Logo":"/pages/bd/2016_football/images/ruidian.jpg",
							"startTime":"21:00",
							"group":"E组第二轮",
							"key":"7e6d9a19-48f4-4b06-b419-953fd2525206",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"6月18日",
					"contest":[
						{
							"team1":"捷克",
							"team1Logo":"/pages/bd/2016_football/images/jieke.jpg",
							"team2":"克罗地亚",
							"team2Logo":"/pages/bd/2016_football/images/keluodiya.jpg",
							"startTime":"00:00",
							"group":"D组第二轮",
							"key":"50239b10-3cff-4653-bd48-ec7744f476b2",
							"emp_cion":false
						},
						{
							"team1":"西班牙",
							"team1Logo":"/pages/bd/2016_football/images/xibanya.jpg",
							"team2":"土耳其",
							"team2Logo":"/pages/bd/2016_football/images/tuerqi.jpg",
							"startTime":"03:00",
							"group":"D组第二轮",
							"key":"7306ad8a-dd04-487b-bfd3-17548a173ce8",
							"emp_cion":true
						},
						{
							"team1":"比利时",
							"team1Logo":"/pages/bd/2016_football/images/bilishi.jpg",
							"team2":"爱尔兰",
							"team2Logo":"/pages/bd/2016_football/images/aierlan.jpg",
							"startTime":"21:00",
							"group":"E组第二轮",
							"key":"5a5a69a4-01d0-451c-b4dc-e52e39044b19",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"6月19日",
					"contest":[
						{
							"team1":"冰岛",
							"team1Logo":"/pages/bd/2016_football/images/bingdao.jpg",
							"team2":"匈牙利",
							"team2Logo":"/pages/bd/2016_football/images/xiongyali.jpg",
							"startTime":"00:00",
							"group":"F组第二轮",
							"key":"80fc5e12-ca03-4d8e-954a-92cabc121641",
							"emp_cion":false
						},
						{
							"team1":"葡萄牙",
							"team1Logo":"/pages/bd/2016_football/images/putaoya.jpg",
							"team2":"奥地利",
							"team2Logo":"/pages/bd/2016_football/images/aodili.jpg",
							"startTime":"03:00",
							"group":"F组第二轮",
							"key":"41ea5604-4569-4dbe-9461-48929b331aea",
							"emp_cion":true
						}
					]
				},
				{
					"startDate":"6月20日",
					"contest":[
						{
							"team1":"罗马尼亚",
							"team1Logo":"/pages/bd/2016_football/images/luomaniya.jpg",
							"team2":"阿尔巴尼亚",
							"team2Logo":"/pages/bd/2016_football/images/aerbaniya.jpg",
							"startTime":"03:00",
							"group":"A组第二轮",
							"key":"7c253b67-8523-4063-931d-1c7513d4bb8b",
							"emp_cion":false
						},
						{
							"team1":"瑞士",
							"team1Logo":"/pages/bd/2016_football/images/ruishi.jpg",
							"team2":"法国",
							"team2Logo":"/pages/bd/2016_football/images/faguo.jpg",
							"startTime":"03:00",
							"group":"A组第三轮",
							"key":"2d7a5283-0b7f-4bac-8cf8-fd1abb52b2f8",
							"emp_cion":true
						}
					]
				},
				{
					"startDate":"6月21日",
					"contest":[
						{
							"team1":"俄罗斯",
							"team1Logo":"/pages/bd/2016_football/images/eluosi.jpg",
							"team2":"威尔士",
							"team2Logo":"/pages/bd/2016_football/images/weiershi.jpg",
							"startTime":"03:00",
							"group":"B组第二轮",
							"key":"cca9b219-4ccc-437e-b395-df3d8be55a1d",
							"emp_cion":false
						},
						{
							"team1":"斯洛伐克",
							"team1Logo":"/pages/bd/2016_football/images/siluofake.jpg",
							"team2":"英格兰",
							"team2Logo":"/pages/bd/2016_football/images/yinggelan.jpg",
							"startTime":"03:00",
							"group":"B组第三轮",
							"key":"7df81ca8-19f6-45ac-a516-cfd83d759696",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"6月22日",
					"contest":[
						{
							"team1":"乌克兰",
							"team1Logo":"/pages/bd/2016_football/images/wukelan.jpg",
							"team2":"波兰",
							"team2Logo":"/pages/bd/2016_football/images/bolan.jpg",
							"startTime":"00:00",
							"group":"C组第二轮",
							"key":"09854f86-6579-476f-8938-af5663add0fc",
							"emp_cion":false
						},
						{
							"team1":"北爱尔兰",
							"team1Logo":"/pages/bd/2016_football/images/beiaierlan.jpg",
							"team2":"德国",
							"team2Logo":"/pages/bd/2016_football/images/deguo.jpg",
							"startTime":"00:00",
							"group":"C组第三轮",
							"key":"f9342cb6-fe5e-4c07-be82-5d2c69ad07fe",
							"emp_cion":false
						},
						{
							"team1":"捷克",
							"team1Logo":"/pages/bd/2016_football/images/jieke.jpg",
							"team2":"土耳其",
							"team2Logo":"/pages/bd/2016_football/images/tuerqi.jpg",
							"startTime":"03:00",
							"group":"D组第二轮",
							"key":"1219b6ae-53f1-4054-ac29-c692593c5281",
							"emp_cion":false
						},
						{
							"team1":"克罗地亚",
							"team1Logo":"/pages/bd/2016_football/images/keluodiya.jpg",
							"team2":"西班牙",
							"team2Logo":"/pages/bd/2016_football/images/xibanya.jpg",
							"startTime":"03:00",
							"group":"D组第三轮",
							"key":"4c0a04c8-eb90-4d42-9e41-b2780973a30b",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"6月23日",
					"contest":[
						{
							"team1":"冰岛",
							"team1Logo":"/pages/bd/2016_football/images/bingdao.jpg",
							"team2":"奥地利",
							"team2Logo":"/pages/bd/2016_football/images/aodili.jpg",
							"startTime":"00:00",
							"group":"F组第二轮",
							"key":"362218f7-00a7-4b16-87ba-4babe81ba894",
							"emp_cion":false
						},
						{
							"team1":"匈牙利",
							"team1Logo":"/pages/bd/2016_football/images/xiongyali.jpg",
							"team2":"葡萄牙",
							"team2Logo":"/pages/bd/2016_football/images/putaoya.jpg",
							"startTime":"00:00",
							"group":"F组第三轮",
							"key":"03b81141-ffbb-40aa-a76e-5464968b6542",
							"emp_cion":true
						},
						{
							"team1":"意大利",
							"team1Logo":"/pages/bd/2016_football/images/yidali.jpg",
							"team2":"爱尔兰",
							"team2Logo":"/pages/bd/2016_football/images/aierlan.jpg",
							"startTime":"03:00",
							"group":"E组第二轮",
							"key":"d18f2421-9d7a-4ac8-aea8-d2f5e0d17e97",
							"emp_cion":false
						},
						{
							"team1":"瑞典",
							"team1Logo":"/pages/bd/2016_football/images/ruidian.jpg",
							"team2":"比利时",
							"team2Logo":"/pages/bd/2016_football/images/bilishi.jpg",
							"startTime":"03:00",
							"group":"E组第三轮",
							"key":"8cdbea2f-29ff-477d-bb9e-dce0a9dad4af",
							"emp_cion":false
						}
					]
				}
			];
			var EliminateData =[
				{
					"startDate":"6月25日",
					"contest":[
						{
							"team1":"A2",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"C2",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"21:00",
							"group":"",
							"key":"48237ada-88b9-4712-965e-3b476930a0b3",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"6月26日",
					"contest":[
						{
							"team1":"B1",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"A3/C3/D3",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"00:00",
							"group":"",
							"key":"85f62ab0-48b6-4d6e-9c97-c126362eb55e",
							"emp_cion":false
						},
						{
							"team1":"D1",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"B3/E3/F3",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"03:00",
							"group":"",
							"key":"1fff5c14-5525-42b2-9136-2c8d382573f0",
							"emp_cion":false
						},
						{
							"team1":"A1",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"C3/D3/E3",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"21:00",
							"group":"",
							"key":"67a69b68-340f-4a8b-aec7-3125cb64c16f",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"6月27日",
					"contest":[
						{
							"team1":"C1",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"A3/B3/F3",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"00:00",
							"group":"",
							"key":"f94775b9-37e8-49bc-9221-aec25d22b471",
							"emp_cion":false
						},
						{
							"team1":"F1",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"E2",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"03:00",
							"group":"",
							"key":"c1c75569-f776-4c26-8037-3e120e87185c",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"6月28日",
					"contest":[
						{
							"team1":"E1",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"D2",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"00:00",
							"group":"",
							"key":"a34d47d2-16d0-4ea1-91e0-9442e1ba706c",
							"emp_cion":false
						},
						{
							"team1":"B2",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"F2",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"03:00",
							"group":"",
							"key":"16f077fe-4b6e-4ae7-bc6a-469cfd2c928a",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"7月1日",
					"contest":[
						{
							"team1":"37胜者",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"39胜者",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"03:00",
							"group":"",
							"key":"d400585e-918e-4bf1-8175-5f40b4c197e3",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"7月2日",
					"contest":[
						{
							"team1":"38胜者",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"42胜者",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"03:00",
							"group":"",
							"key":"6ddad046-d721-487e-b531-97f1dda846ef",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"7月3日",
					"contest":[
						{
							"team1":"41胜者",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"43胜者",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"03:00",
							"group":"",
							"key":"9946a019-7466-4bbb-a259-d7e260e8529f",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"7月4日",
					"contest":[
						{
							"team1":"40胜者",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"44胜者",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"03:00",
							"group":"",
							"key":"cfa5c908-66f3-40ec-a322-f184e7fd3cef",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"7月7日",
					"contest":[
						{
							"team1":"45胜者",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"46胜者",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"03:00",
							"group":"",
							"key":"63288125-dad8-48f9-872d-ab376fe34aa4",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"7月8日",
					"contest":[
						{
							"team1":"47胜者",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"48胜者",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"03:00",
							"group":"",
							"key":"9d3e851b-8709-41db-bbc0-ff3a2a4bf533",
							"emp_cion":false
						}
					]
				},
				{
					"startDate":"7月11日",
					"contest":[
						{
							"team1":"49胜者",
							"team1Logo":"/pages/bd/2016_football/images/default.jpg",
							"team2":"50胜者",
							"team2Logo":"/pages/bd/2016_football/images/default.jpg",
							"startTime":"03:00",
							"group":"",
							"key":"048c93e7-c47a-4b7e-858a-301009d77d13",
							"emp_cion":false
						}
					]
				}
			]
	var football ={
		init:function () {
			football.render();
			football.shareFn();
			football.bindEventFn();
			football.judgEnvirFn();
		},
		render:function () {
			var htmlTmpl = '\
					<dd class="e_clear" key="{$key}" data-url="http://www.365rili.com/pages/bd/2016_football/list_info.html?startDate={$startDate}&startTime={$startTime}&team_1={$team1}&team_2={$team2}&key={$key}">\
						<div class="football_btn">\
							<a href="javascript:;" class="remind_btn">提醒</a>\
						</div>\
						<div class="team_name">\
							<div class="team_1">\
								<img src="{$team1Logo}" width="26" alt=""><span>{$team1}</span>\
							</div>\
							<div class="team_2">\
								<img src="{$team2Logo}" width="26" alt=""><span>{$team2}</span>\
							</div>\
						</div>\
						<div class="game_time {$emp_cion}">\
							<p>{$group}</p>\
							<p>{$startTime}</p>\
						</div>\
					</dd>';
			var groupHtml = template('<dl><dt>{$startDate}</dt>{$contest}</dl>',groupData,{
				contest:function (o,p,d,i) {
					return template(htmlTmpl,o,{
						emp_cion:function (o,p,d,i) {
							if(o){
								return 'emp_cion'
							}else{
								return ''
							}
						},
						startDate:p.startDate
					});
				}
			});
			var EliminateHtml = template('<dl><dt>{$startDate}</dt>{$contest}</dl>',EliminateData,{
				contest:function (o,p,d,i) {
					return template(htmlTmpl,o,{
						emp_cion:function (o,p,d,i) {
							if(o){
								return 'emp_cion'
							}else{
								return ''
							}
						},
						startDate:p.startDate
					});
				}
			});
			$('.football_group').html(groupHtml);
			$('.football_eliminate').html(EliminateHtml);

			var has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
			$('.football_group').css({
                '-webkit-transform': has3d ? "translate3d(0,0,0)" : "translate(0,0)",
                '-webkit-transition': '200ms linear'
            });
            $('.football_eliminate').css({
                '-webkit-transform': has3d ? "translate3d(200%,0,0)" : "translate(200%,0)",
                '-webkit-transition': '200ms linear'
            });
            $('.football_eliminate').removeClass('none');
		},
		judgEnvirFn:function () {
			$('.football_tabs_list dd').each(function (i) {
				keyArray.push($(this).attr('key'));
			})

			if(app.getUa.coco){
				var url ='http://www.365rili.com/schedule/checkUserStatus.do';
				app.getTokenByCoco(url,function (headers) {
					var trueStr = app.getUa.ios ? "true" : true;
					var shareData ={
			            "title": '欧洲杯火热开战，错过哪场都是遗憾！',
			            "content": '365日历为你提供最便捷的赛程提醒，绝不错过一场精彩比赛！',
			            "link":window.location.href,
			            "image": 'http://www.365rili.com/pages/bd/2016_football/images/share_icon.png',
			            "isEvent":trueStr
			        }
			        app.call({
		                action: 'setShareContent',
		                params: [
		                    {
		                        name: 'shareString',
		                        value: JSON.stringify(shareData)
		                    }
		                    ],
		                callBack: null
		            })
					$.ajax({
						url:"/schedule/checkUserStatus.do",
						type:"post",
						dataType:"json",
						headers:headers,
						data:{
							key:keyArray.join(',')
						},
						success:function(result){
							_data.cocoIsLogin = result.isLogin;
							for (var i = 0; i < result.joinMap.length; i++) {
								for(var _i in result.joinMap[i]){
									if(result.joinMap[i][_i]){
										var aimsDiv = $('.football_tabs_list dd[key="'+_i+'"]');
										aimsDiv.find('.remind_btn').addClass('on');
										aimsDiv.find('.remind_btn').text('已提醒');
										aimsDiv.attr('fsid',result.joinMap[i].fsid);
									}
								}
							};
						}
					})
				})
			}
			if(app.getUa.weixin){
				$.ajax({
					url:'/schedule/checkUserStatus.do',
					type:"get",
					dataType:"json",
					data:{
						key:keyArray.join(',')
					},
					success:function(result){
						_data.weixinIsLogin = result.isLogin;
						_data.follow = result.isWxFollowed;
						for (var i = 0; i < result.joinMap.length; i++) {
							for(var _i in result.joinMap[i]){
								if(result.joinMap[i][_i]){
									var aimsDiv = $('.football_tabs_list dd[key="'+_i+'"]');
									aimsDiv.find('.remind_btn').addClass('on');
									aimsDiv.find('.remind_btn').text('已提醒');
									aimsDiv.attr('fsid',result.joinMap[i].fsid);
								}
							}
						};
						
					}
				})
			}
		},
		bindEventFn:function () {
			var has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
			$('body').on('tap','.remind_btn',function () {
				_data.key = $(this).parents('dd').attr('key');
				var dom = $(this);
				var team_1 = dom.parents('dd').find('.team_1').find('span').text();
				var team_2 = dom.parents('dd').find('.team_2').find('span').text();
				if(dom.hasClass('on')){
					plug.confirm('','确定要删除 '+team_1 +' VS '+team_2 +' 比赛的提醒吗？删除后不再提醒','',function(){
						football.delSchedule(dom);
					})
				}else{
					football.addSchedule(dom);
				}
			});

			$('body').on('tap','.bg',function () {
				$('.bg').hide().remove();
				$('.code_div').hide().remove();
			})

			var h = $('.football_group').height();
			$('.football_tabs_list').css({
					'height':+h +'px',
					"overflow":'hidden'
				});
			$('body').on('tap','.football_tabs_nav li:first-child',function () {
				$('.football_tabs_nav li').removeClass('on');
				$(this).addClass('on');
				var h = $('.football_eliminate').height();
				$('.football_tabs_list').css({
					'height':+h +'px',
					"overflow":'hidden'
				});
				$('.football_group').css({
	                '-webkit-transform': has3d ? "translate3d(-200%,0,0)" : "translate(-200%,0)",
	                '-webkit-transition': '200ms linear'
	            });
	            $('.football_eliminate').css({
	                '-webkit-transform': has3d ? "translate3d(0,0,0)" : "translate(0,0)",
	                '-webkit-transition': '200ms linear'
	            });
			});
			$('body').on('tap','.football_tabs_nav li:last-child',function () {
				$('.football_tabs_nav li').removeClass('on');
				$(this).addClass('on');
				var h = $('.football_group').height();
				$('.football_tabs_list').css({
					'height':+h +'px',
					"overflow":'hidden'
				});
				$('.football_group').css({
	                '-webkit-transform': has3d ? "translate3d(0,0,0)" : "translate(0,0)",
	                '-webkit-transition': '200ms linear'
	            });
	            $('.football_eliminate').css({
	                '-webkit-transform': has3d ? "translate3d(200%,0,0)" : "translate(200%,0)",
	                '-webkit-transition': '200ms linear'
	            });
			});

			$('body').on('tap','.football_tabs_list dd',function (event) {
				if(event.target.text == '提醒' || event.target.text == '已提醒'){
					return false
				}
				// football.openUrl.call(this);
				window.location.href = $(this).attr('data-url');

			})
		},
		openUrl: openUrl,
		delSchedule:function (dom) {
			var fsid = dom.parents('dd').attr('fsid');
			var url ='http://www.365rili.com/schedule/wxDelete.do';
			if(app.getUa.coco){
				app.getTokenByCoco(url,function (headers) {
					$.ajax({
						url:'/schedule/wxDelete.do',
						type:'post',
						dataType:'json',
						headers:headers,
						data:{
							scheduleId:fsid
						},
						type:'post',
						success:function (data) {
							if(data.state == 'ok'){
								dom.removeClass('on');
								dom.text('提醒');
								app.call({
									action:'getNotify',
									params: [],
									callBack: function (data) {
										console.log('同步成功')
									}
								});
							}
						}
					})
				})
			}
			if(app.getUa.weixin){
				$.ajax({
					url:'/schedule/wxDelete.do',
					type:'post',
					dataType:'json',
					data:{
						scheduleId:fsid
					},
					type:'post',
					success:function (data) {
						if(data.state == 'ok'){
							dom.removeClass('on');
							dom.text('提醒');
						}
					}
				})
			}
		},
		addSchedule:function (btnDom) {
			if(app.getUa.coco){
				if(_data.cocoIsLogin){
					football.addAjaxFn(btnDom);
				}else{
					plug.confirm('','即刻体验欧洲杯赛程提醒',function () {
						window.location.reload();
					},function () {
						window.location.reload();
					});

					if(app.getUa.android){
						app.call({
			                action: 'login',
			                params: [
			                    {
			                        name: 'content',
			                        value: '请您登陆365日历，以便您添加日程提醒'
			                    }
			                    ],
			                callBack: null
			            })
					}

					if(app.getUa.ios){
						window.location.href = 'coco://365rili.com/login'
					}
				}
			}
			if(app.getUa.weixin){
				if(_data.weixinIsLogin){
					if(!_data.follow){
						var followKey = btnDom.parents('dd').attr('key');
						var codeHtml='<div class="code_div">\
										<h3>扫描二维码关注公众账号</h3>\
										<p>即可轻松获得欧洲杯赛程提醒</p>\
										<img src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+codeArray[followKey]+'" width="215" alt="">\
									</div>\
									<div class="bg"></div>';
						$('body').append(codeHtml);
					}else{
						football.addAjaxFn(btnDom)
					}
				}else{
					window.location.href = "/wx/login.do?redURL=" + encodeURIComponent(window.location.href);
				}
			}
		},
		addAjaxFn:function (btnDom) {
			var url ='http://www.365rili.com/schedule/joinWeixinSchedule.do';
			if(app.getUa.coco){
				app.getTokenByCoco(url,function (headers) {
					$.ajax({
						url:'/schedule/joinWeixinSchedule.do',
						type:'post',
						dataType:'json',
						headers:headers,
						data:{
							key:_data.key
						},
						success:function (datas) {
							if(datas.state == 'ok'){
								btnDom.addClass('on');
								btnDom.html('已提醒');
								btnDom.parents('dd').attr('fsid',datas.schedule.id)
								app.call({
									action:'getNotify',
									params: [],
									callBack: function (data) {
										console.log('同步成功')
									}
								});
							}
						}
					})
				})
			}
			if(app.getUa.weixin){
				$.ajax({
					url:'/schedule/joinWeixinSchedule.do',
					type:'post',
					dataType:'json',
					data:{
						key:_data.key
					},
					success:function (datas) {
						if(datas.state == 'ok'){
							btnDom.addClass('on');
							btnDom.html('已提醒');
							btnDom.parents('dd').attr('fsid',datas.schedule.id)
						}
					}
				})
			}	
		},
		shareFn:function () {
			wxProtocol.init(function (wx, link) {
	            wx.onMenuShareAppMessage({
	                title: '欧洲杯火热开战，错过哪场都是遗憾！',
	                desc: '365日历为你提供最便捷的赛程提醒，绝不错过一场精彩比赛！',
	                imgUrl: 'http://www.365rili.com/pages/bd/2016_football/images/share_icon.png'
	            });
	            wx.onMenuShareTimeline({
	                title: '欧洲杯火热开战，错过哪场都是遗憾！',
	                imgUrl: 'http://www.365rili.com/pages/bd/2016_football/images/share_icon.png'
	            });
	        });
	        if(!app.getUa.coco){
	        	footer.init({
		            type: 'publicSchedule',
		            cocourl: 'coco://365rili.com'
		        });
	        }
		}
	}
	football.init();
})()
var resize = baidu.webapp.resize();

var containers = new Array("cal_container","single_container", "jieqi_container","festival_container");

var fangjiaData = {
		"yuandan":"2014年1月1日放假1天",
		"chunjie":"1月31日至2月6日放假调休，共7天。1月26日（星期日）、2月8日（星期六）上班",
		"qingmingjie":"4月5日放假，4月7日（星期一）补休",
		"laodong":"5月1日至3日放假调休，共3天。5月4日（星期日）上班",
		"duanwu":"6月2日放假，与周末连休",
		"zhongqiu":"9月8日放假，与周末连休",
		"guoqing":"10月1日至7日放假调休，共7天。9月28日（星期日）、10月11日（星期六）上班"
};
var jieqiData = new Array(
	{
		"name":"立春",
		"ename":"lichun",
		"time":"2014年立春时间是2月4日",
		"des":"立春，又称“打春”，指太阳到达黄经315°时，公历每年2月3至5日之间。“立”是“开始”的意思，它是二十四节气第一个节气，也是一年的真正开始。立春过后，东风吹来，河流将会解冻。<br/>立春时，很多地区有“鞭春”和“咬春”的习俗。在立春当天，用饼皮包裹生菜，做成春饼或春卷，大家分食，祈求身体健康，称之为“咬春”。而鞭春现在离我们比较遥远了，它是古代农业社会的习俗。旧时官府都要在立春前一日举行“迎春、鞭春”大典。“鞭春”也叫“打春”，就是用鞭子抽打春牛。不过，“春牛”并非真牛，而是用塑成的土牛。立春的鞭春活动，就是告诉农人，农闲已过，应该积极准备耕作。"
	},
	{
		"name":"雨水",
		"ename":"yushui",
		"time":"2014年雨水时间是2月19日",
		"des":"每年的2月19日前后，太阳黄经达330度时，是二十四节气的雨水。此时，气温回升、冰雪融化、降水增多，故取名为雨水。雨水节气一般从2月18日或19日开始，到3月4日或5日结束。雨水和谷雨、小雪、大雪一样，都是反映降水现象的节气。<br/>《月令七十二候集解》：“正月中，天一生水。春始属木，然生木者 雨水必水也，故立春后继之雨水。且东风既解冻，则散而为雨矣。”意思是说，雨水节气前后，万物开始萌动，春天就要到了。<br/>古时民间，雨水节出嫁的女儿纷纷带上礼物回娘家拜望父母。生育了孩子的妇女，须带上罐罐肉、椅子等礼物，感谢父母的养育之恩。久不怀孕的妇女，则由母亲为其缝制一条红裤子，穿到贴身处，据说，这样可使其尽快怀孕生子。"
	},
	{
		"name":"惊蛰",
		"ename":"jingzhe",
		"time":"2014年惊蛰时间是3月6日",
		"des":"惊蛰，是24节气中的第三个节气。每年3月5日或6日，太阳到达黄经345度时即为惊蛰，这时气温回升较快，渐有春雷萌动，惊蛰的意思是天气回暖，春雷始鸣，惊醒蛰伏于地下冬眠的昆虫。而实际上，昆虫是听不到雷声的，大地回春，天气变暖才是使它们结束冬眠。<br/>惊蛰雷鸣最引人注意，惊蛰节气正处乍寒乍暖之际，现代气象科学表明，“惊蛰”前后，之所以偶有雷声，是大地湿度渐高而促使近地面热气上升或北上的湿热空气势力较强与活动频繁所致。<br/>我国古代将惊蛰分为三候：“一候桃始华；二候仓庚（黄鹂）鸣；三候鹰化为鸠。”惊蛰已是进入仲春，桃花红、李花白，黄莺呜叫、燕飞来的时节。"
	},
	{
		"name":"春分",
		"ename":"chunfen",
		"time":"2014年春分时间是3月21日",
		"des":"春分，古时又称为“日中”、“日夜分”、“仲春之月”，在每年的3月21日前后，太阳到达黄经0°时交节，春分的农历日期不固定。这天昼夜长短平均，正当春季九十日之半，故称“春分”。古时以立春至立夏为春季，春分正当春季三个月之中，平分了春季。<br/>春分是个比较重要的节气，这一天阳光直射赤道，南北半球昼夜平分，其后阳光直射位置逐渐北移，开始昼长夜短。它不仅有天文学上的意义，也有比较明显的气候特征，春分时节，我国除青藏高原、东北、西北和华北北部地区外都进入明媚的春天，在辽阔的大地上，杨柳青青、莺飞草长、小麦拔节、油菜花香。<br/>中国古代将春分分为三候：“一候元鸟至；二候雷乃发声；三候始电。”便是说春分日后，燕子便从南方飞来了，下雨时天空便要打雷并发出闪电。"
	},
	{
		"name":"清明",
		"ename":"qingming",
		"time":"2014年清明时间是4月5日",
		"des":"每年4月4日、5日或6日，太阳到达黄经15度时为清明节气，同时，它又是我国的传统节日，也是最重要的祭祀节日，是祭祖和扫墓的日子。<br/>在二十四个节气中，既是节气又是节日的只有清明。清明节的名称与此时天气物侯的特点有关。<br/>清明节的起源，据传始于古代帝王将相“墓祭”之礼，后来民间亦相仿效，于此日祭祖扫墓，历代沿袭而成为中华民族一种固定的风俗。本来，寒食节与清明节是两个不同的节日，到了唐朝，将祭拜扫墓的日子定为寒食节。<br/>在古代，清明节的习俗是丰富有趣的，除了讲究禁火、扫墓,还有踏青、荡秋千、踢蹴鞠、打马球、插柳等一系列风俗体育活动。相传，这一天民间忌使针，忌洗衣，大部分地区妇女忌行路。傍晚以前，要在大门前洒一条灰线，据说可以阻止鬼魂进宅。"
	},
	{
		"name":"谷雨",
		"ename":"guyu",
		"time":"2014年谷雨时间是4月20日",
		"des":"谷雨，也就是“雨生百谷”的意思，每年4月20日或21日太阳到达黄经30°时为谷雨。谷雨是二十四节气中的第六个节气。“谷雨三朝看牡丹”，在谷雨过后，牡丹到了最美的季节，牡丹也称谷雨花，它是花卉中唯一一种以节气命名的花。<br/>在古时农耕时代，这时田中的秧苗初插、作物新种，最需要雨水的滋润，所以说“春雨贵如油”。关于谷雨节的来历，据《淮南子》记载，仓颉造字，是一件惊天动地的大事，黄帝于春末夏初发布诏令，宣布仓颉造字成功，并号召天下臣民共习之。这一天，下了一场不平常的雨，落下无数的谷米，后人因此把这天定名谷雨，成为二十四节气中的一个。<br/>在南方一些地区，有喝谷雨茶、谷雨摘茶的习俗，传说谷雨这天的茶喝了会清火，辟邪，明目等；而北方则有谷雨食香椿的习俗。"
	},
	{
		"name":"立夏",
		"ename":"lixia",
		"time":"2014年立夏时间是5月5日",
		"des":"每年5月5日或5月6日是农历的立夏。“斗指东南，维为立夏，万物至此皆长大，故名立夏也。”此时，太阳黄经为45度，在天文学上，立夏表示即将告别春天，是夏天的开始。<br/>人们习惯把立夏作为夏季开始，但实际上我国各地冷暖不同，入夏时间实际上并不一致。立夏时节，万物繁茂。这时夏收作物进入生长后期，冬小麦扬花灌浆，油菜接近成熟，夏收作物年景基本定局，故农谚有“立夏看夏”之说。而水稻等春播作物，也进入了繁忙季节。<br/>我国古来很重视立夏节气。据记载，在立夏的这一天，古代帝王要率文武百官到京城南郊去迎夏，举行迎夏仪式。在古代，民间有立夏称体重、吃蛋、饮茶等习俗。"
	},
	{
		"name":"小满",
		"ename":"xiaoman",
		"time":"2014年小满时间是5月21日",
		"des":"小满是二十四节气中的第八个节气，夏季的第二个节气。其含义是夏熟作物的籽粒开始灌浆饱满，但还未成熟，只是小满，还未大满。通常每年5月21日或22日视太阳到达黄径60°时为小满。<br/>我国古代将小满分为三候：“一候苦菜秀；二候靡草死；三候麦秋至。”是说小满节气中，苦菜已经枝叶繁茂；而喜阴的一些枝条细软的草类在强烈的阳光下开始枯死。“斗指甲为小满，万物长于此少得盈满，麦至此方小满而未全熟，故名也。”这是说从小满开始，大麦、冬小麦等夏收作物已经结果，籽粒渐见饱满，但尚未成熟。"
	},
	{
		"name":"芒种",
		"ename":"mangzhong",
		"time":"2014年芒种时间是6月6日",
		"des":"每年6月5日左右，太阳黄经达到75度时，就是芒种节气了。芒种是二十四节气中的第9个节气。“芒”是指麦类等有芒作物成熟，并开始收割；“种”指谷黍作物的播种。<br/>《月令七十二候集解》中说：“五月节，谓有芒之种谷可稼种矣。”意指大麦、小麦等到有芒作物种子已经成熟，抢收十分急迫。“春争日，夏争时”，这“争时”即指这个时节的收种农忙。 <br/>在芒种前后，我国气候的主要特点是，长江中、下游地区持续阴雨，雨量增多，气温升高，空气非常潮湿，天气十分闷热，各种物品容易发霉，一般人称这段时间为霉雨季节。由于此时天气越来越热，蚊虫孳生，容易传染疾病，故5月有“百毒之月”之称。此节气正逢端午节（农历五月初五）前后，家家户户在门楣悬挂菖蒲，藉以避邪驱毒。"
	},
	{
		"name":"夏至",
		"ename":"xiazhi",
		"time":"2014年夏至时间是6月21日",
		"des":"每年的6月21日或22日，为夏至。夏至这天，太阳直射地面的位置到达一年的最北端，几乎直射北回归线(北纬23°27’)，北半球的白昼达最长，且越往北越长。是北半球一年中白昼最长的一天，南方各地从日出到日没大多为十四小时左右。<br/>夏至这天虽然白昼最长，太阳角度最高，但并不是一年中天气最热的时候。因为，接近地表的热量，这时还在继续积蓄，并没有达到最多的时候。俗话说“热在三伏”，真正的暑热天气是以夏至和立秋为基点计算的。<br/>夏至日是我国最早的节日。清代之前的夏至日全国放假一天，回家与亲人团聚畅饮。《礼记》中也记载了自然界有关夏至节气的明显现象：“夏至到，鹿角解，蝉始鸣，半夏生，木槿荣。”说明这一时节可以开始割鹿角，蝉儿开始鸣叫，半夏、木槿两种植物逐渐繁盛开花。"
	},
	{
		"name":"小暑",
		"ename":"xiaoshu",
		"time":"2014年小暑时间是7月7日",
		"des":"每年7月7日或8日视太阳到达黄经105°时为小暑。小暑是二十四个节气中的第十一个节气。暑，表示炎热的意思，小暑为小热，还不十分热。意指天气开始炎热，但还没到最热。小暑是相对大暑而言，俗话说：“热在三伏”。我国三伏天气一般出现在夏至后的第28天，即所谓“夏至三庚数头伏”。<br/>小暑的标志是，出梅，入伏。这时江淮流域梅雨即将结束，盛夏开始，气温升高，并进入伏旱期；而华北、东北地区进入多雨季节，热带气旋活动频繁，登陆我国的热带气旋开始增多。<br/>我国古代将小暑分为三候：“一候温风至；二候蟋蟀居宇；三候鹰始鸷。”小暑时节大地上便不再有一丝凉风，而是所有的风中都带着热浪；由于炎热，蟋蟀离开了田野，到庭院的墙角下以避暑热；而老鹰因地面气温太高而在清凉的高空中活动。"
	},
	{
		"name":"大暑",
		"ename":"dashu",
		"time":"2014年大暑时间是7月23日",
		"des":"“大暑”在每年的7月23日或24日，太阳到达黄经120°。暑，是炎热的意思；大暑就是非常热，相比小暑，此时已经很热了，是一年中气温最高、最热的时期。<br/>大暑前后，华南地区进入一年中日照最多、气温最高的时期，是华南西部雨水最丰沛、雷暴最常见、30℃以上高温日数最集中的时期，也是华南东部35℃以上高温出现最频繁的时期。<br/>我国古代将大暑分为三候：“一候腐草为萤；二候土润溽暑；三候大雨时行。”世上萤火虫约有二千多种，分水生与陆生两种，陆生的萤火虫产卵于枯草上，大暑时，萤火虫卵化而出，所以古人认为萤火虫是腐草变成的；第二候是说天气开始变得闷热，土地也很潮湿；第三候是说时常有大的雷雨会出现，这大雨使暑湿减弱，天气开始向立秋过渡。"
	},
	{
		"name":"立秋",
		"ename":"liqiu",
		"time":"2014年立秋时间是8月7日",
		"des":"每年8月7日或8日视太阳到达黄经135°时为立秋。立秋一般预示着炎热的夏天即将过去，秋天即将来临。立秋后虽然一时暑气难消，还有“秋老虎”的余威，但总的趋势是天气逐渐凉爽。<br/>立秋又称“交秋”，古人把立秋当作夏秋之交的重要时刻，一直很重视这个节气。我国古代将立秋分为三候：“一候凉风至；二候白露生；三候寒蝉鸣。”是说立秋过后，刮风时人们会感觉到凉爽，此时的风已不同于暑天中的热风；接着，大地上早晨会有雾气产生；并且秋天感阴而鸣的寒蝉也开始鸣叫。<br/>由于全国各地气候不同，秋季开始时间也不一致。气候学上以每5天的日平均气温稳定下降到22℃以下的始日作为秋季开始，这种划分方法比较符合各地实际，但与黄河中下游立秋日期相差较大。所以，按气候学划分季节的标准，我国很少有在“立秋”就进入秋季的地区。"
	},
	{
		"name":"处暑",
		"ename":"chushu",
		"time":"2014年处暑时间是8月23日",
		"des":"处暑节气在每年8月23日左右，此时太阳到达黄经150°。处暑是反映气温变化的一个节气。据《月令七十二候集解》说：“处，去也，暑气至此而止矣。”“处”含有躲藏、终止意思，“处暑”表示炎热暑天结束了。<br/>处暑前后我国北京、太原、西安、成都和贵阳一线以东及以南的广大地区和新疆塔里木盆地地区日平均气温仍在摄氏二十二度以上，处于夏季，但是这时冷空气南下次数增多，气温下降逐渐明显。每每风雨过后，特别是下雨过后，人们会感到较明显的降温。故有“一场秋雨一场寒”之说。<br/>我国古代将处暑分为三候：“一候鹰乃祭鸟；二候天地始肃；三候禾乃登。”此节气中老鹰开始大量捕猎鸟类；天地间万物开始凋零；“禾乃登”的“禾”指的是黍、稷、稻、粱类农作物的总称，“登”即成熟的意思。"
	},
	{
		"name":"白露",
		"ename":"bailu",
		"time":"2014年白露时间是9月8日",
		"des":"每年9月8日前后太阳到达黄经165°时，交“白露”节气。“白露”是反映自然界气温变化的节令。顾名思义，白露就是白色露水，露是“白露”节气后特有的一种自然现象，气温渐凉，夜来草木上可见到白色露水。<br/>从气候规律说，白露时节，凉爽的秋风自北向南已吹遍淮北大地，成都、贵阳以西等地日平均气温也降到22℃以下，开始了金色的秋季。俗话说：“白露秋分夜，一夜冷一夜。”这时夏季风逐渐为冬季风所代替，多吹偏北风，冷空气南下逐渐频繁，加上太阳直射地面的位置南移，北半球日照时间变短，日照强度减弱，夜间常晴朗少云，地面辐射散热快，故温度下降速度也逐渐加快。<br/>我国古代将白露分为三候：“一候鸿雁来；二候玄鸟归；三候群鸟养羞。”说此节气正是鸿雁与燕子等候鸟南飞避寒，百鸟开始贮存干果粮食以备过冬。"
	},
	{
		"name":"秋分",
		"ename":"qiufen",
		"time":"2014年秋分时间是9月23日",
		"des":"“秋分”的意思有二：一是太阳在这时到达黄径180°，而一天24小时昼夜均分，各12小时；二是按我国古代以立春、立夏、立秋、立冬为四季开始的季节划分法，秋分日居秋季90天之中，平分了秋季。“分”表示昼夜平分之意，同春分一样，此日阳光直射地球赤道，昼夜相等。<br/>秋分后太阳直射的位置移至南半球，北半球得到的太阳辐射越来越少，而地面散失的热量却较多，气温降低的速度明显加快。秋分时节，我国长江流域及其以北的广大地区，均先后进入了秋季，日平均气温都降到了22℃以下。北方冷气团开始具有一定的势力，各地昼夜温差逐渐加大，幅度将高于10℃以上。<br/>我国古代将秋分分为三候：“一候雷始收声；二候蛰虫坯户；三候水始涸”。"
	},
	{
		"name":"寒露",
		"ename":"hanlu",
		"time":"2014年寒露时间是10月8日",
		"des":"寒露是24节气中第17个节气，每年10月8日或9日，视太阳到达黄经195°时为寒露。《月令七十二候集解》说：“九月节，露气寒冷，将凝结也。”寒露的意思是气温比白露时更低，地面的露水更冷，快要凝结成霜了。<br/>寒露时节，南岭及以北的广大地区均已进入秋季，东北和西北地区已进入或即将进入冬季。此时北方已呈深秋景象，白云红叶，偶见早霜，南方也秋意渐浓，蝉噤荷残。<br/>我国古代物候将寒露分为三候：“一候鸿雁来宾；二候雀入大水为蛤；三候菊有黄华。” 此节气中鸿雁排成一字或人字形的队列大举南迁；深秋天寒，雀鸟都不见了，古人看到海边突然出现很多蛤蜊，并且贝壳的条纹及颜色与雀鸟很相似，所以便以为是雀鸟变成的；第三候的“菊始黄华”是说在此时菊花已普遍开放。"
	},
	{
		"name":"霜降",
		"ename":"shuangjiang",
		"time":"2014年霜降时间是10月23日",
		"des":"霜降是秋季的最后一个节气，每年阳历10月23日前后，太阳到达黄经210°时为二十四节气中的霜降。这时，温度骤然下降到0度以下，空气中的水蒸气在地面或植物上直接凝结形成细微的冰针，有的成为六角形的霜花。“霜降”表示天气逐渐变冷，开始降霜。霜降时节，我国不少地区都有吃柿子、赏菊等习俗，在古代此时，不少地方可能要举行菊花会，赏菊饮酒呢。<br/>我国古代将霜降分为三候：“一候豺乃祭兽；二候草木黄落；三候蜇虫咸俯。” 此节气中豺狼将捕获的猎物先陈列后再食用；大地上的树叶枯黄掉落；蜇虫也全在洞中不动不食，垂下头来进入冬眠状态中。"
	},
	{
		"name":"立冬",
		"ename":"lidong",
		"time":"2014年立冬时间是11月7日",
		"des":"“立冬”节气在每年阳历的11月7日或8日，这时太阳已到达黄经225°，北半球获得的太阳辐射量越来越少，不过由于地表下半年贮存的热量还有一定的剩余，所以一般还不太冷。我国古代习惯以立冬为冬季的开始，实际上，我国最北部的漠河及大兴安岭以北地区，9月上旬就早已进入冬季，北京于10月下旬也已一派冬天的景象，而长江流域的冬季要到“小雪”节气前后才真正开始。<br/>“冬，终也，万物收藏也”，表示冬季开始，万物收藏，规避寒冷的意思。立冬节气，草木凋零，蛰虫伏藏，万物活动趋向休止，进入冬眠状态，养精蓄锐。人类虽没有冬眠之说，但民间却有立冬补冬的习俗。所以谚语说“立冬补冬，补嘴空”。<br/>在古代社会，立冬也是个重要的节日，它与立春、立夏、立秋合称四立。"
	},
	{
		"name":"小雪",
		"ename":"xiaoxue",
		"time":"2014年小雪时间是11月22日",
		"des":"每年11月22日或23日，视太阳到达黄经240°时为小雪，今年的小雪准确时间为23日零时08分，这是根据紫金山天文台数据得来。这个时期天气逐渐变冷，黄河中下游平均初雪期基本与小雪节令一致。虽然开始下雪，通常雪量较小，并且夜冻昼化。不过如果冷空气势力较强的话，也会下大雪。像2009年的冬天，11月15日就天降大雪。<br/>小雪和雨水、谷雨等节气一样，是反映天气现象的节令。古籍《群芳谱》中说：“小雪气寒而将雪矣，地寒未甚而雪未大也。”这就是说，到“小雪”节由于天气寒冷，降水形式由雨变为雪，但此时由于“地寒未甚”故雪量还不大，所以称为小雪。<br/>小雪后气温急剧下降，天气变得干燥，是加工腊肉的好时候。古代很多地方都有“冬腊风腌，蓄以御冬”的习俗，等到春节时正好享受美食。在南方某些地方，还有农历十月吃糍粑的习俗。"
	},
	{
		"name":"大雪",
		"ename":"daxue",
		"time":"2014年大雪时间均为12月7日",
		"des":"“大雪”节气，在每年的12月7日或8日，其时视太阳到达黄经255°。这时我国大部分地区的最低温度都降到了0℃或以下。往往在强冷空气前沿冷暖空气交锋的地区，这个时段，雪往往下得大、范围也广，故名大雪。它和小雪、雨水、谷雨等节气一样，都是直接反映降水的节气。<br/>不过，只是说降雪的可能性比小雪时更大了，并不指降雪量一定很大。相反，大雪后各地降水量均进一步减少，东北、华北地区12月平均降水量一般只有几毫米，西北地区则不到1毫米。<br/>我国古代将大雪分为三候：“一候鹃鸥不呜；二候虎始交；三候荔挺出。”这是说，此时因天气寒冷，寒号鸟也不再呜叫了；由于此时是阴气最盛时期，正所谓盛极而衰，阳气已有所萌动，所以老虎开始有求偶行为；“荔挺”为兰草的一种，也感到阳气的萌动而抽出新芽。"
	},
	{
		"name":"冬至",
		"ename":"dongzhi",
		"time":"2014年冬至时间是12月22日",
		"des":"冬至，是中国农历中一个非常重要的节气，早在二千五百多年前的春秋时代，中国就已经用土圭观测太阳，测定出了冬至，它是二十四节气中最早制订出的一个，时间在每年的阳历12月21日至23日之间，太阳到达黄经270°时开始。这一天是北半球全年中白天最短、夜晚最长的一天。<br/>冬至日是数九寒天的第一天，俗谚“冬至交九”，从冬至日开始即进入“数九天”，以九天为一九，九九八十一天，寒冬就会过去，称为九九数尽。<br/>古代人对这个节气非常重视，《后汉书》中有这样的记载：“冬至前后，君子安身静体，百官绝事，不听政，择吉辰而后省事。”所以这天朝庭上下要放假休息，军队待命，边塞闭关，商旅停业，亲朋各以美食相赠，相互拜访，欢乐地过一个“安身静体”的节日。"
	},
	{
		"name":"小寒",
		"ename":"xiaohan",
		"time":"2015年小寒时间是1月6日",
		"des":"小寒是24节气中的第二十三个节气，每年1月5日或6日太阳到达黄经285°时为小寒。对于中国而言，这时正值“三九”前后，小寒标志着开始进入一年中最寒冷的日子。根据中国的气象资料，小寒是气温是最低的的节气，只有少数年份的大寒气温是低于小寒的。民间有“小寒大寒，滴水成冰”的说法。<br/>我国古代将小寒分为三候：“一候雁北乡，二候鹊始巢，三候雉始鸲”，古人认为候鸟中大雁是顺阴阳而迁移，此时阳气已动，所以大雁开始向北迁移；此时北方到处可见到喜鹊，并且感觉到阳气而开始筑巢；第三候“雉鸲”的“鸲”为鸣叫的意思，雉在接近四九时会感阳气的生长而鸣叫。"
	},
	{
		"name":"大寒",
		"ename":"dahan",
		"time":"2015年大寒时间是1月20日",
		"des":"大寒是二十四节气中最后一个节气，每年1月20日前后太阳到达黄经300°时为大寒。“寒气之逆极，故谓大寒。”也就是天气寒冷到极点的意思。中国大部分地区呈现出冰天雪地、天寒地冻的严寒景象，大寒也是一年中降雨水最少的时段。<br/>“过了大寒，又是一年”，大寒是二十四节气之尾，冬季即将结束，隐隐中已可感受到大地回春的迹象，我国最热闹和隆重的节日——春节也在这个节令中，人们忙着除旧迎新，等待春季的到来。"
	}
);

var festivalData = new Object();
festivalData["yuandan"]="2014_1_1";
festivalData["chunjie"]="2014_1_31";
festivalData["qingmingjie"]="2014_4_5";
festivalData["laodong"]="2014_5_1";
festivalData["duanwu"]="2014_6_2";
festivalData["zhongqiu"]="2014_9_8";
festivalData["guoqing"]="2014_10_1";

var showContainers = function(name) {
	for ( i = 0; i < containers.length; i++) {
		if ( containers[i] != name ) {
			$("#"+containers[i]).hide();
		} else {
			$("#"+name).show();
		}
	}
	resize.start($('#middle').height());
}

//--calendarObj.js
﻿/*****************************************************************************
                                   日期资料
*****************************************************************************/

var lunarInfo=new Array(
0x4bd8,0x4ae0,0xa570,0x54d5,0xd260,0xd950,0x5554,0x56af,0x9ad0,0x55d2,
0x4ae0,0xa5b6,0xa4d0,0xd250,0xd295,0xb54f,0xd6a0,0xada2,0x95b0,0x4977,
0x497f,0xa4b0,0xb4b5,0x6a50,0x6d40,0xab54,0x2b6f,0x9570,0x52f2,0x4970,
0x6566,0xd4a0,0xea50,0x6a95,0x5adf,0x2b60,0x86e3,0x92ef,0xc8d7,0xc95f,
0xd4a0,0xd8a6,0xb55f,0x56a0,0xa5b4,0x25df,0x92d0,0xd2b2,0xa950,0xb557,
0x6ca0,0xb550,0x5355,0x4daf,0xa5b0,0x4573,0x52bf,0xa9a8,0xe950,0x6aa0,
0xaea6,0xab50,0x4b60,0xaae4,0xa570,0x5260,0xf263,0xd950,0x5b57,0x56a0,
0x96d0,0x4dd5,0x4ad0,0xa4d0,0xd4d4,0xd250,0xd558,0xb540,0xb6a0,0x95a6,
0x95bf,0x49b0,0xa974,0xa4b0,0xb27a,0x6a50,0x6d40,0xaf46,0xab60,0x9570,
0x4af5,0x4970,0x64b0,0x74a3,0xea50,0x6b58,0x5ac0,0xab60,0x96d5,0x92e0,
0xc960,0xd954,0xd4a0,0xda50,0x7552,0x56a0,0xabb7,0x25d0,0x92d0,0xcab5,
0xa950,0xb4a0,0xbaa4,0xad50,0x55d9,0x4ba0,0xa5b0,0x5176,0x52bf,0xa930,
0x7954,0x6aa0,0xad50,0x5b52,0x4b60,0xa6e6,0xa4e0,0xd260,0xea65,0xd530,
0x5aa0,0x76a3,0x96d0,0x4afb,0x4ad0,0xa4d0,0xd0b6,0xd25f,0xd520,0xdd45,
0xb5a0,0x56d0,0x55b2,0x49b0,0xa577,0xa4b0,0xaa50,0xb255,0x6d2f,0xada0,
0x4b63,0x937f,0x49f8,0x4970,0x64b0,0x68a6,0xea5f,0x6b20,0xa6c4,0xaaef,
0x92e0,0xd2e3,0xc960,0xd557,0xd4a0,0xda50,0x5d55,0x56a0,0xa6d0,0x55d4,
0x52d0,0xa9b8,0xa950,0xb4a0,0xb6a6,0xad50,0x55a0,0xaba4,0xa5b0,0x52b0,
0xb273,0x6930,0x7337,0x6aa0,0xad50,0x4b55,0x4b6f,0xa570,0x54e4,0xd260,
0xe968,0xd520,0xdaa0,0x6aa6,0x56df,0x4ae0,0xa9d4,0xa4d0,0xd150,0xf252,
0xd520);

var solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var Gan=new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
var Zhi=new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);
var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');
var nStr2 = new Array('初','十','廿','卅','□');
var monthName = new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
var cmonthName = new Array('正','二','三','四','五','六','七','八','九','十','十一','腊');

//公历节日 *表示放假日
var sFtv = new Array(
"0101*元旦",
"0214 情人节",
"0308 妇女节",
"0312 植树节",
"0401 愚人节",
"0422 地球日",
"0501 劳动节",
"0504 青年节",
"0531 无烟日", 
"0601 儿童节",
"0606 爱眼日",
"0701 建党日",
"0707 抗战纪念日",
"0801 建军节",
"0910 教师节",
"0918 九·一八事变纪念日",
"1001*国庆节",
"1031 万圣节",
"1111 光棍节",
"1201 艾滋病日",
"1213 南京大屠杀纪念日",
"1224 平安夜",
"1225 圣诞节");

//某月的第几个星期几。 5,6,7,8 表示到数第 1,2,3,4 个星期几
var wFtv = new Array(
//一月的最后一个星期日（月倒数第一个星期日）
"0520 母亲节",
"0630 父亲节",
"1144 感恩节");

//农历节日
var lFtv = new Array(
"0101*春节",
"0115 元宵节",
"0202 龙抬头",
"0505 端午节",
"0707 七夕",
"0715 中元节",
"0815 中秋节",
"0909 重阳节",
"1208 腊八节",
"1223 小年",
"0100*除夕");


/*****************************************************************************
                                      日期计算
*****************************************************************************/

//====================================== 返回农历 y年的总天数
function lYearDays(y) {
 var i, sum = 348;
 for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0;
 return(sum+leapDays(y));
}

//====================================== 返回农历 y年闰月的天数
function leapDays(y) {
 if(leapMonth(y)) return( (lunarInfo[y-1899]&0xf)==0xf? 30: 29);
 else return(0);
}

//====================================== 返回农历 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {
 var lm = lunarInfo[y-1900] & 0xf;
 return(lm==0xf?0:lm);
}

//====================================== 返回农历 y年m月的总天数
function monthDays(y,m) {
 return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}



//====================================== 算出农历, 传入日期控件, 返回农历日期控件
//                                       该控件属性有 .year .month .day .isLeap
function Lunar(objDate) {

   var i, leap=0, temp=0;
   var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;

   for(i=1900; i<2100 && offset>0; i++) { temp=lYearDays(i); offset-=temp; }

   if(offset<0) { offset+=temp; i--; }

   this.year = i;

   leap = leapMonth(i); //闰哪个月
   this.isLeap = false;

   for(i=1; i<13 && offset>0; i++) {
      //闰月
      if(leap>0 && i==(leap+1) && this.isLeap==false)
         { --i; this.isLeap = true; temp = leapDays(this.year); }
      else
         { temp = monthDays(this.year, i); }

      //解除闰月
      if(this.isLeap==true && i==(leap+1)) this.isLeap = false;

      offset -= temp;
   }

   if(offset==0 && leap>0 && i==leap+1)
      if(this.isLeap)
         { this.isLeap = false; }
      else
         { this.isLeap = true; --i; }

   if(offset<0){ offset += temp; --i; }

   this.month = i;
   this.day = offset + 1;
}

function getSolarDate(lyear, lmonth, lday, isLeap) {
  var offset = 0;
  
  // increment year
  for(var i = 1900; i < lyear; i++) {
    offset += lYearDays(i);
  }

  // increment month
  // add days in all months up to the current month
  for (var i = 1; i < lmonth; i++) {
    // add extra days for leap month
    if (i == leapMonth(lyear)) {
      offset += leapDays(lyear);
    }
    offset += monthDays(lyear, i);
  }
  // if current month is leap month, add days in normal month
  if (isLeap) {
    offset += monthDays(lyear, i);
  }
   
  // increment 
  offset += parseInt(lday) - 1;

  var baseDate = new Date(1900,0,31);
  var solarDate = new Date(baseDate.valueOf() + offset * 86400000);
  return solarDate;
}


//==============================返回公历 y年某m+1月的天数
function solarDays(y,m) {
   if(m==1)
      return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
   else
      return(solarMonth[m]);
}

//============================== 传入 offset 返回干支, 0=甲子
function cyclical(num) {
   return(Gan[num%10]+Zhi[num%12]);
}


//============================== 阴历属性
function calElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap,cYear,cMonth,cDay) {

      this.isToday    = false;
      //瓣句
      this.sYear      = sYear;   //公元年4位数字
      this.sMonth     = sMonth;  //公元月数字
      this.sDay       = sDay;    //公元日数字
      this.week       = week;    //星期, 1个中文
      //农历
      this.lYear      = lYear;   //公元年4位数字
      this.lMonth     = lMonth;  //农历月数字
      this.lDay       = lDay;    //农历日数字
      this.isLeap     = isLeap;  //是否为农历闰月?
      //八字
      this.cYear      = cYear;   //年柱, 2个中文
      this.cMonth     = cMonth;  //月柱, 2个中文
      this.cDay       = cDay;    //日柱, 2个中文

      this.color      = '';

      this.lunarFestival = ''; //农历节日
      this.solarFestival = ''; //公历节日
      this.solarTerms    = ''; //节气
}

//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y,n) {
   var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) + Date.UTC(1900,0,6,2,5) );
   return(offDate.getUTCDate());
}





//============================== 返回阴历控件 (y年,m+1月)
/*
功能说明: 返回整个月的日期资料控件

使用方式: OBJ = new calendar(年,零起算月);

  OBJ.length      返回当月最大日
  OBJ.firstWeek   返回当月一日星期

  由 OBJ[日期].属性名称 即可取得各项值

  OBJ[日期].isToday  返回是否为今日 true 或 false

  其他 OBJ[日期] 属性参见 calElement() 中的注解
*/
function calendar(y,m) {

   var sDObj, lDObj, lY, lM, lD=1, lL, lX=0, tmp1, tmp2, tmp3;
   var cY, cM, cD; //年柱,月柱,日柱
   var lDPOS = new Array(3);
   var n = 0;
   var firstLM = 0;

   sDObj = new Date(y,m,1,0,0,0,0);    //当月一日日期

   this.length    = solarDays(y,m);    //公历当月天数
   this.firstWeek = sDObj.getDay();    //公历当月1日星期几

   ////////年柱 1900年立春后为庚子年(60进制36)
   if(m<2) cY=cyclical(y-1900+36-1);
   else cY=cyclical(y-1900+36);
   var term2=sTerm(y,2); //立春日期

   ////////月柱 1900年1月小寒以前为 丙子月(60进制12)
   var firstNode = sTerm(y,m*2) //返回当月「节」为几日开始
   cM = cyclical((y-1900)*12+m+12);

   //当月一日与 1900/1/1 相差天数
   //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
   var dayCyclical = Date.UTC(y,m,1,0,0,0,0)/86400000+25567+10;

   for(var i=0;i<this.length;i++) {

      if(lD>lX) {
         sDObj = new Date(y,m,i+1);    //当月一日日期
         lDObj = new Lunar(sDObj);     //农历
         lY    = lDObj.year;           //农历年
         lM    = lDObj.month;          //农历月
         lD    = lDObj.day;            //农历日
         lL    = lDObj.isLeap;         //农历是否闰月
         lX    = lL? leapDays(lY): monthDays(lY,lM); //农历当月最后一天

         if(n==0) firstLM = lM;
         lDPOS[n++] = i-lD+1;
      }

      //依节气调整二月分的年柱, 以立春为界
      if(m==1 && (i+1)==term2) cY=cyclical(y-1900+36);
      //依节气月柱, 以「节」为界
      if((i+1)==firstNode) cM = cyclical((y-1900)*12+m+13);
      //日柱
      cD = cyclical(dayCyclical+i);

      //sYear,sMonth,sDay,week,
      //lYear,lMonth,lDay,isLeap,
      //cYear,cMonth,cDay
      this[i] = new calElement(y, m+1, i+1, nStr1[(i+this.firstWeek)%7],
                               lY, lM, lD++, lL,
                               cY ,cM, cD );
   }

   //节气
   tmp1=sTerm(y,m*2  )-1;
   tmp2=sTerm(y,m*2+1)-1;
   this[tmp1].solarTerms = solarTerm[m*2];
   this[tmp2].solarTerms = solarTerm[m*2+1];
   //if(m==3) this[tmp1].color = 'red'; //清明颜色

   //公历节日
   for(i in sFtv)
      if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
         if(Number(RegExp.$1)==(m+1)) {
            this[Number(RegExp.$2)-1].solarFestival += RegExp.$4 + ' ';
            if(RegExp.$3=='*') this[Number(RegExp.$2)-1].color = 'red';
         }

   //月周节日
   for(i in wFtv)
      if(wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
         if(Number(RegExp.$1)==(m+1)) {
            tmp1=Number(RegExp.$2);
            tmp2=Number(RegExp.$3);
            if(tmp1<5)
               this[((this.firstWeek>tmp2)?7:0) + 7*(tmp1-1) + tmp2 - this.firstWeek].solarFestival += RegExp.$5 + ' ';
            else {
               tmp1 -= 5;
               tmp3 = (this.firstWeek+this.length-1)%7; //当月最后一天星期?
               this[this.length - tmp3 - 7*tmp1 + tmp2 - (tmp2>tmp3?7:0) - 1 ].solarFestival += RegExp.$5 + ' ';
            }
         }

   //农历节日
   for(i in lFtv)
      if(lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
         tmp1=Number(RegExp.$1)-firstLM;
         if(tmp1==-11) tmp1=1;
         if(tmp1 >=0 && tmp1<n) {
            tmp2 = lDPOS[tmp1] + Number(RegExp.$2) -1;
            if( tmp2 >= 0 && tmp2<this.length && this[tmp2].isLeap!=true) {
               this[tmp2].lunarFestival += RegExp.$4 + ' ';
               if(RegExp.$3=='*') this[tmp2].color = 'red';
            }
         }
      }


   //复活节只出现在3或4月
//  if(m==2 || m==3) {
//      var estDay = new easter(y);
//      if(m == estDay.m)
//         this[estDay.d-1].solarFestival = this[estDay.d-1].solarFestival+' 复活节 Easter Sunday';
//   }

   //黑色星期五
//	if((this.firstWeek+12)%7==5)
//      this[12].solarFestival += '黑色星期五';

   //今日
   //if(y==g_tY && m==g_tM) {this[g_tD-1].isToday = true;}

}




//======================================= 返回该年的复活节(春分后第一次满月周后的第一主日)
function easter(y) {

   var term2=sTerm(y,5); //取得春分日期
   var dayTerm2 = new Date(Date.UTC(y,2,term2,0,0,0,0)); //取得春分的公历日期控件(春分一定出现在3月)
   var lDayTerm2 = new Lunar(dayTerm2); //取得取得春分农历

   if(lDayTerm2.day<15) //取得下个月圆的相差天数
      var lMlen= 15-lDayTerm2.day;
   else
      var lMlen= (lDayTerm2.isLeap? leapDays(y): monthDays(y,lDayTerm2.month)) - lDayTerm2.day + 15;

   //一天等于 1000*60*60*24 = 86400000 毫秒
   var l15 = new Date(dayTerm2.getTime() + 86400000*lMlen ); //求出第一次月圆为公历几日
   var dayEaster = new Date(l15.getTime() + 86400000*( 7-l15.getUTCDay() ) ); //求出下个周日

   this.m = dayEaster.getUTCMonth();
   this.d = dayEaster.getUTCDate();

}

//====================== 中文日期
function cDay(d){
   var s;

   switch (d) {
      case 10:
         s = '初十'; break;
      case 20:
         s = '二十'; break;
         break;
      case 30:
         s = '三十'; break;
         break;
      default :
         s = nStr2[Math.floor(d/10)];
         s += nStr1[d%10];
   }
   return(s);
}


//--workTime.js
var worktime = {};
worktime.y2012 = {    "d0101": {        "w": "放假"    },    "d0102": {        "w": "放假"    },    "d0103": {        "w": "放假"    },    "d0121": {        "w": "上班"    },    "d0122": {        "w": "放假"    },    "d0123": {        "w": "放假"    },    "d0124": {        "w": "放假"    },    "d0125": {        "w": "放假"    },    "d0126": {        "w": "放假"    },    "d0127": {        "w": "放假"    },    "d0128": {        "w": "放假"    },    "d0129": {        "w": "上班"    },    "d0331": {        "w": "上班"    },    "d0401": {        "w": "上班"    },    "d0402": {        "w": "放假"    },    "d0403": {        "w": "放假"    },    "d0404": {        "w": "放假"    },    "d0428": {        "w": "上班"    },    "d0429": {        "w": "放假"    },    "d0430": {        "w": "放假"    },    "d0501": {        "w": "放假"    },    "d0622": {        "w": "放假"    },    "d0623": {        "w": "放假"    },    "d0624": {        "w": "放假"    },    "d0929": {        "w": "上班"    },    "d0930": {        "w": "放假"    },    "d1001": {        "w": "放假"    },    "d1002": {        "w": "放假"    },    "d1003": {        "w": "放假"    },    "d1004": {        "w": "放假"    },    "d1005": {        "w": "放假"    },    "d1006": {        "w": "放假"    },    "d1007": {        "w": "放假"    }}
worktime.y2013 = {    "d0101": {        "w": "放假"    },    "d0102": {        "w": "放假"    },    "d0103": {        "w": "放假"    },    "d0105": {        "w": "上班"    },    "d0106": {        "w": "上班"    },    "d0209": {        "w": "放假"    },    "d0210": {        "w": "放假"    },    "d0211": {        "w": "放假"    },    "d0212": {        "w": "放假"    },    "d0213": {        "w": "放假"    },    "d0214": {        "w": "放假"    },    "d0215": {        "w": "放假"    },    "d0216": {        "w": "上班"    },    "d0217": {        "w": "上班"    },    "d0404": {        "w": "放假"    },    "d0405": {        "w": "放假"    },    "d0406": {        "w": "放假"    },    "d0407": {        "w": "上班"    },    "d0427": {        "w": "上班"    },    "d0428": {        "w": "上班"    },    "d0429": {        "w": "放假"    },    "d0430": {        "w": "放假"    },    "d0501": {        "w": "放假"    },    "d0608": {        "w": "上班"    },    "d0609": {        "w": "上班"    },    "d0610": {        "w": "放假"    },    "d0611": {        "w": "放假"    },    "d0612": {        "w": "放假"    },    "d0919": {        "w": "放假"    },    "d0920": {        "w": "放假"    },    "d0921": {        "w": "放假"    },    "d0922": {        "w": "上班"    },    "d0929": {        "w": "上班"    },    "d1001": {        "w": "放假"    },    "d1002": {        "w": "放假"    },    "d1003": {        "w": "放假"    },    "d1004": {        "w": "放假"    },    "d1005": {        "w": "放假"    },    "d1006": {        "w": "放假"    },    "d1007": {        "w": "放假"    },    "d1012": {        "w": "上班"    }}
worktime.y2014 = {
		"d0101":{"w":"放假"},
		"d0126":{"w":"上班"},
		"d0131":{"w":"放假"},
		"d0201":{"w":"放假"},
		"d0202":{"w":"放假"},
		"d0203":{"w":"放假"},
		"d0204":{"w":"放假"},
		"d0205":{"w":"放假"},
		"d0206":{"w":"放假"},
		"d0208":{"w":"上班"},
		"d0405":{"w":"放假"},
		"d0406":{"w":"放假"},
		"d0407":{"w":"放假"},
		"d0501":{"w":"放假"},
		"d0502":{"w":"放假"},
		"d0503":{"w":"放假"},
		"d0504":{"w":"上班"},
		"d0531":{"w":"放假"},
		"d0601":{"w":"放假"},
		"d0602":{"w":"放假"},
		"d0906":{"w":"放假"},
		"d0907":{"w":"放假"},
		"d0908":{"w":"放假"},
		"d0928":{"w":"上班"},
		"d1001":{"w":"放假"},
		"d1002":{"w":"放假"},
		"d1003":{"w":"放假"},
		"d1004":{"w":"放假"},
		"d1005":{"w":"放假"},
		"d1006":{"w":"放假"},
		"d1007":{"w":"放假"},
		"d1011":{"w":"上班"}
	};
var festival_main = {
	"2013_01_01":"元旦",
	"2013_02_10":"春节" ,
	"2013_04_04":"清明节" ,
	"2013_05_01":"劳动节" ,
	"2013_06_12":"端午节",
	"2013_09_19":"中秋节",
	"2013_10_01":"国庆节"
	};
	

//--common.js
/*======================一些公共的方法========================*/
$.dom = function(elementId) {
    return document.getElementById(elementId);
};

//设置stringBuffer
function StringBuffer() {
    this._strings = new Array();
};

StringBuffer.prototype.append = function(str) {
    this._strings.push(str);
    return this;
};

StringBuffer.prototype.toString = function() {
    var str = arguments.length == 0 ? '' : arguments[0];
    return this._strings.join(str);
};

String.prototype.leftpad = function(len, str) {
    if (!str) {
        str = '0';
    }

    var s = '';
    for (var i = 0; i < len - this.length; i++) {
        s += str;
    }
    return s + this;
};

String.prototype.htmlspecialchars = function(){
	//return this.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&acute;").replace(/&/g, "&amp;");
	return this;
}

function getMonthKey(year, month) { // 传入的month为0-11的数值
    return year.toString() + (month + 1).toString().leftpad(2) // 返回yyyyMM格式的字符串
}

function getDateKey(date) {
    return date.getFullYear().toString() +"-"+(date.getMonth() + 1).toString().leftpad(2)+"-"+date.getDate().toString().leftpad(2) // 返回yyyy-MM-dd格式的字符串
}
function is_leap_year(cur_year){
	 if(cur_year % 400 == 0 || (cur_year % 100 !=0 && cur_year % 4 == 0)) return 1;
	 return 0;
}

function getDaysByMonth(date){
	var days = [[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	            [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];
	return days[is_leap_year(date.getFullYear())][date.getMonth()];
}

function dateDiff(now, date){
	var diff = dateDiffDays(now, date);
	if(diff == 0) return "今天";
	else if(diff < 0) return (0-diff) + "天前";
	else return diff + "天后";
}

function dateDiffDays(now, date){
	var n = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	var diff = parseInt((d - n)/(24 * 60 * 60 * 1000));
	return diff;
}
  

/*==============cacheMgr,在cal365中用到===============*/
var cacheMgr = {
    cldCache : {}, // 注意！这里存的是calendarObj.js中定义的calendar对象，不是数据文件载入的cldObj
    getCld : function(year, month) {
        var key = getMonthKey(year, month);
        var cld = this.cldCache[key];
        if (typeof cld == 'undefined') {
            cld = new calendar(year, month);
            this.cldCache[key] = cld;
        }
        return cld;
    }
};

//======================makeCal.js start===================================
var HuangLi = {};
var calData = new Array();
var currentDate = new Date();
var rows;
var showingToday = true;	//显示的是今天
var taskHover_inblock = false;
var taskHover_inhover = false;
var madeRiliDate = new Date();
var record = {
	elem_id : "",
	nav_date : new Date()
};
var	timeSelf = 0; //本地时间
var timeBeijing; //北京时间
function clock(time){
	timeSelf = (new Date()).getTime();
	timeBeijing = time*1000;
}
var calander = {
	//initialization the calender
	init:function()
	{
		makeCal.pareData(new Date());
		makeCal.showCal(new Date());
		//init初始化的功能只需要初始化一次
		makeCal.initAction();
		makeCal.makeHuangli(currentDate);
	},
	//make the calender of `date`
	pareData:function(date)
	{
		date = makeCal.setTimeZero(date);
		madeRiliDate = new Date(date);
		//the first of this month
		var monthFirstD = makeCal.getMonthFirst(date);
		//the first in the table
	 	var tableFirstD = makeCal.getWeekFirst(monthFirstD);
		//the first of next month
		var nextMonthFirstD = makeCal.addTime(monthFirstD, 1, "month");
		//last day of this month
		var monthLastD = makeCal.addTime(nextMonthFirstD, -1, "day");
		//get the rows
		rows = 6;
		//loop to calculate the data
		var indexDay = new Date(tableFirstD);
		var nowDay = makeCal.setTimeZero(new Date());
		
		makeCal.fillCalData(indexDay, monthFirstD, monthLastD, nowDay);
	},
	
	fillCalData:function(indexDay, monthFirstD, monthLastD, nowDay){
		calData = [];
		for ( var i = 0; i < rows; i++)
		{
			var week = [];
			for ( var j = 0; j < 7; j++)
			{
				var aDay = makeCal.createDay();
				//set year month date
				aDay.year = indexDay.getFullYear();
				aDay.month = indexDay.getMonth();
				aDay.date = indexDay.getDate();
				//set mode
				if ( indexDay.getTime() < monthFirstD.getTime() )
				{
					aDay.before = true;
				}
				else if ( indexDay.getTime() > monthLastD.getTime() )
				{
					aDay.after = true;
				}
				if ( indexDay.getTime() == nowDay.getTime() )
				{
					aDay.today = true;
				}
				if ( j == 5 || j == 6 )
				{
					aDay.weekend = true;
				}
				aDay.rows = rows;
				aDay.inrow = i+1;
				aDay.value = indexDay;
				aDay.china = templates.lunar_Info(aDay.value);
				//临时调整节气
				var date_detail = aDay.value.getFullYear()+"-"+(aDay.value.getMonth()+1)+"-"+aDay.value.getDate();
				switch(date_detail){
					case '2011-11-22':
						aDay.china.l_day='廿七';
						aDay.china.color="";
						break;
					case '2011-11-23':
						aDay.china.l_day='小雪';
						aDay.china.color="#bc5016";
						break;
					case '2012-1-1'  :
						aDay.china.l_day='元旦';
						aDay.china.color="#bc5016";
						break;
					case '2012-1-20':
						aDay.china.l_day='廿七';
						aDay.china.color="";
						break;
					case '2012-1-21':
						aDay.china.l_day='大寒';
						aDay.china.color="#bc5016";
						break;
				}
				week.push(aDay);
				indexDay = makeCal.addTime(indexDay, 1, "day");
			}
			calData.push(week);
		}
	},
	
	prepareData4Festival:function(year, date ){
		date = makeCal.setTimeZero(date);
		madeRiliDate = new Date(date);
		
		var first = date, last = date;
		//取包含date的， 调休放假安排连续区的第一天
		while(true){
		 	var	work_T = worktime["y"+first.getFullYear()]
			var datestr = getMonthDateStr(first);
			if(work_T["d"+datestr]){
				first =  makeCal.addTime(first, -1, "day");
			}else{
				first =  makeCal.addTime(first, 1, "day");
				break;
			}
		}
		//取包含date的， 调休放假安排连续区的最后一天
		while(true){
		 	var	work_T = worktime["y"+last.getFullYear()]
			var datestr = getMonthDateStr(last);
			if(work_T["d"+datestr]){
				last =  makeCal.addTime(last, 1, "day");
			}else{
				last =  makeCal.addTime(last, -1, "day");
				break;
			}
		}
		
		
		
		//the first of this month
		var monthFirstD = first;
		
		//the first in the table
	 	var tableFirstD = makeCal.getWeekFirst(monthFirstD);
	 	
		//last day of this month
		var monthLastD = last;
		//get the rows
		rows = 6;
		//loop to calculate the data
		var indexDay = new Date(tableFirstD);
		
		var nowDay = makeCal.setTimeZero(new Date());
		
		makeCal.fillCalData(indexDay, monthFirstD, monthLastD, nowDay);
		
		//return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	},
	
	showCal:function(selectDate)
	{
		if ( typeof(selectDate) == "undefined" )
		{
			selectDate = date = makeCal.setTimeZero(new Date());
		}
		selectDate = makeCal.setTimeZero(selectDate);
		$('#year_time').text(selectDate.getFullYear()+"年"+(selectDate.getMonth()+1)+"月");
		var table = "<table id='caltable'> \
						<thead class='tablehead'> \
							<tr> \
								<td class='thead"+rows+"'>一</td> \
								<td class='thead"+rows+"'>二</td> \
								<td class='thead"+rows+"'>三</td> \
								<td class='thead"+rows+"'>四</td> \
								<td class='thead"+rows+"'>五</td> \
								<td class='thead"+rows+"' style='color:#bc5016;'>六</td> \
								<td class='thead"+rows+"' style='color:#bc5016;'>日</td> \
							</tr> \
						</thead> \
						<tbody>";
		var tdclass = "";
		for ( var i = 0; i < rows; i++)
		{
			var	aWeek = "<tr>";
			for ( var j = 0; j < 7; j++)
			{
				var tdclass = "";
				if ( calData[i][j].before == true )
				{
					tdclass = 'before';
				}
				else if ( calData[i][j].after == true )
				{
					tdclass = 'after';
				}
				var datestr = getMonthDateStr(calData[i][j].value);
				var workT="";
				try
				{
					//获取工作/放假
					var work_T = worktime["y"+calData[i][j].year];
					if(work_T)
					{
						workT = work_T["d"+datestr];
					}
				}
				catch(e)
				{
				}
				var workType = "";
				if ( workT )
				{
					if(workT.w=="上班")
					{
						tdclass = "workBlock";
						workType = "work";
					}
					else
					{
						tdclass = "restBlock";
						workType = "rest";
					}
				}
				if ( calData[i][j].today == true )
				{
					tdclass = 'today today'+calData[i][j].rows;
				}
				var numtype = "number";
				if ( calData[i][j].weekend == true )
				{
					numtype = "weekendNum";
				}
				if ( calData[i][j].before )
				{
					numtype = "before number";
				}
				else if ( calData[i][j].after )
				{
					numtype = "after number";
				}
				var isClickBlock = "";
				if ( calData[i][j].today == false && calData[i][j].value.getTime() == selectDate.getTime() )
				{
					isClickBlock = " clickBlock"+calData[i][j].rows;
				}
				var aDay = "<td i="+i+" j="+j+" class='block block"+calData[i][j].rows+" "+tdclass+isClickBlock+"'>";
				aDay += "<div class='block_content block_content"+calData[i][j].rows+"'>";
				if ( workType == "work" )
				{
					aDay += "<div class='workrest work'>班</div>";
				}
				else if ( workType == "rest" )
				{
					aDay += "<div class='workrest rest'>休</div>";
				}
				if ( calData[i][j].today == false )
				{
					aDay += "	<div class='"+numtype+" number"+calData[i][j].rows+"'>"+calData[i][j].date+"</div>\
								<div class='chinaday chinaday"+calData[i][j].rows+" festival' style='color: "+calData[i][j].china.color+"'>"+(calData[i][j].china.l_day).substring(0,4)+"</div>";
				}
				else
				{
					aDay += "	<div class='"+numtype+" number"+calData[i][j].rows+"'>"+calData[i][j].date+"</div>\
								<div class='chinaday chinaday"+calData[i][j].rows+" festival' style='color: white;'>"+calData[i][j].china.l_day+"</div>";
				}

				if ( calData[i][j].hasWork )
				{
                    aDay += "<img class='workDot workDot"+calData[i][j].rows+"' src='http://s.365rili.com/wannianlibaidu/BD_images/dot.png'/>"
				}

				aDay += "</div></td>";
				aWeek += aDay;
			}
			aWeek += "<tr>";
			table += aWeek;
		}
		table += "</tbody></table>";
		$('#mainCal').empty();
		$('#mainCal').append(table);
		
		makeCal.makeAction();
	},
	
	//init初始化的功能只需要初始化一次
	initAction:function()
	{
		$('#next_button').bind('click', function(e){
			var month = currentDate.getMonth();
			var year = currentDate.getFullYear();
			var real_show_month = madeRiliDate.getMonth();
			month = real_show_month;
			month++;
			if ( month > 11 )
			{
				month = 0;
				year++;
			}
			var currentMonth = real_show_month;
			currentDate = makeCal.addTime(currentDate, 1, "month");
			if ( currentDate.getMonth() != (currentMonth+1)%12 )
			{
				currentDate.setDate(1);
				currentDate.setMonth(currentMonth+1);
			}
			$('#year_time').text(year+"年"+(month+1)+"月");
			$('#festival_rest').text("");
			makeCal.nextMonth(currentDate);
		});
		$('#prev_button').bind('click', function(e){
			var month = currentDate.getMonth();
			var year = currentDate.getFullYear();
			var real_show_month = madeRiliDate.getMonth();
			month = real_show_month;
			month--;
			if ( month < 0 )
			{
				month = 11;
				year--;
			}
			var currentMonth = real_show_month;
			currentDate = makeCal.addTime(currentDate, -1, "month");
			if ( currentDate.getMonth() != (currentMonth+11)%12 )
			{
				currentDate.setDate(1);
				currentDate.setMonth((currentMonth+11)%12);
			}
			$('#year_time').text(year+"年"+(month+1)+"月");
			$('#festival_rest').text("");
			makeCal.prevMonth(currentDate);
		});
		$('#today_button').bind('click', function(e){
			makeCal.showToday();
			$('#festival_rest').text("");
			resize.start($('#middle').height());
		});
		$('#single_today_button').bind('click', function(e){
			makeCal.showToday();
			$('#festival_rest').text("");
			resize.start($('#middle').height());
		});
		$('#top_bar_time').text(makeCal.get365riliTime());
		$("#festival_back_button").bind("click", function(){
			showContainers("cal_container");
		});
		$("#festival").bind("click", function(){
			showContainers("festival_container");
			$('#jieri_button').click();
		});
		$('#jieri_button').bind("click", function(){
			$("#mainJieri").show();
			$("#mainNongli").hide();
			if ( $('#jieri_button').hasClass("active_tab_button") == false ) {
				$('#jieri_button').addClass("active_tab_button");
			}
			$('#nongli_button').removeClass("active_tab_button");
		});
		$('#nongli_button').bind("click", function(){
			$("#mainNongli").show();
			$("#mainJieri").hide();
			if ( $('#nongli_button').hasClass("active_tab_button") == false ) {
				$('#nongli_button').addClass("active_tab_button");
			}
			$('#jieri_button').removeClass("active_tab_button");
		});
		$("#singleArrowLeftTd").bind("click", function(){
			currentDate = makeCal.addTime(currentDate, -1, "day");
			makeCal.pareData(currentDate);
			makeCal.showCal(currentDate);
			makeCal.makeHuangli(currentDate);
			resize.start($('#middle').height());
		});
		$("#singleArrowRightTd").bind("click", function(){
			currentDate = makeCal.addTime(currentDate, 1, "day");
			makeCal.pareData(currentDate);
			makeCal.showCal(currentDate);
			makeCal.makeHuangli(currentDate);
			resize.start($('#middle').height());
		});
		$('#jieqiDiv').bind("click", function(e){
			name = $("#jieqiStr").text().substring(7);
			$("#jieqi_back_button").attr({"from":"single_container"});
			for ( var i = 0; i < 24; i++ ) {
				if ( name == jieqiData[i].name ) {
					var id = i;
					$("#jieqiName").text(jieqiData[id].name);
					$("#jieqiTime").text(jieqiData[id].time);
					$("#jieqiDescribe").html(jieqiData[id].des.replace(/(^|<br\/>)/g, '$1　　'));
					break;
				}
			}
			showContainers("jieqi_container");
		});
		$("#jieqi_back_button").bind("click", function(){
			var from = $("#jieqi_back_button").attr("from");
			showContainers(from);
		});
		$('.smallJieqiTd').bind("click", function(e){
			ele = $(e.target);
			id = ele.attr("id");
			$("#jieqi_back_button").attr({"from":"festival_container"});
			$("#jieqiName").text(jieqiData[id].name);
			$("#jieqiTime").text(jieqiData[id].time);
			$("#jieqiDescribe").html(jieqiData[id].des.replace(/(^|<br\/>)/g, '$1　　'));
			showContainers("jieqi_container");
		});
		$('.jieriTd').bind('click', function(e){
			ele = $(this);
			jieri = ele.attr("jieri");
			settoFestival(jieri);
			$('#festival_rest').text(fangjiaData[jieri]); 
			showContainers("cal_container");
		});
		setInterval(function(){
			var time = makeCal.get365riliTime();
			$('#top_bar_time').text(makeCal.get365riliTime());
			if ( time == '00:00:00' && showingToday )
			{
				var d = new Date();
				makeCal.pareData(d);
				makeCal.showCal(d);
				makeCal.makeHuangli(d);
				$('#year_num').text(d.getFullYear());
				$('#month_num').text(d.getMonth()+1);
			}
		}, 1000);
	},
	//make初始化的功能每次重绘table后就要初始化一次
	makeAction:function()
	{
		$('.block').bind('click', function(e){
			var real_show_month = madeRiliDate.getMonth();
			ele = $(this);
			makeCal.makeHuangli(calData[ele.attr('i')][ele.attr('j')].value);
			showContainers("single_container");
			$('#festival_rest').text("");
		});
		$("#single_back_button").bind('click', function(){
			showContainers("cal_container");
		});
	},
	//生成黄历div
	makeHuangli:function(date)
	{
		currentDate=date;
		date = makeCal.setTimeZero(date);
		var datestr = date.getDate();
		lunar = templates.lunar_Info_detail(date, showYJ);
		$('#singleNumTd').text(datestr);
		var gregorianDayStr = date.getFullYear()+"年"+(date.getMonth()+1)+"月 ";
		
		switch (date.getDay())
		{
			case 1:
				gregorianDayStr += '星期一';
				break;
			case 2:
				gregorianDayStr += '星期二';
				break;
			case 3:
				gregorianDayStr += '星期三';
				break;
			case 4:
				gregorianDayStr += '星期四';
				break;
			case 5:
				gregorianDayStr += '星期五';
				break;
			case 6:
				gregorianDayStr += '星期六';
				break;
			case 0:
				gregorianDayStr += '星期日';
				break;			
		}
		gregorianDayStr += " ";
		$('#singleDateStr').text(gregorianDayStr);
		var jieqi = templates.lunar_Info(date).solarTerm;
		$('#festivalStr').text(templates.lunar_Info(date).festival);
		if ( jieqi != "" ) {
			$("#jieqiDiv").show();
			$("#jieqiStr").text("24节气 - "+jieqi);
		} else {
			$("#jieqiDiv").hide();
		}
		$('#popDateStr').text(getFullDateStr(date));
		$('#popChineseStr').text((lunar.lunar).substring(2));
		var nowDate = makeCal.setTimeZero(new Date());
		var nowMiliSecond = nowDate.getTime();
		var targetMiliSecond = date.getTime();
		var passedTime = Math.ceil((targetMiliSecond - nowMiliSecond)/86400000);
		var dayafterorbeforeStr = "";
		if ( nowDate.getDate() == date.getDate() )
		{
			dayafterorbeforeStr = '今天';
		}
		if ( passedTime < 0 )
		{
			dayafterorbeforeStr = (0-passedTime)+"天前";
		}
		else if ( passedTime > 0 )
		{
			dayafterorbeforeStr = passedTime+"天后";
		}
		$('#dayafterorbefore').text(dayafterorbeforeStr);
		$('#chinaDay').text((lunar.lunar).substring(2));
		
		/*kun:过了春节就算龙年
		if(date.getFullYear()==2012 && (date.getMonth()==0 || (date.getMonth()==1 && date.getDate()<4))){
			lunar.y_Info=lunar.y_Info.replace("龙","兔");
		}
		*/
		//2012 1.23日春节前显示为兔年
		if(date.getFullYear()==2012 && (date.getMonth()==0 && date.getDate()<23)){
			lunar.y_Info=lunar.y_Info.replace("龙","兔");
		}
		//2013 1 1~2013 2 3显示为龙年，同时改天干地支
		if(date.getFullYear()==2013 && (date.getMonth()==0 ||(date.getMonth()==1 && date.getDate()<4))){
			lunar.y_Info=lunar.y_Info.replace("蛇","龙");
			lunar.y_Info=lunar.y_Info.replace("癸巳","壬辰");
		}
		info = lunar.y_Info;
		var yInfo = info.split(" ");
		$('#nongliStr1').text(yInfo[0]);
		$('#nongliStr2').text(yInfo[1]);
		
		/*
		 *由于黄历“宜”，“忌”数据加载有延迟，将其封装作为获取宜忌数据的回调方法 		 
		 */
		function showYJ(lunar){
			Y = lunar.huangliY;
			Ys = Y.split('.');
			$('#YStr').empty();
			for ( var key in Ys )
			{
				$('#YStr').append(Ys[key]+" ");
			}
			J = lunar.huangliJ;
			Js = J.split('.');
			$('#JStr').empty();
			for ( var key in Js )
			{
				$('#JStr').append(Js[key]+" ");
			}
		}
		//add by wuzhq
		//calendarHandler.setSelectedDate(date);
	},
	//get the first date in the week where `date` in
	getWeekFirst:function(date)
	{
		var day = date.getDay();
		if ( day == 0 )
		{
			day = 7;
		}
		return makeCal.addTime(date, 0-day+1, "day");
	},
	//get the first date in the month where `date` in
	getMonthFirst:function(date)
	{
		ndate = new Date(date);
		ndate.setDate(1);
		return ndate;
	},
	//add `inc` time which `mode` said on `date`
	addTime:function(date, inc, mode)
	{
		ndate = new Date(date);
		switch(mode)
		{
			case "day":
				ndate.setDate(date.getDate()+inc); 
				break;
			case "week": 
				ndate.setDate(date.getDate()+7*inc); 
				break;
			case "month": 
				ndate.setMonth(date.getMonth()+inc); 
				break;
			case "year": 
				ndate.setYear(date.getFullYear()+inc); 
				break;
			case "hour": 
				ndate.setHours(date.getHours()+inc); 
				break;
			case "minute": 
				ndate.setMinutes(date.getMinutes()+inc); 
				break;
			default:
				return ndate;
		}
		return ndate;
	},
	//set the time of date zero
	setTimeZero:function(date)
	{
		ndate = new Date(date);
		ndate.setHours(0);
		ndate.setMinutes(0);
		ndate.setSeconds(0);
		ndate.setMilliseconds(0);	
		return ndate;
	},
	//the day object
	createDay:function()
	{
		obj = new Object();
		obj.year = 0;
		obj.month = 0;
		obj.date = 0;
		obj.day = 0;
		obj.before = false;
		obj.after = false;
		obj.weekend = false;
		obj.china = null;
		obj.rows = 0;
		obj.inrow = 0;
		obj.today = false;
		obj.value = null;
		obj.hasWork = false;
		return obj;
	},
	//下一个月
	nextMonth:function(clickDate)
	{
		makeCal.pareData(clickDate);
		makeCal.showCal(clickDate);
		showingToday = false;
		makeCal.makeHuangli(clickDate);
		resize.start($('#middle').height());
	},
	//上一个月
	prevMonth:function(clickDate)
	{
		makeCal.pareData(clickDate);
		makeCal.showCal(clickDate);
		showingToday = false;
		makeCal.makeHuangli(clickDate);
		resize.start($('#middle').height());
	},
	//显示今天
	showToday:function()
	{
		currentDate = new Date();
		makeCal.pareData(currentDate);
		makeCal.showCal(new Date());
		$('#year_time').text(currentDate.getFullYear()+"年"+(currentDate.getMonth()+1)+"月");
		showingToday = true;
		$('#festival_rest').text("");
		makeCal.makeHuangli(currentDate);
	},
	bind_funcbutton:function(button, block, selecter)
	{
		$('#'+button).bind('click', 
			function(e)
			{
				$('#'+selecter).css({'top':$('#'+button).offset().top+30+'px'});
				$('#'+selecter).css({'left':$('#'+button).position().left-39+'px'});
				$('#'+selecter).css({'display':'block'});
				if ( button == 'year_func' )
				{
					var yearNum = $('#year_num').text();
					var offset = $('#yearitem'+yearNum).position().top;
					$('#'+selecter).scrollTop(offset);
				}
			}
		);
	},
	get365riliTime:function()
	{
		var time = (function(){
			if(timeBeijing != null){
				var now = new Date();
				var diff = now.getTime() - timeSelf;
				now.setTime(timeBeijing + diff);
				return now;
			}else{
				return new Date();
			}
		})();
		hour = time.getHours();
		minute = time.getMinutes();
		second = time.getSeconds();
		if ( hour < 10 )
		{
			hour = "0"+hour;
		}
		if ( minute < 10 )
		{
			minute = "0"+minute;
		}
		if ( second < 10 )
		{
			second = "0"+second;
		}
		return hour+":"+minute+":"+second;
	}
};
function StringBuffer(){
	this._strings = new Array();
};
StringBuffer.prototype.append = function(str){
	this._strings.push(str);
	return this;
};
StringBuffer.prototype.toString = function(){
	var str = arguments.length == 0 ? '' : arguments[0];
	return this._strings.join(str);
};
var templates = {
	month_day : function(date){
		var d = date || new Date();
		return d.getDate();
	},
	    lunar_Info : function(date){
        var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
        var day = date.getDate();
        var cld_day = cld[day - 1];
        var lunar_detail = {
            l_day : "",
            l_month : "",
            l_day_full:"",
            solarTerm:"",
            festival:""
        };
        lunar_detail.l_day = cDay(cld_day.lDay);
        lunar_detail.l_month = cld_day.lMonth;
        lunar_detail.color = "";
        var fest, s2;
        
        // 廿四节气
        lunar_detail.solarTerm = cld_day.solarTerms;
        if ( lunar_detail.solarTerm == 'undefined' )
        {
            lunar_detail.solarTerm = "";
        }
        //节气例外
        var key = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        if(typeof SolarTermException[key] != 'undefined'){
            lunar_detail.solarTerm = SolarTermException[key];
        }
        //各种节日
        fest = cld_day.lunarFestival;
        // 公历节日
        s2 = cld_day.solarFestival;
        if ( fest.length > 0 )
        {
            fest = fest+" "+s2;
        }
        else
        {
            fest = s2;
        }
        if(fest.length>0)
        {
            lunar_detail.festival = fest;
            lunar_detail.l_day = fest;
            lunar_detail.color = "#bc5016";
        }
        if ( lunar_detail.solarTerm.length > 0 ) {
			lunar_detail.l_day = lunar_detail.solarTerm;
		}
        return lunar_detail;
    },
	lunar_Info_detail : function(date, callback){
		var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
		var year = date.getFullYear();
		var day = date.getDate();
		var cld_day = cld[day - 1];
		var festival=[];
		var info = {
			lunar:"",
			y_Info:"",
			huangliY:"无",
			huangliJ:"无"
		};
		info.lunar = '农历' + (cld_day.isLeap ? '闰 ' : '')+templates.getChinaNum(cld_day.lMonth)+"月"+ cDay(cld_day.lDay);
		info.y_Info = cld_day.cYear + '年'+this.lunar_year(date) +" "+ cld_day.cMonth + '月' + cld_day.cDay + '日';
		try
		{
			if(year>=2008&&year<=2020) // 杨
			{
				if (eval("HuangLi.y" + year) == null)
				{
					var filename="http://up1.365rili.com/js/huangli/"+year+".js";
					$.getScript(filename,function(){
						var hl = eval('HuangLi.y'+ year+ '.d'+ (cld_day.sMonth < 10? ('0' + cld_day.sMonth): cld_day.sMonth)
							+ (cld_day.sDay < 10 ? ('0' + cld_day.sDay) : cld_day.sDay));

						info.huangliY = hl.y;
						info.huangliJ = hl.j;
						if(callback){
							callback(info);
						}
					}); 
				}
				else
				{
					var hl = eval('HuangLi.y'+ year+ '.d'+ (cld_day.sMonth < 10? ('0' + cld_day.sMonth): cld_day.sMonth)
							+ (cld_day.sDay < 10 ? ('0' + cld_day.sDay) : cld_day.sDay));
					info.huangliY = hl.y;
					info.huangliJ = hl.j;
					if(callback){
						callback(info);
					}
				}
			}
			else
			{
				if(callback){
						callback(info);
				}
			}
		} catch (e) {
		}
		return info;
	},
	lunar_year : function(date){

		var l_year = '【'+ Animals[(date.getFullYear() - 4) % 12] + '年】';
		return l_year;
	},
	getChinaNum :function(Num) {
		var monthEn;
		switch(Num){
			case 1 : monthEn = "一";break;
			case 2 : monthEn = "二";break;
			case 3 : monthEn = "三";break;
			case 4 : monthEn = "四";break;
			case 5 : monthEn = "五";break;
			case 6 : monthEn = "六";break;
			case 7 : monthEn = "七";break;
			case 8 : monthEn = "八";break;
			case 9 : monthEn = "九";break;
			case 10 : monthEn = "十";break;
			case 11 : monthEn = "十一";break;
			case 12 : monthEn = "腊";break;
		}
		return monthEn;
	},
	init_sel_festival : function(){
		var festival_m = festival_main;
		if(festival_main)
		{
			var str = new StringBuffer();
			str.append('<div id="festival_sel_body">');
			for(var i in festival_main){
					str.append('<div date="'+i).append('">').append(festival_main[i]+'</div>');
			}
			str.append('</div>');	
		}
		$("#festival_sel_div").html(str.toString());
		$("#festival_sel_body>div").each(function(){
			$(this).click(function(){
				var y = $(this).attr("date").split("_");
				
				record.nav_date.setFullYear(y[0]);
				record.nav_date.setMonth(Number(y[1])-1);
				generic_cal(record.nav_date,record.elem_id);
				$("#festival_sel_div").hide();
			});
			$(this).hover(function(){
				$(this).addClass("year_bg");
			},
			function(){
				$(this).removeClass("year_bg");
			});
		});
	},
	init_sel_year : function(){
		var str = new StringBuffer();
		str.append('<div id="sel_body">');
		for(var i=1900;i<2050;i++)
		{
			str.append('<div>').append(i).append('</div>');
		}
		str.append('</div>');
		// 设置日期选择的初始位置
		var scroll_top = record.nav_date.getFullYear()-1900;
		$("#open_sel_div").html(str.toString());
		$("#sel_body>div").each(function(){
			$(this).click(function(){
				var y = $(this).html();
				record.nav_date.setFullYear(y);
				generic_cal(record.nav_date,record.elem_id);
				$("#open_sel_div").hide();
			});
			$(this).hover(function(){
				$(this).addClass("year_bg");
			},
			function(){
				$(this).removeClass("year_bg");
			});
		});
	},
	mousedown_hide_ele : function(id){
		$(document).bind("mousedown."+id, function(r) {
			var p = r.target;
			var q = document.getElementById(id);
			while (true) 
			{
				if (p == q) 
				{
					return true
				} 
				else 
				{
					if (p == document) 
					{
						$(document).unbind("mousedown."+id);
						$("#"+id).hide();
							return false
					} 
					else 
					{
						p = $(p).parent()[0]
					}
				}
			}
		});
	}
};

function getMonthKey(year, month) 
{ // 传入的month为0-11的数值
	return year.toString() + (month + 1).toString().leftpad(2) // 返回yyyyMM格式的字符串
}
String.prototype.leftpad = function(len, str)
{
	if (!str) 
	{
		str = '0';
	}
	var s = '';
	for (var i = 0; i < len - this.length; i++) 
	{
		s += str;
	}
	return s + this;
};
window.makeCal = calander;
function getMonthDateStr(date)
{
	month = date.getMonth()+1;
	day = date.getDate();
	if ( month < 10 )
	{
		month = "0"+month;
	}
	if ( day < 10 )
	{
		day = "0" + day;
	}
	return month+""+day;
}
function getFullDateStr(date)
{
	month = date.getMonth()+1;
	day = date.getDate();
	year = date.getFullYear();
	return year+"-"+month+"-"+day;
}

//节气例外调整
var SolarTermException = {
	"2012-5-20":"小满",	"2012-5-21":"",
	"2012-12-6":"",		"2012-12-7":"大雪",
	"2013-2-3":"",		"2013-2-4":"立春",
	"2013-7-22":"大暑",	"2013-7-23":"",
	"2013-12-21":"",	"2013-12-22":"冬至",
	"2014-3-5":"",		"2014-3-6":"惊蛰",
	"2015-1-5":"",		"2015-1-6":"小寒",
	"2016-6-6":"",		"2016-6-7":"大雪",
	"2017-7-22":"大暑",	"2017-7-23":"",
	"2017-12-21":"",	"2017-12-22":"冬至",
	"2018-2-18":"",		"2018-2-19":"雨水",
	"2018-3-20":"",		"2018-3-21":"春分",
	"2019-2-4":"立春",	"2019-2-5":"",
	"2019-6-21":"夏至",	"2019-6-22":"",
	"2020-7-6":"小暑",	"2020-7-7":"",
	"2020-8-22":"处暑",	"2020-8-23":"",
	"2020-12-6":"",		"2020-12-7":"大雪"
}

function getYearWeek(date){  
    var date2=new Date(date.getFullYear(), 0, 1);  
    var day1=date.getDay();  
    if(day1==0) day1=7;  
    var day2=date2.getDay();  
    if(day2==0) day2=7;  
    d = Math.round((date.getTime() - date2.getTime()+(day2-day1)*(24*60*60*1000)) / 86400000);    
    return Math.ceil(d /7)+1;   
}

//======================makeCal.js end===================================

$(document).ready(function()
{
	
});

function onReady()
{
	//calendarHandler.init();
	makeCal.init();
	//make calendar show in middel of baidu canvas
	gotoFestival();
	//当参数t=t时，为“今天几号”查询，此时不显示登录、添加按钮也不进行登录
	resize.start($('#middle').height());
}

window.onload=onReady;

function gotoFestival(){
	//get festival parameter
	var search = window.location.search.substring(1); //alert(search);
	var pairs = search.split('bd_param='); //alert(pairs.length);
	var value = '';
	if ( pairs.length > 1 ) {
		value = pairs[1];
	}
	value = value.replace("festival%3D", "");
	switch(value){
		case 'jieqi' :
		showContainers("festival_container");
		$('#nongli_button').click();
		break;
		case 'fangjia' :
		showContainers("festival_container");
		$('#jieri_button').click();
		break;
		case 'lichun':
		case 'yushui':
		case 'jingzhe':
		case 'chunfen':
		case 'qingming':
		case 'guyu':
		case 'lixia':
		case 'xiaoman':
		case 'mangzhong':
		case 'xiazhi':
		case 'xiaoshu':
		case 'dashu':
		case 'liqiu':
		case 'chushu':
		case 'bailu':
		case 'qiufen':
		case 'hanlu':
		case 'shuangjiang':
		case 'lidong':
		case 'xiaoxue':
		case 'daxue':
		case 'dongzhi':
		case 'xiaohan':
		case 'dahan' :
		for ( var i = 0; i < 24; i++ ) {
			if ( value == jieqiData[i].ename ) {
				var id = i;
				$("#jieqiName").text(jieqiData[id].name);
				$("#jieqiTime").text(jieqiData[id].time);
				$("#jieqiDescribe").html(jieqiData[id].des.replace(/(^|<br\/>)/g, '$1　　'));
				break;
			}
		}
		showContainers("jieqi_container");
		break;
		case 'rili_2013':
		currentDate.setFullYear(2013);
		currentDate.setMonth(0);
		currentDate.setDate(1);
		makeCal.pareData(currentDate);
		makeCal.showCal(currentDate);
		$('#year_time').text(currentDate.getFullYear()+"年"+(currentDate.getMonth()+1)+"月");
		showingToday = true;
		makeCal.makeHuangli(currentDate);
		break;
		case 'rili_2014':
		currentDate.setFullYear(2014);
		currentDate.setMonth(0);
		currentDate.setDate(1);
		makeCal.pareData(currentDate);
		makeCal.showCal(currentDate);
		$('#year_time').text(currentDate.getFullYear()+"年"+(currentDate.getMonth()+1)+"月");
		showingToday = true;
		makeCal.makeHuangli(currentDate);
		break;
		case 'rili_2012':
		currentDate.setFullYear(2012);
		currentDate.setMonth(0);
		currentDate.setDate(1);
		makeCal.pareData(currentDate);
		makeCal.showCal(currentDate);
		$('#year_time').text(currentDate.getFullYear()+"年"+(currentDate.getMonth()+1)+"月");
		showingToday = true;
		makeCal.makeHuangli(currentDate);
		case 'yuandan' : 
		case 'chunjie' : 
		case 'qingmingjie' : 
		case 'laodong' : 
		case 'duanwu' : 
		case 'zhongqiu' : 
		case 'guoqing' : 
		$('#festival_rest').text(fangjiaData[value]); 
		settoFestival(value);
		break;
		default : 
		$('#festival_rest').text("");
		break;
	}
}

function settoFestival(name) {
	if(name=='qingming') name='qingmingjie';
	var data = festivalData[name].split('_');
	currentDate.setFullYear(parseInt(data[0], 10));
	currentDate.setMonth(parseInt(data[1], 10)-1, 1);
	currentDate.setDate(parseInt(data[2], 10));
	makeCal.prepareData4Festival((new Date()).getFullYear(), currentDate);
	makeCal.showCal(currentDate);
	makeCal.makeHuangli(currentDate);
}

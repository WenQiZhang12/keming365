export interface VideoCourse {
  title: string
  cover: string
  url: string
}

export interface Country {
  code: string
  name: string
  flag: string
  lang: string
}

export const countries: Country[] = [
  {
    "code": "vietnam",
    "name": "Vietnam",
    "flag": "https://www.keming365.com/images/zjch/\u8d8a\u5357.png",
    "lang": "zh"
  },
  {
    "code": "malaysia",
    "name": "Malaysia",
    "flag": "https://www.keming365.com/images/zjch/\u9a6c\u6765\u897f\u4e9a.png",
    "lang": "zh"
  },
  {
    "code": "indonesia",
    "name": "Indonesia",
    "flag": "https://www.keming365.com/images/zjch/\u5370\u5ea6\u5c3c\u897f\u4e9a.png",
    "lang": "zh"
  },
  {
    "code": "singapore",
    "name": "Singapore",
    "flag": "https://www.keming365.com/images/zjch/\u65b0\u52a0\u5761.png",
    "lang": "zh"
  },
  {
    "code": "mexico",
    "name": "Mexico",
    "flag": "https://www.keming365.com/images/zjch/\u58a8\u897f\u54e5.png",
    "lang": "zh"
  }
]

export const courseCategories: Record<string, string[]> = {
  "vietnam": [
    "机械设计基础A",
    "电机及电气控制技术B",
    "工业机器人应用系统集成",
    "机械设计基础课程设计",
    "电工电子技术",
    "PLC应用技术",
    "数控加工与编程C",
    "工业机器人现场编程",
    "机电设备维修技术实训",
    "机加工技能实训A",
    "电路分析基础B",
    "机械制图",
    "机械制图习题集",
    "电工技能实训A",
    "钳工技能实训A"
  ],
  "malaysia": [],
  "indonesia": [],
  "singapore": [],
  "mexico": []
}

export const courseData: Record<string, Record<string, VideoCourse[]>> = {
  "vietnam": {
    "机械设计基础A": [
      {
        "title": "图7-34 斜齿轮分度圆柱面展开图",
        "cover": "https://www.keming365.com/images/图8-28 斜齿轮的螺旋角和基圆柱上的螺旋角.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720199796438073344"
      },
      {
        "title": "图7-35 斜齿轮的当量齿轮",
        "cover": "https://www.keming365.com/images/图8-31 斜齿轮的当量齿轮.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720200102068617216"
      },
      {
        "title": "图8-2 直齿锥齿轮传动",
        "cover": "https://www.keming365.com/images/图8-33 锥齿轮传动.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720200437206089728"
      },
      {
        "title": "图8-7 蜗杆传动",
        "cover": "https://www.keming365.com/images/图8-37 蜗杆传动.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720200906297049088"
      },
      {
        "title": "图9-10 含两个太阳轮的简单行星轮系",
        "cover": "https://www.keming365.com/images/图9-2 周转轮系.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720201855556124672"
      },
      {
        "title": "图9-4 汽车变速器",
        "cover": "https://www.keming365.com/images/图9-13 汽车变速器传动机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720204506578550784"
      },
      {
        "title": "图10-2 自行车链传动",
        "cover": "https://www.keming365.com/images/图10-12 自行车后轴上的内啮合棘轮机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720209045180383232"
      },
      {
        "title": "图11-38 活口扳手使用方法",
        "cover": "https://www.keming365.com/images/gx/图2-71 常用扳手.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720678544048390144"
      },
      {
        "title": "图11-15 双头螺柱",
        "cover": "https://www.keming365.com/images/表5-2-2-双头螺柱.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722120799409930240"
      },
      {
        "title": "图11-16 螺钉",
        "cover": "https://www.keming365.com/images/表5-2-3-螺钉.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722121064288616448"
      },
      {
        "title": "图11-17 紧定螺钉",
        "cover": "https://www.keming365.com/images/表5-2-4-紧定螺钉.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722121326340341760"
      },
      {
        "title": "图11-3 内螺纹-螺母",
        "cover": "https://www.keming365.com/images/表5-2-6-六角螺母.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722121637238931456"
      },
      {
        "title": "图11-22 对顶螺母",
        "cover": "https://www.keming365.com/images/表5-3-1-对顶螺母.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722122065942937600"
      },
      {
        "title": "图11-18 螺母",
        "cover": "https://www.keming365.com/images/表5-3-3-自锁螺母.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722122438090948608"
      },
      {
        "title": "图11-24 开口销与六角开槽螺母",
        "cover": "https://www.keming365.com/images/表5-3-5-开口销与槽型螺母.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722122626893348864"
      },
      {
        "title": "图11-26 止动垫圈",
        "cover": "https://www.keming365.com/images/表5-3-6-止动垫圈.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722122863292710912"
      },
      {
        "title": "图11-27 串联钢丝",
        "cover": "https://www.keming365.com/images/表5-3-7-串联钢丝.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722122960340516864"
      },
      {
        "title": "图11-19 垫圈",
        "cover": "https://www.keming365.com/images/表5-3-8-圆螺母用止动垫圈.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722123186816155648"
      },
      {
        "title": "图11-28 冲点",
        "cover": "https://www.keming365.com/images/表5-3-9-焊接、冲点.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722123376432250880"
      },
      {
        "title": "图11-29 黏合剂",
        "cover": "https://www.keming365.com/images/表5-3-11-粘合.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722123678157897728"
      },
      {
        "title": "图11-20 测力矩扳手",
        "cover": "https://www.keming365.com/images/图5-9测力矩扳手.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722126326068150272"
      },
      {
        "title": "图11-21 预置式扭力扳手",
        "cover": "https://www.keming365.com/images/图5-10定力矩扳手.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722126522235748352"
      },
      {
        "title": "图12-33 键槽的加工",
        "cover": "https://www.keming365.com/images/图6-2轴上键槽加工.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722126862314110976"
      },
      {
        "title": "图12-36 半圆键联接",
        "cover": "https://www.keming365.com/images/图6-4半圆键连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722127277659258880"
      },
      {
        "title": "图12-37 楔键联接",
        "cover": "https://www.keming365.com/images/图6-5楔键连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722127464192540672"
      },
      {
        "title": "图12-38 切向键联接",
        "cover": "https://www.keming365.com/images/图6-6切向键连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722128853165670400"
      },
      {
        "title": "图12-41 花键联接",
        "cover": "https://www.keming365.com/images/图6-10花键.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722129049433931776"
      },
      {
        "title": "图12-42 矩形花键联接",
        "cover": "https://www.keming365.com/images/图6-11矩形花键连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722130509127221248"
      },
      {
        "title": "图12-43 渐开线花键联接",
        "cover": "https://www.keming365.com/images/图6-12渐开线花键连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722130598239404032"
      },
      {
        "title": "图11-33 销联接",
        "cover": "https://www.keming365.com/images/图6-18连接销.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722131111118897152"
      },
      {
        "title": "图10-9 V带轮的典型结构型式",
        "cover": "https://www.keming365.com/images/图7-13V带轮的结构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722132622423097344"
      },
      {
        "title": "图10-22 链传动",
        "cover": "https://www.keming365.com/images/图8-1链传动.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722132930549252096"
      },
      {
        "title": "图10-26 常见链轮的结构",
        "cover": "https://www.keming365.com/images/图8-6链轮的结构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722133179254702080"
      },
      {
        "title": "图7-38 齿轮轴",
        "cover": "https://www.keming365.com/images/图9-27圆柱齿轮轴.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722135929942179840"
      },
      {
        "title": "图8-18 锥齿轮轴",
        "cover": "https://www.keming365.com/images/图9-29圆锥齿轮轴.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722136014612594688"
      },
      {
        "title": "图7-39 实心式圆柱齿轮",
        "cover": "https://www.keming365.com/images/图9-30实心式齿轮.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722136253859889152"
      },
      {
        "title": "图7-40 腹板式圆柱齿轮",
        "cover": "https://www.keming365.com/images/图9-31腹板式齿轮.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722136365491290112"
      },
      {
        "title": "图8-19 实心式锥齿轮（δ＞1.6m，da≤200mm）",
        "cover": "https://www.keming365.com/images/图9-32实心式锥齿轮.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722136546760720384"
      },
      {
        "title": "图8-20 腹板式锥齿轮",
        "cover": "https://www.keming365.com/images/图9-33腹板式锥齿轮.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722136740269129728"
      },
      {
        "title": "图7-41 轮辐式圆柱齿轮",
        "cover": "https://www.keming365.com/images/图9-35轮辐式齿轮.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722137143949918208"
      },
      {
        "title": "图8-8 蜗杆传动的类型",
        "cover": "https://www.keming365.com/images/图10-1蜗杆传动的类型.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722137505398259712"
      },
      {
        "title": "图12-64 轴瓦（轴套）结构",
        "cover": "https://www.keming365.com/images/图11-9对开式薄壁轴瓦.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722139060549713920"
      },
      {
        "title": "图12-65 油沟的形式",
        "cover": "https://www.keming365.com/images/图11-14不完全液体润滑轴承常用油槽形式.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722139372450742272"
      },
      {
        "title": "图12-46 两端单向固定",
        "cover": "https://www.keming365.com/images/图12-9采用深沟球轴承的两端单向固定.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722139635521683456"
      },
      {
        "title": "图13-5 凸缘联轴器",
        "cover": "https://www.keming365.com/images/图13-3凸缘联轴器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722372589430767616"
      },
      {
        "title": "图13-3 单键联接套筒联轴器",
        "cover": "https://www.keming365.com/images/图13-4套筒联轴器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722372676684873728"
      },
      {
        "title": "图13-4 销联接套筒联轴器",
        "cover": "https://www.keming365.com/images/图13-4套筒联轴器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722372676684873728"
      },
      {
        "title": "图12-5 传动轴",
        "cover": "https://www.keming365.com/images/图13-8双万向联轴器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722374649618366464"
      },
      {
        "title": "图13-8 万向联轴器",
        "cover": "https://www.keming365.com/images/图13-8双万向联轴器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722374649618366464"
      },
      {
        "title": "图13-6 链条联轴器",
        "cover": "https://www.keming365.com/images/图13-10滚子链联轴器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722375128268144640"
      },
      {
        "title": "图13-10 弹性套柱销联轴器",
        "cover": "https://www.keming365.com/images/图13-11弹性套柱销联轴器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722375323580104704"
      },
      {
        "title": "图13-11 弹性柱销联轴器",
        "cover": "https://www.keming365.com/images/图13-12弹性柱销联轴器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722375503528329216"
      },
      {
        "title": "图13-9 梅花形弹性联轴器",
        "cover": "https://www.keming365.com/images/图13-13梅花形弹性联轴器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722375686576144384"
      },
      {
        "title": "图13-12 牙嵌式离合器",
        "cover": "https://www.keming365.com/images/图13-20牙嵌离合器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722376512635928576"
      },
      {
        "title": "图13-13 单片式摩擦离合器",
        "cover": "https://www.keming365.com/images/图13-22单盘式摩擦离合器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722376977650024448"
      },
      {
        "title": "图13-14 多盘式摩擦离合器",
        "cover": "https://www.keming365.com/images/图13-23多盘式摩擦离合器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722377109871263744"
      },
      {
        "title": "图12-55 轴系部件结构图",
        "cover": "https://www.keming365.com/images/2-12齿轮轴系结构图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722396707551182848"
      },
      {
        "title": "图12-32 普通平键的类型",
        "cover": "https://www.keming365.com/images/8-11单键的类型.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722464762419478528"
      },
      {
        "title": "图12-24 推力球轴承",
        "cover": "https://www.keming365.com/images/图13-43 滚动轴承的结构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722496086924591104"
      },
      {
        "title": "图11-10 螺栓联结",
        "cover": "https://www.keming365.com/images/1595059231678.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=734008316618866688"
      },
      {
        "title": "图11-11 双头螺柱联接",
        "cover": "https://www.keming365.com/images/1595059192294.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=734008531392397312"
      },
      {
        "title": "图10-16 调节摆动架调整",
        "cover": "https://www.keming365.com/images/1595384125317.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735153500975005696"
      },
      {
        "title": "图10-3 带传动",
        "cover": "https://www.keming365.com/images/1595384125317.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735153500975005696"
      },
      {
        "title": "图10-18 张紧轮张紧",
        "cover": "https://www.keming365.com/images/1595384125317.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735153500975005696"
      },
      {
        "title": "图10-15 调节螺钉调整",
        "cover": "https://www.keming365.com/images/1595384125317.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735153500975005696"
      },
      {
        "title": "图7-16 齿轮滚刀加工齿轮",
        "cover": "https://www.keming365.com/images/1595383541609.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735155117560430592"
      },
      {
        "title": "图7-17 根切现象与切齿干涉的参数关系",
        "cover": "https://www.keming365.com/images/1595383507787.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735155252361166848"
      },
      {
        "title": "图12-12 滚动轴承",
        "cover": "https://www.keming365.com/images/1595383060814.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735179239438942208"
      },
      {
        "title": "图12-53 轴承的装拆",
        "cover": "https://www.keming365.com/images/1595382905577.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735179669287993344"
      },
      {
        "title": "图13-7 十字滑块联轴器",
        "cover": "https://www.keming365.com/images/1595382796490.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735180050357288960"
      },
      {
        "title": "图7-32 斜齿圆柱齿轮",
        "cover": "https://www.keming365.com/images/1596697130918.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740895455541460992"
      },
      {
        "title": "图12-31 普通平键联接",
        "cover": "https://www.keming365.com/images/1596696817178.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740897184957857792"
      },
      {
        "title": "图12-6 转轴",
        "cover": "https://www.keming365.com/images/1596696789741.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740897412108779520"
      },
      {
        "title": "图11-4 螺纹联接",
        "cover": "https://www.keming365.com/images/1601274940811.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=759075578056802304"
      },
      {
        "title": "图12-34 导向型平键",
        "cover": "https://www.keming365.com/images/1601274892612.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=759076044819922944"
      },
      {
        "title": "图7-26 直齿圆柱齿轮传动受力分析",
        "cover": "https://www.keming365.com/images/1612339112300.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806201305411354624"
      },
      {
        "title": "图12-35 滑键",
        "cover": "https://www.keming365.com/images/1612339012186.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806202500972544000"
      },
      {
        "title": "图10-6 V带的结构",
        "cover": "https://www.keming365.com/images/1612338456625.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806460466812420096"
      },
      {
        "title": "图7-31 直齿圆柱齿轮",
        "cover": "https://www.keming365.com/images/1612338419793.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806460782907752448"
      },
      {
        "title": "图8-9 蜗杆传动的几何尺寸",
        "cover": "https://www.keming365.com/images/1612337070829.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806469635070230528"
      },
      {
        "title": "图12-61 对开式滑动轴承",
        "cover": "https://www.keming365.com/images/1612336851316.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806470669486260224"
      },
      {
        "title": "图12-73 毡圈密封",
        "cover": "https://www.keming365.com/images/1612336737173.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806471552219480064"
      },
      {
        "title": "图12-74 唇形密封圈密封",
        "cover": "https://www.keming365.com/images/1612336687323.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806472290387623936"
      },
      {
        "title": "图12-75 间隙密封",
        "cover": "https://www.keming365.com/images/1612336605499.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806474742549708800"
      },
      {
        "title": "图9-1 卧式车床的外形图",
        "cover": "https://www.keming365.com/images/图3.3.6卧式车床结构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806887259025440768"
      },
      {
        "title": "图11-12 螺钉联接",
        "cover": "https://www.keming365.com/images/1618970101048.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834102030422245376"
      },
      {
        "title": "图11-37 安全销",
        "cover": "https://www.keming365.com/images/1629877119905.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=880044551916486656"
      },
      {
        "title": "图9-3 两级圆柱齿轮减速器",
        "cover": "https://www.keming365.com/images/圆柱齿轮减速器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1008777332602699776"
      },
      {
        "title": "图12-57 轴的工作图",
        "cover": "https://www.keming365.com/images/cgzt/7-23.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764504630591488"
      },
      {
        "title": "图7-19 齿轮轴轮齿折断",
        "cover": "https://www.keming365.com/images/jxsjjc/图13-1 轮齿折断.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341707356500656128"
      },
      {
        "title": "图7-20 斜齿轮齿面点蚀",
        "cover": "https://www.keming365.com/images/jxsjjc/图13-2 齿面点蚀.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341707652551409664"
      },
      {
        "title": "图7-21 齿面胶合",
        "cover": "https://www.keming365.com/images/jxsjjc/图13-4 齿面胶合.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341707789050839040"
      },
      {
        "title": "图7-22 齿面磨损",
        "cover": "https://www.keming365.com/images/jxsjjc/图13-3 齿面磨损.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341707827307085824"
      },
      {
        "title": "图12-45 定位轴肩的结构尺寸",
        "cover": "https://www.keming365.com/images/jxsjjc/图14-2 轴肩与轴环.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341707994911473664"
      },
      {
        "title": "图7-23 齿面塑性变形机理示意图",
        "cover": "https://www.keming365.com/images/jxsjjc/图13-5 轮齿塑性变形.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341707997780377600"
      },
      {
        "title": "图12-15 滚动体的形状",
        "cover": "https://www.keming365.com/images/jxsjjc/图15-10 常见滚动体的类型.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341709183220711424"
      },
      {
        "title": "图12-49 轴承间隙的调整",
        "cover": "https://www.keming365.com/images/jxsjjc/图15-18 轴承间隙的调整.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341709316515692544"
      },
      {
        "title": "图12-60 整体式滑动轴承",
        "cover": "https://www.keming365.com/images/jxsjjc/图15-2 整体式滑动轴承.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341709398430449664"
      },
      {
        "title": "图12-13 滑动轴承",
        "cover": "https://www.keming365.com/images/jxsjjc/图15-2 整体式滑动轴承.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341709398430449664"
      },
      {
        "title": "图12-63 止推滑动轴承轴颈",
        "cover": "https://www.keming365.com/images/jxsjjc/图15-4 推力滑动轴承.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341709709836550144"
      },
      {
        "title": "图12-14 滚动轴承基本结构",
        "cover": "https://www.keming365.com/images/jxsjjc/图15-9 滚动轴承的构造.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341709978049708032"
      },
      {
        "title": "图10-23 滚子链的结构",
        "cover": "https://www.keming365.com/images/jxsjjc/图8-14 滚子链结构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341711414133260288"
      },
      {
        "title": "图7-15 齿条插刀加工齿轮",
        "cover": "https://www.keming365.com/images/jxsjjc/图9-11 齿条插刀切齿.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341711426846195712"
      },
      {
        "title": "图9-20 蜗杆减速器实物图",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图4-3蜗轮蜗杆减速器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493917113230819328"
      },
      {
        "title": "图9-19 锥齿轮-圆柱齿轮减速器实物图",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图4-2锥齿轮圆柱齿轮减速器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493917194281549824"
      },
      {
        "title": "图9-18 二级圆柱齿轮减速器实物图",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图4-1二级圆柱齿轮减速器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493917237512241152"
      },
      {
        "title": "图12-47 一端固定、一端游动",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图5-24一端固定一端游动方式.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493917465090981888"
      },
      {
        "title": "图11-23 弹簧垫圈",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-16标准型弹簧垫圈.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919145811509248"
      },
      {
        "title": "图11-25 圆螺母与止动垫圈",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-18圆螺母用止动垫圈.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919450280230912"
      },
      {
        "title": "图11-35 圆柱销",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-24圆锥销.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919606861987840"
      },
      {
        "title": "图11-2 外螺纹-螺栓",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-7六角头螺栓.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919759077474304"
      },
      {
        "title": "图11-14 螺栓",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-7六角头螺栓.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919759077474304"
      },
      {
        "title": "图11-34 圆柱销",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-23 圆柱销.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919779063332864"
      },
      {
        "title": "图12-25 深沟球轴承",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表13-1深沟球轴承.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493920277497643008"
      },
      {
        "title": "图12-26 角接触球轴承",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表13-2角接触球轴承.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493920317960093696"
      },
      {
        "title": "图12-23 圆锥滚子轴承（30204）实物图",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表13-3圆锥滚子轴承.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493920474898366464"
      },
      {
        "title": "图12-27 单列圆柱滚子轴承",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表13-4圆柱滚子轴承.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493920592926081024"
      },
      {
        "title": "图11-1 减速器实物图",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表2-3-1一级直齿圆柱齿轮减速器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493921413273223168"
      },
      {
        "title": "图12-54 单级直齿圆柱齿轮减速器",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表2-3-1一级直齿圆柱齿轮减速器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493921413273223168"
      },
      {
        "title": "图9-16 圆柱齿轮减速器结构",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表2-3-1一级直齿圆柱齿轮减速器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493921413273223168"
      },
      {
        "title": "图3-9 正应力",
        "cover": "https://www.keming365.com/images/syzy/正应力实验.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=679616008738045952"
      },
      {
        "title": "图3-11 拉伸试件",
        "cover": "https://www.keming365.com/images/金属材料拉伸.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=712306694192889856"
      },
      {
        "title": "图3-13 低碳钢压缩时的R-ε曲线",
        "cover": "https://www.keming365.com/images/金属材料拉伸.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=712306694192889856"
      },
      {
        "title": "图3-14 铸铁的R-ε曲线",
        "cover": "https://www.keming365.com/images/金属材料拉伸.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=712306694192889856"
      },
      {
        "title": "图3-12 低碳钢拉伸时的R-ε曲线",
        "cover": "https://www.keming365.com/images/金属材料拉伸.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=712306694192889856"
      },
      {
        "title": "图5-56 铰链四杆机构",
        "cover": "https://www.keming365.com/images/图6-1 铰链四杆机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=718871154441322496"
      },
      {
        "title": "图5-1 家用踏板式缝纫机",
        "cover": "https://www.keming365.com/images/图6-4 缝纫机踏板机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=718871475989250048"
      },
      {
        "title": "图5-5 缝纫机踏板机构",
        "cover": "https://www.keming365.com/images/图6-4 缝纫机踏板机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=718871475989250048"
      },
      {
        "title": "图5-10 机车车轮联动机构",
        "cover": "https://www.keming365.com/images/图6-7 机车车轮联动机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=718871863073177600"
      },
      {
        "title": "图5-41 机车车轮联动机构",
        "cover": "https://www.keming365.com/images/图6-7 机车车轮联动机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=718871863073177600"
      },
      {
        "title": "图5-4 牛头刨床横向自动进给机构",
        "cover": "https://www.keming365.com/images/图6-15 牛头刨床的主体机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=718872774642237440"
      },
      {
        "title": "图2-42 起重机受力分析",
        "cover": "https://www.keming365.com/images/图6-16 汽车起重机摆动式液压机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=718872871388053504"
      },
      {
        "title": "图6-18 简谐运动规律线图",
        "cover": "https://www.keming365.com/images/图7-8 简谐运动规律.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=718875378109644800"
      },
      {
        "title": "图6-19 “反转法”原理",
        "cover": "https://www.keming365.com/images/图7-11 凸轮廓线设计的反转法原理.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=718875613271687168"
      },
      {
        "title": "图7-5 齿轮各部分的名称",
        "cover": "https://www.keming365.com/images/图8-5 外齿轮各部分的名称和符号.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=718877095173816320"
      },
      {
        "title": "图7-8 内齿轮的结构和几何尺寸关系",
        "cover": "https://www.keming365.com/images/图8-8 内齿轮.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=718877381317623808"
      },
      {
        "title": "图7-4 渐开线齿轮啮合",
        "cover": "https://www.keming365.com/images/图8-15 齿轮重合度与齿轮啮合区段.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=718878095867641856"
      },
      {
        "title": "图6-23 牛头刨床工作台横向进给机构中的棘轮机构",
        "cover": "https://www.keming365.com/images/图10-6 可变向提转式棘轮机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720207382583443456"
      },
      {
        "title": "图6-27 改变曲柄长度调节棘轮转角",
        "cover": "https://www.keming365.com/images/图10-13 改变曲柄长度调节棘轮转角.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720209520445358080"
      },
      {
        "title": "图6-30 内槽轮机构",
        "cover": "https://www.keming365.com/images/图10-17 内槽轮机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720210864036118528"
      },
      {
        "title": "图6-29 外槽轮机构",
        "cover": "https://www.keming365.com/images/图10-20 外槽轮机构在电影放映机中的应用.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720211316513439744"
      },
      {
        "title": "图6-33 外啮合不完全齿轮机构",
        "cover": "https://www.keming365.com/images/图10-25 外啮合不完全齿轮机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720212399151382528"
      },
      {
        "title": "图6-44 千分尺的微调机构",
        "cover": "https://www.keming365.com/images/gx/图1-8 外径千分尺.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720655029022752768"
      },
      {
        "title": "图6-39 台式虎钳",
        "cover": "https://www.keming365.com/images/gx/图2-2 台虎钳.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720656089867091968"
      },
      {
        "title": "图3-21 键的受力分析",
        "cover": "https://www.keming365.com/images/图6-1普通平键连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722126780382576640"
      },
      {
        "title": "图2-9 柔性约束",
        "cover": "https://www.keming365.com/images/图7-1带传动运动示意图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722132519188692992"
      },
      {
        "title": "图2-11 中间铰链约束",
        "cover": "https://www.keming365.com/images/图8-1链传动.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722132930549252096"
      },
      {
        "title": "图3-30 套筒联轴器",
        "cover": "https://www.keming365.com/images/图13-4套筒联轴器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722372676684873728"
      },
      {
        "title": "图2-14 固定端约束实例图",
        "cover": "https://www.keming365.com/images/4-8 用成形车刀车削成形回转表面.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722818067519766528"
      },
      {
        "title": "图5-52 牛头刨床实物图",
        "cover": "https://www.keming365.com/images/6-71 牛头刨床.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722822815257985024"
      },
      {
        "title": "图7-2 牛头刨床",
        "cover": "https://www.keming365.com/images/6-71 牛头刨床.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722822815257985024"
      },
      {
        "title": "图2-62 起重机受力分析",
        "cover": "https://www.keming365.com/images/1593681602241.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=728265941011398656"
      },
      {
        "title": "图3-22 联接销的受力分析",
        "cover": "https://www.keming365.com/images/1595059113386.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=734008896686915584"
      },
      {
        "title": "图1-14 内燃机",
        "cover": "https://www.keming365.com/images/1595466263663.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735142330335494144"
      },
      {
        "title": "图3-18 铆钉",
        "cover": "https://www.keming365.com/images/1595466204247.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735142684569632768"
      },
      {
        "title": "图2-30 力偶与力偶矩",
        "cover": "https://www.keming365.com/images/1595466178472.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735142847006638080"
      },
      {
        "title": "图4-1 单摆式颚式破碎机及其机构运动简图",
        "cover": "https://www.keming365.com/images/1595466097064.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735143314201772032"
      },
      {
        "title": "图6-5 凸轮机构运动简图",
        "cover": "https://www.keming365.com/images/1595466033089.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735143587586506752"
      },
      {
        "title": "图5-9 平行双曲柄机构",
        "cover": "https://www.keming365.com/images/1595465715017.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735149070099677184"
      },
      {
        "title": "图5-22 偏置曲柄滑块机构",
        "cover": "https://www.keming365.com/images/1595465571904.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735149437910777856"
      },
      {
        "title": "图5-25 偏心轮机构",
        "cover": "https://www.keming365.com/images/1595465482974.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735149734167052288"
      },
      {
        "title": "图5-23 自动送料机构",
        "cover": "https://www.keming365.com/images/1595465444702.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735149874852397056"
      },
      {
        "title": "图5-44 手动冲床",
        "cover": "https://www.keming365.com/images/1595465371223.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735150151546437632"
      },
      {
        "title": "图5-32 曲柄摇杆机构急回特性",
        "cover": "https://www.keming365.com/images/1595385172095.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735150472393916416"
      },
      {
        "title": "图5-35 曲柄摇杆机构的压力角和传动角",
        "cover": "https://www.keming365.com/images/1595385128016.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735150579117981696"
      },
      {
        "title": "图5-14 双摇杆机构",
        "cover": "https://www.keming365.com/images/1595385128016.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735150579117981696"
      },
      {
        "title": "图5-3 曲柄摇杆机构",
        "cover": "https://www.keming365.com/images/1595385128016.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735150579117981696"
      },
      {
        "title": "图5-18 曲柄摇杆机构",
        "cover": "https://www.keming365.com/images/1595385128016.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735150579117981696"
      },
      {
        "title": "图5-7 双曲柄机构",
        "cover": "https://www.keming365.com/images/1595385128016.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735150579117981696"
      },
      {
        "title": "图5-55 摆动导杆机构运动简图",
        "cover": "https://www.keming365.com/images/1595385055032.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735150804037533696"
      },
      {
        "title": "图5-16 飞机起落架",
        "cover": "https://www.keming365.com/images/1595385002022.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735150907934638080"
      },
      {
        "title": "图5-42 铣床快动夹紧机构",
        "cover": "https://www.keming365.com/images/1595384976912.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735151006215569408"
      },
      {
        "title": "图6-22 外啮合棘",
        "cover": "https://www.keming365.com/images/1595384647859.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735151957647294464"
      },
      {
        "title": "图1-15 齿轮构件",
        "cover": "https://www.keming365.com/images/1595383942012.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735154030346502144"
      },
      {
        "title": "图7-12 盘形铣刀加工齿轮",
        "cover": "https://www.keming365.com/images/1595383831761.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735154521159761920"
      },
      {
        "title": "图4-13 局部自由度",
        "cover": "https://www.keming365.com/images/1596699265924.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740878813545627648"
      },
      {
        "title": "图5-20 双摇杆机构",
        "cover": "https://www.keming365.com/images/1596699099326.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740880697413074944"
      },
      {
        "title": "图6-15 凸轮机构的工作过程",
        "cover": "https://www.keming365.com/images/1596698769191.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740882588599582720"
      },
      {
        "title": "图6-20 对心直动尖端从动件盘形凸轮轮廓设计",
        "cover": "https://www.keming365.com/images/1596698682452.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740883097918111744"
      },
      {
        "title": "图6-21 对心直动滚子从动件盘形凸轮轮廓设计",
        "cover": "https://www.keming365.com/images/1596698630643.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740883250246844416"
      },
      {
        "title": "图6-28 内啮合棘轮机构",
        "cover": "https://www.keming365.com/images/1596698548591.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740888799508168704"
      },
      {
        "title": "图6-26 利用覆盖罩调节棘轮转角",
        "cover": "https://www.keming365.com/images/1596698324626.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740889718421454848"
      },
      {
        "title": "图6-31 双圆柱销外槽轮机构",
        "cover": "https://www.keming365.com/images/1596698157429.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740890529532739584"
      },
      {
        "title": "图6-32 转搭车床刀架转位机构",
        "cover": "https://www.keming365.com/images/1596698094948.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740890875214692352"
      },
      {
        "title": "图6-34 内啮合不完全齿轮机构",
        "cover": "https://www.keming365.com/images/1596697957015.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740891310054965248"
      },
      {
        "title": "图6-37 螺纹的主要参数",
        "cover": "https://www.keming365.com/images/1596697764305.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740892344408080384"
      },
      {
        "title": "图6-36 螺纹的旋向与线数",
        "cover": "https://www.keming365.com/images/1596697764305.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740892344408080384"
      },
      {
        "title": "图6-47 滚动螺旋机构",
        "cover": "https://www.keming365.com/images/1596697538825.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740893623301701632"
      },
      {
        "title": "图6-42 双螺旋机构",
        "cover": "https://www.keming365.com/images/1596697451084.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740893893586845696"
      },
      {
        "title": "图5-27 转动导杆机构",
        "cover": "https://www.keming365.com/images/1601274194371.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=759091653444108288"
      },
      {
        "title": "图6-6 用于内燃机配气的凸轮机构",
        "cover": "https://www.keming365.com/images/1601274113373.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=759092214704898048"
      },
      {
        "title": "图6-7 靠模车削加工机构",
        "cover": "https://www.keming365.com/images/1601274088326.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=759092418308997120"
      },
      {
        "title": "图6-16 等速运动规律线图",
        "cover": "https://www.keming365.com/images/1601274036272.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=759092767023431680"
      },
      {
        "title": "图6-17 等加速等减速运动规律线图",
        "cover": "https://www.keming365.com/images/1601274006533.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=759092938448830464"
      },
      {
        "title": "图7-1 齿轮传动",
        "cover": "https://www.keming365.com/images/1601273463752.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=759096744586772480"
      },
      {
        "title": "图7-3 齿轮传动的类型",
        "cover": "https://www.keming365.com/images/1601273463752.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=759096744586772480"
      },
      {
        "title": "图2-25 曲柄冲压机",
        "cover": "https://www.keming365.com/images/1612339259237.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806198188007489536"
      },
      {
        "title": "图2-47 斜齿轮轮齿受力分析",
        "cover": "https://www.keming365.com/images/1612339112300.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806201305411354624"
      },
      {
        "title": "图2-29 圆柱齿轮受力分析",
        "cover": "https://www.keming365.com/images/1612339112300.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806201305411354624"
      },
      {
        "title": "图5-2 平面四杆机构",
        "cover": "https://www.keming365.com/images/1612338713246.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806212391275593728"
      },
      {
        "title": "图6-9 机床自动进给机构",
        "cover": "https://www.keming365.com/images/1612338578678.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806455262616485888"
      },
      {
        "title": "图7-14 齿轮插刀加工齿轮",
        "cover": "https://www.keming365.com/images/1612338197832.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806463904245874688"
      },
      {
        "title": "图5-26 冲床",
        "cover": "https://www.keming365.com/images/图2.4.14冲压设备.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806822488376868864"
      },
      {
        "title": "图2-34 工件钻孔的受力分析",
        "cover": "https://www.keming365.com/images/图3.2.26麻花钻与钻孔.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806842267099725824"
      },
      {
        "title": "图2-37 丝锥功螺纹",
        "cover": "https://www.keming365.com/images/图3.2.30丝锥与铰杠.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806852496839409664"
      },
      {
        "title": "图6-35 螺旋线的形成",
        "cover": "https://www.keming365.com/images/1618970332525.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834099938995470336"
      },
      {
        "title": "图5-50 机械手",
        "cover": "https://www.keming365.com/images/库卡机器人.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=998953336382160896"
      },
      {
        "title": "图2-46 制动器",
        "cover": "https://www.keming365.com/images/mclh.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1022864797391126528"
      },
      {
        "title": "图3-19 键",
        "cover": "https://www.keming365.com/images/hfjh2/图8-30 键.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965889078558720"
      },
      {
        "title": "图6-2 电影放映机卷片机构",
        "cover": "https://www.keming365.com/images/jxsjjc/图11-10 电影放映机卷片机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341706246184501248"
      },
      {
        "title": "图6-24 可换向棘轮机构",
        "cover": "https://www.keming365.com/images/jxsjjc/图11-3 可变向棘轮机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341706441114779648"
      },
      {
        "title": "图4-14 大筛机构",
        "cover": "https://www.keming365.com/images/jxsjjc/图6-15 大筛机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341709956558094336"
      },
      {
        "title": "图4-3 平面低副",
        "cover": "https://www.keming365.com/images/jxsjjc/图6-2 平面低副.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341710125575962624"
      },
      {
        "title": "图5-12 车门启闭机构",
        "cover": "https://www.keming365.com/images/jxsjjc/图6-22 车门启闭机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341710284162596864"
      },
      {
        "title": "图5-15 港口起重机",
        "cover": "https://www.keming365.com/images/jxsjjc/图6-23 港口起重机机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341710481760452608"
      },
      {
        "title": "图5-21 滑块机构",
        "cover": "https://www.keming365.com/images/jxsjjc/图6-25 双滑块机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341710538031235072"
      },
      {
        "title": "图5-30 自卸汽车的翻斗机构",
        "cover": "https://www.keming365.com/images/jxsjjc/图6-27 自卸货车.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341710604443844608"
      },
      {
        "title": "图4-2 平面高副",
        "cover": "https://www.keming365.com/images/jxsjjc/图6-3 平面高副.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341710968488460288"
      },
      {
        "title": "图3-65 疲劳断口",
        "cover": "https://www.keming365.com/images/xtml/工程材料疲劳与断裂虚拟仿真教学系统-小图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1428070416001269760"
      },
      {
        "title": "图3-31 齿轮减速器",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表2-3-1一级直齿圆柱齿轮减速器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493921413273223168"
      }
    ],
    "电机及电气控制技术B": [
      {
        "title": "图6.23 CW6132型普通车床电器布置图（二）",
        "cover": "https://www.keming365.com/images/gx/图7-3 C6132卧式车床.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720679466124181504"
      },
      {
        "title": "图7.2 M7130型卧轴矩台平面磨床的结构示意",
        "cover": "https://www.keming365.com/images/7-20 卧轴矩台式平面磨床.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722824041592782848"
      },
      {
        "title": "图6.4 电动机两地控制电路原理",
        "cover": "https://www.keming365.com/images/1596504407492.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=739851827553501184"
      },
      {
        "title": "图3.11 能耗制动电路",
        "cover": "https://www.keming365.com/images/1596503775749.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=739854771338346496"
      },
      {
        "title": "图6.20 电动机单向运行能耗制动控制电路",
        "cover": "https://www.keming365.com/images/1596503775749.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=739854771338346496"
      },
      {
        "title": "图5.3 低压电器的触点结构形式",
        "cover": "https://www.keming365.com/images/1596505593790.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=739885723661893632"
      },
      {
        "title": "图5.1 低压电器的电磁机构形式",
        "cover": "https://www.keming365.com/images/1596505527717.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=739886063857696768"
      },
      {
        "title": "图5.20 电磁式继电器",
        "cover": "https://www.keming365.com/images/1596505527717.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=739886063857696768"
      },
      {
        "title": "图5.11 DZ型低压断路器结构原理及产品实物",
        "cover": "https://www.keming365.com/images/1596505440899.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=739886529320583168"
      },
      {
        "title": "图5.8 部分刀开关产品实物",
        "cover": "https://www.keming365.com/images/1598681356073.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=749266931227295744"
      },
      {
        "title": "图5.17 万能转换开关",
        "cover": "https://www.keming365.com/images/1598681239958.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=749267185163042816"
      },
      {
        "title": "图4.18 三相单三拍控制方式时步进电动机的工作原理",
        "cover": "https://www.keming365.com/images/1599186902693.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=751381543594754048"
      },
      {
        "title": "图4.19 三相三拍控制方式时步进电动机的工作原理",
        "cover": "https://www.keming365.com/images/1619773349895.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=837733137101357056"
      },
      {
        "title": "图7.5 摇臂钻床结构示意",
        "cover": "https://www.keming365.com/images/1624588575508.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=857206151056457728"
      },
      {
        "title": "图3.1 直流电动机的外形及基本结构",
        "cover": "https://www.keming365.com/images/1633914504814.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896059504142057472"
      },
      {
        "title": "图3.4 电枢铁芯及电枢铁芯冲片",
        "cover": "https://www.keming365.com/images/1633914538880.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896059593946300416"
      },
      {
        "title": "图3.5 换向器的结构",
        "cover": "https://www.keming365.com/images/1633914650266.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896059682525806592"
      },
      {
        "title": "图3.6 直流电动机的简化模型",
        "cover": "https://www.keming365.com/images/1633914711473.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896059897202868224"
      },
      {
        "title": "图3.3 直流电动机的电刷装置",
        "cover": "https://www.keming365.com/images/1633914739491.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896059981663567872"
      },
      {
        "title": "图6.9 QX4系列自动Y-▲降压启动的控制电路",
        "cover": "https://www.keming365.com/images/1633915005743.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896060299059134464"
      },
      {
        "title": "图2.31 Y-▲降压启动原理",
        "cover": "https://www.keming365.com/images/1633915005743.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896060299059134464"
      },
      {
        "title": "图2.32 自耦补偿降压启动原理",
        "cover": "https://www.keming365.com/images/1633915037439.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896060407154737152"
      },
      {
        "title": "图2.1 三相异步电动机结构示意",
        "cover": "https://www.keming365.com/images/1633915069319.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896060504626167808"
      },
      {
        "title": "图2.3 鼠笼型转子结构示意",
        "cover": "https://www.keming365.com/images/1633915098246.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896060630170075136"
      },
      {
        "title": "图4.14 机电式步进电动机的结构",
        "cover": "https://www.keming365.com/images/1633915442181.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896061337510084608"
      },
      {
        "title": "图5.18 主令控制器",
        "cover": "https://www.keming365.com/images/1633915551287.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896061635494412288"
      },
      {
        "title": "图5.28 JY1型速度继电器",
        "cover": "https://www.keming365.com/images/1633915645376.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896061906735857664"
      },
      {
        "title": "图2.16 三相异步电动机Y-▲降压启动原理",
        "cover": "https://www.keming365.com/images/1633915707950.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896062154388537344"
      },
      {
        "title": "图6.3 电动机正反转的典型基本控制电路",
        "cover": "https://www.keming365.com/images/1633916141706.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896062502104727552"
      },
      {
        "title": "图2.20 能耗制动原理",
        "cover": "https://www.keming365.com/images/1633916256264.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896065578471522304"
      },
      {
        "title": "图2.21 反接制动原理",
        "cover": "https://www.keming365.com/images/1633916294189.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896065688169349120"
      },
      {
        "title": "图6.26 三相异步电动机点动控制电路",
        "cover": "https://www.keming365.com/images/1633916326556.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896065781786214400"
      },
      {
        "title": "图5.19 CJ10-20型交流接触器",
        "cover": "https://www.keming365.com/images/1633916811157.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896066565424807936"
      },
      {
        "title": "图5.29 不同类型的熔断器",
        "cover": "https://www.keming365.com/images/1633917164467.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896066815782813696"
      },
      {
        "title": "图7.7 X62W型万能铣床的主要结构",
        "cover": "https://www.keming365.com/images/jxzzgyx/图6-11卧式万能铣床与第十二项精度有关的零件.jpg",
        "url": "http://www.keming365.com/user/showPPT?appliId=1384578829896384512"
      },
      {
        "title": "图5.23 JS7-A系列时间继电器产品外形及结构原理",
        "cover": "https://www.keming365.com/images/gjdg/10 时间继电器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1446083418281476096"
      },
      {
        "title": "图5.27 热继电器",
        "cover": "https://www.keming365.com/images/gjdg/11 热继电器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1446083495783825408"
      }
    ],
    "工业机器人应用系统集成": [
      {
        "title": "图4-21 电磁阀控制气缸运动示意图",
        "cover": "https://www.keming365.com/images/7.8利用先导式溢流阀和二位二通电磁阀的卸荷回路.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722103871190597632"
      },
      {
        "title": "3.3.4 编写模拟焊接程序",
        "cover": "https://www.keming365.com/images/工业机器人.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=773950333113073664"
      },
      {
        "title": "图8-6 单相交流电动机",
        "cover": "https://www.keming365.com/images/1633915069319.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896060504626167808"
      },
      {
        "title": "图1-3 工业机器人本体组成",
        "cover": "https://www.keming365.com/images/ABB机器人.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=998952683412914176"
      },
      {
        "title": "1.2.5 手动关节坐标系操作",
        "cover": "https://www.keming365.com/images/工业机器人拆装-小图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1427251281772150784"
      },
      {
        "title": "图8-3 步进电机及其驱动器（a）",
        "cover": "https://www.keming365.com/images/lwzydq/2.JPG",
        "url": "http://www.keming365.com/user/showPPT?appliId=1433402127866134528"
      },
      {
        "title": "图8-3 步进电机及其驱动器（b）",
        "cover": "https://www.keming365.com/images/lwzydq/3.4.JPG",
        "url": "http://www.keming365.com/user/showPPT?appliId=1433402343986036736"
      },
      {
        "title": "图1-2 工业机器人基本组成",
        "cover": "https://www.keming365.com/images/图12-11 工业机器人作业系统.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496907482985922560"
      },
      {
        "title": "3.1.7 手动模式调试拾取工具程序",
        "cover": "https://www.keming365.com/images/智能体实训平台.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496922425948897280"
      },
      {
        "title": "图1-13 工业机器人关节坐标系",
        "cover": "https://www.keming365.com/images/FANUC机器人机械拆装虚拟软件.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496923956156825600"
      }
    ],
    "机械设计基础课程设计": [
      {
        "title": "图13-20 蜗杆的结构",
        "cover": "https://www.keming365.com/images/jxsjjc/图13-20 蜗杆的结构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341707536134307840"
      },
      {
        "title": "表2-3-1 一级直齿圆柱齿轮减速器",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表2-3-1一级直齿圆柱齿轮减速器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493921413273223168"
      },
      {
        "title": "表2-3-2 二级圆柱齿轮减速器展开式",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表2-3-2二级圆柱齿轮减速器展开式.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493921447251279872"
      },
      {
        "title": "表2-3-7 蜗杆减速蜗杆下置式",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表2-3-7蜗杆减速蜗杆下置式.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493921937183735808"
      },
      {
        "title": "表2-3-8 蜗杆减速器蜗杆上置式",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表2-3-8蜗杆减速器蜗杆上置式.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493922165077049344"
      },
      {
        "title": "表6-1 简易式通气器",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表6-1简易式通气器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493921885388275712"
      },
      {
        "title": "表6-3 油尺",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表6-3油尺.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493921971136626688"
      },
      {
        "title": "表6-4 压配式圆形油标",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表6-4压配式圆形油标.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493922442215686144"
      },
      {
        "title": "表6-6 长形油标",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表6-6长形油标.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493922534679117824"
      },
      {
        "title": "表6-7 螺塞和封油垫片",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表6-7螺塞和封油垫片.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493922478307672064"
      },
      {
        "title": "表12-3 螺纹",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-3螺纹.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919887402205184"
      },
      {
        "title": "表12-7 六角头螺栓",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-7六角头螺栓.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919759077474304"
      },
      {
        "title": "表12-14 六角螺母",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-14六角螺母.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919113704112128"
      },
      {
        "title": "表12-15 圆螺母",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-15圆螺母.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919052454690816"
      },
      {
        "title": "表12-16 标准型弹簧垫圈",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-16标准型弹簧垫圈.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919145811509248"
      },
      {
        "title": "表12-17 垫圈",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-17垫圈.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919022612217862"
      },
      {
        "title": "表12-18 圆螺母用止动垫圈",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-18圆螺母用止动垫圈.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919450280230912"
      },
      {
        "title": "表12-19 轴端挡圈",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-19轴端挡圈.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919417707266048"
      },
      {
        "title": "表12-20 轴用弹性挡圈—A型",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-20轴用弹性挡圈—A型.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919448430542848"
      },
      {
        "title": "表13-1 深沟球轴承",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表13-1深沟球轴承.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493920277497643008"
      },
      {
        "title": "表13-2 角接触球轴承",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表13-2角接触球轴承.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493920317960093696"
      },
      {
        "title": "表13-3 圆锥滚子轴承",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表13-3圆锥滚子轴承.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493920474898366464"
      },
      {
        "title": "表13-4 圆柱滚子轴承",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表13-4圆柱滚子轴承.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493920592926081024"
      },
      {
        "title": "图4-1 二级圆柱齿轮减速器",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图4-1二级圆柱齿轮减速器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493917237512241152"
      },
      {
        "title": "图4-3 蜗轮蜗杆减速器",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图4-3蜗轮蜗杆减速器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493917113230819328"
      },
      {
        "title": "图5-6 轴的结构",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图5-6轴的结构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493918128290136064"
      },
      {
        "title": "图5-15 挡油板",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图5-15挡油板.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493917076329332736"
      },
      {
        "title": "图5-16 毡圈密封结构",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图5-16毡圈密封结构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493917272119443456"
      },
      {
        "title": "图5-17 橡胶圈密封结构",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图5-17橡胶圈密封结构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493917381167153152"
      },
      {
        "title": "图5-20 凸缘式轴承盖",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图5-20凸缘式轴承盖.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493917131492818944"
      },
      {
        "title": "图5-21 嵌入式轴承端盖",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图5-21嵌入式轴承端盖.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493917505700233216"
      },
      {
        "title": "图5-22 两端固定方式",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图5-22两端固定方式.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493917733098618880"
      },
      {
        "title": "图5-24 一端固定一端游动方式",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图5-24一端固定一端游动方式.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493917465090981888"
      },
      {
        "title": "图6-3 凸台结构",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图6-3凸台结构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493918205234642944"
      },
      {
        "title": "图6-4 凸台在箱体外侧",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图6-4凸台在箱体外侧.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493918183944355840"
      },
      {
        "title": "图6-20 吊环螺钉",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图6-20吊环螺钉.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493918175643828224"
      },
      {
        "title": "图8-4 轴的尺寸公差与形位公差",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/图8-4轴的尺寸公差与形位公差.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493918332791816192"
      },
      {
        "title": "圆柱齿轮轴",
        "cover": "https://www.keming365.com/images/图9-27圆柱齿轮轴.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722135929942179840"
      },
      {
        "title": "弹性套柱销联轴器",
        "cover": "https://www.keming365.com/images/图13-11弹性套柱销联轴器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722375323580104704"
      },
      {
        "title": "减速器拆装及结构认知",
        "cover": "https://www.keming365.com/images/减速器拆装.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=676468013007896576"
      }
    ],
    "电工电子技术": [
      {
        "title": "图1-21 单相半波整流电路及其波形",
        "cover": "https://www.keming365.com/images/1619773050723.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=837728422129041408"
      },
      {
        "title": "图1-26 单相半波整流电路示例",
        "cover": "https://www.keming365.com/images/1619773050723.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=837728422129041408"
      },
      {
        "title": "图1-22单相全波整流电路及其波形",
        "cover": "https://www.keming365.com/images/1620897802629.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=842091269873205248"
      },
      {
        "title": "图1-17 使用万用表确定二极管极性",
        "cover": "https://www.keming365.com/images/hzc/dz/图1-17 使用万用表确定二极管极性.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795014989086720"
      },
      {
        "title": "图1-14 发光二极管的外形及符号",
        "cover": "https://www.keming365.com/images/hzc/dz/图1-14 发光二极管的外形及符号.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795039068585984"
      },
      {
        "title": "图2-11 用万用表判断三极管的管型",
        "cover": "https://www.keming365.com/images/hzc/dz/图2-11 用万用表判断三极管的管型.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795040947634176"
      },
      {
        "title": "图4-18 RC正弦波振荡器",
        "cover": "https://www.keming365.com/images/hzc/dz/图4-18 RC正弦波振荡器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795065673056256"
      },
      {
        "title": "图2-1 常见三极管的外形",
        "cover": "https://www.keming365.com/images/hzc/dz/图2-1 常见三极管的外形.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795073050836992"
      },
      {
        "title": "图1-9 PN结的单向导电性",
        "cover": "https://www.keming365.com/images/hzc/dz/图1-9 PN结的单向导电性.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795088875945984"
      },
      {
        "title": "图1-8 PN结的形成",
        "cover": "https://www.keming365.com/images/hzc/dz/图1-8 PN结的形成.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795090356535296"
      },
      {
        "title": "图4-24 三角波发生器",
        "cover": "https://www.keming365.com/images/hzc/dz/图4-24 三角波发生器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795136242221056"
      },
      {
        "title": "图5-2 与逻辑运算",
        "cover": "https://www.keming365.com/images/hzc/dz/图5-2 与逻辑运算.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795160019730432"
      },
      {
        "title": "图4-25 锯齿波发生器",
        "cover": "https://www.keming365.com/images/hzc/dz/图4-25 锯齿波发生器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795187890880512"
      },
      {
        "title": "图5-3 或逻辑运算",
        "cover": "https://www.keming365.com/images/hzc/dz/图5-3 或逻辑运算.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795188473888768"
      },
      {
        "title": "图6-14 74LS138的引脚排列图和逻辑符号",
        "cover": "https://www.keming365.com/images/hzc/dz/图6-14 74LS138的引脚排列图和逻辑符号.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795195180580864"
      },
      {
        "title": "图5-4 非逻辑运算",
        "cover": "https://www.keming365.com/images/hzc/dz/图5-4 非逻辑运算.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795233982087168"
      },
      {
        "title": "图5-5与非门逻辑符号",
        "cover": "https://www.keming365.com/images/hzc/dz/图5-5 与非门逻辑符号.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795242089676800"
      },
      {
        "title": "图6-20 74LS151的引脚排列图和逻辑符号",
        "cover": "https://www.keming365.com/images/hzc/dz/图6-20 74LS151的引脚排列图和逻辑符号.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795405164216320"
      }
    ],
    "PLC应用技术": [
      {
        "title": "图1-8 S7-1200PLC的外形",
        "cover": "https://www.keming365.com/images/1598681205883.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=749267343103754240"
      },
      {
        "title": "图1-10 信号板的外形",
        "cover": "https://www.keming365.com/images/1598681164881.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=749267470778368000"
      },
      {
        "title": "图2-2 博途视图的布局",
        "cover": "https://www.keming365.com/images/hzc/图2-2博途视图的布局.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1499053356960710656"
      },
      {
        "title": "图2-13 添加设备",
        "cover": "https://www.keming365.com/images/hzc/图2-13添加新设备.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1499053493648883712"
      },
      {
        "title": "图2-12 创建新项目",
        "cover": "https://www.keming365.com/images/hzc/图2-12创建新项目.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1499053607998193664"
      },
      {
        "title": "图2-29 添加新设备",
        "cover": "https://www.keming365.com/images/hzc/图2-29添加新设备.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1499053731059073024"
      },
      {
        "title": "图2-3 项目视图",
        "cover": "https://www.keming365.com/images/hzc/图2-3项目视图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1499053753595068416"
      },
      {
        "title": "图2-24 下载界面",
        "cover": "https://www.keming365.com/images/hzc/图2-24下载界面.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1499053772784009216"
      },
      {
        "title": "图10-60 设置宏和通信报文",
        "cover": "https://www.keming365.com/images/hzc/图10-60设置宏和通信报文.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1499053849195839488"
      },
      {
        "title": "图2-4 项目树",
        "cover": "https://www.keming365.com/images/hzc/图2-4项目树.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1499054168206213120"
      },
      {
        "title": "图3-7 添加并设置变量",
        "cover": "https://www.keming365.com/images/hzc/图3-7添加并设置变量.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1499054213668274176"
      },
      {
        "title": "图4-10 添加全局数据块",
        "cover": "https://www.keming365.com/images/hzc/图4-10添加全局数据块.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1499054257989484544"
      },
      {
        "title": "图3-8 删除程序段1",
        "cover": "https://www.keming365.com/images/hzc/图3-8删除程序段1.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1499054346262806528"
      },
      {
        "title": "图6-2 小车自动运料示意图",
        "cover": "https://www.keming365.com/images/hzc/图6-2小车自动运料示意图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1499054500340563968"
      },
      {
        "title": "图5-17 三条运输带顺序相连",
        "cover": "https://www.keming365.com/images/hzc/图5-17三条运输带顺序相连.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1499055131948220416"
      }
    ],
    "数控加工与编程C": [
      {
        "title": "图1-5-2 切槽例题",
        "cover": "https://www.keming365.com/images/gx/图7-1 车削加工采用相应的刀具和工件.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720679354979319808"
      },
      {
        "title": "图1-4-1 任务四加工图纸",
        "cover": "https://www.keming365.com/images/gx/图7-46 靠模法车削成形面.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720681410762899456"
      },
      {
        "title": "图1-1-8 例题",
        "cover": "https://www.keming365.com/images/1596088519740.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=738330506629742592"
      },
      {
        "title": "图1-1-10 任务拓展",
        "cover": "https://www.keming365.com/images/1596088487389.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=738330678529097728"
      },
      {
        "title": "图1-3-2 G71运动轨迹",
        "cover": "https://www.keming365.com/images/1596088362761.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=738331284836712448"
      },
      {
        "title": "图1-2-10 任务拓展",
        "cover": "https://www.keming365.com/images/1596088306057.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=738331812903780352"
      },
      {
        "title": "图1-4-2 G73加工轨迹",
        "cover": "https://www.keming365.com/images/1596088306057.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=738331812903780352"
      },
      {
        "title": "图1-2-6 G90圆柱面循环",
        "cover": "https://www.keming365.com/images/1596088266141.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=738332010535190528"
      },
      {
        "title": "图1-2-7 G90圆锥面循环",
        "cover": "https://www.keming365.com/images/1596088234183.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=738332216030920704"
      },
      {
        "title": "图1-5-3 G76刀具轨迹",
        "cover": "https://www.keming365.com/images/1596088194616.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=738332498060115968"
      },
      {
        "title": "图2-1-7 刀具半径补偿应用",
        "cover": "https://www.keming365.com/images/1596075772796.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=738334547581599744"
      },
      {
        "title": "图1-2-1 任务二加工图纸",
        "cover": "https://www.keming365.com/images/1624586169885.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=856937326536818688"
      },
      {
        "title": "图1-5-4 G76使用实例",
        "cover": "https://www.keming365.com/images/1624592079782.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=857223312827219968"
      }
    ],
    "工业机器人现场编程": [
      {
        "title": "图2.20 工具坐标",
        "cover": "https://www.keming365.com/images/工业机器人.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=773950333113073664"
      },
      {
        "title": "图2.17 关节坐标系",
        "cover": "https://www.keming365.com/images/ABB机器人.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=998952683412914176"
      },
      {
        "title": "图4.59 变位机单元的硬件电路结构框图",
        "cover": "https://www.keming365.com/images/ABB机器人.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=998952683412914176"
      },
      {
        "title": "图1.17 串联机器人",
        "cover": "https://www.keming365.com/images/工业机器人拆装-小图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1427251281772150784"
      },
      {
        "title": "图4.60 变位机侧接线",
        "cover": "https://www.keming365.com/images/lwzydq/1.JPG",
        "url": "http://www.keming365.com/user/showPPT?appliId=1433401893509398528"
      },
      {
        "title": "图4.61 变位机专用电气接口",
        "cover": "https://www.keming365.com/images/lwzydq/1.JPG",
        "url": "http://www.keming365.com/user/showPPT?appliId=1433401893509398528"
      },
      {
        "title": "图1.29 工业机器人码垛、涂胶、打磨应用",
        "cover": "https://www.keming365.com/images/图12-11 工业机器人作业系统.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496907482985922560"
      },
      {
        "title": "图3.58 工业机器人码垛",
        "cover": "https://www.keming365.com/images/图12-11 工业机器人作业系统.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496907482985922560"
      },
      {
        "title": "图1.28 工业机器人焊接、搬运、喷涂、装配应用",
        "cover": "https://www.keming365.com/images/图12-11 工业机器人作业系统.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496907482985922560"
      },
      {
        "title": "图2.18 P1、P2 原点位置示意图",
        "cover": "https://www.keming365.com/images/智能体实训平台.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496922425948897280"
      },
      {
        "title": "图5.38 相机坐标系与工业机器人世界坐标系的关系",
        "cover": "https://www.keming365.com/images/智能体实训平台.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496922425948897280"
      }
    ],
    "机电设备维修技术实训": [
      {
        "title": "图4-3 方尺和直角尺",
        "cover": "https://www.keming365.com/images/gx/图1-14 角尺.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720655728355835904"
      },
      {
        "title": "图2-33 对顶螺母防松",
        "cover": "https://www.keming365.com/images/表5-3-1-对顶螺母.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722122065942937600"
      },
      {
        "title": "图2-35 自锁螺母防松",
        "cover": "https://www.keming365.com/images/表5-3-3-自锁螺母.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722122438090948608"
      },
      {
        "title": "图2-36 开口销与带槽螺母防松",
        "cover": "https://www.keming365.com/images/表5-3-5-开口销与槽型螺母.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722122626893348864"
      },
      {
        "title": "图2-37 止动垫圈防松",
        "cover": "https://www.keming365.com/images/表5-3-6-止动垫圈.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722122863292710912"
      },
      {
        "title": "图2-38 串联钢丝防松",
        "cover": "https://www.keming365.com/images/表5-3-7-串联钢丝.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722122960340516864"
      },
      {
        "title": "图2-28 螺纹联接的基本类型",
        "cover": "https://www.keming365.com/images/图5-2螺栓连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722125515271438336"
      },
      {
        "title": "图2-32 螺栓伸长量的测量",
        "cover": "https://www.keming365.com/images/图5-2螺栓连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722125515271438336"
      },
      {
        "title": "图2-58 带传动的类型",
        "cover": "https://www.keming365.com/images/图7-1带传动运动示意图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722132519188692992"
      },
      {
        "title": "图2-47 滑动轴承结构形式",
        "cover": "https://www.keming365.com/images/图11-3对开式径向滑动轴承.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722138128080437248"
      },
      {
        "title": "图2-29 紧定螺钉联接",
        "cover": "https://www.keming365.com/images/图13-17 螺纹紧固件联接的基本形式.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722493152950222848"
      },
      {
        "title": "图2-75 摩擦离合器",
        "cover": "https://www.keming365.com/images/5-9 摩擦离合器、制动器及其操纵机.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722818501621841920"
      },
      {
        "title": "图6-13 工作台纵向进给操纵机构简图",
        "cover": "https://www.keming365.com/images/5-12 溜板箱操作机构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722819458153840640"
      },
      {
        "title": "图6-1 XA6132万能升降台铣床的组成",
        "cover": "https://www.keming365.com/images/6-35 卧式升降台铣床.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722822030231076864"
      },
      {
        "title": "图2-60 带传动的张紧",
        "cover": "https://www.keming365.com/images/1595384125317.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735153500975005696"
      },
      {
        "title": "图2-12 用顶拔器拆卸带轮或联轴器",
        "cover": "https://www.keming365.com/images/1595382978744.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735179509656977408"
      },
      {
        "title": "图2-9 拔轮器拆卸轴承",
        "cover": "https://www.keming365.com/images/1595382905577.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=735179669287993344"
      },
      {
        "title": "图5-5 桥形触点开距与超程的检查方法",
        "cover": "https://www.keming365.com/images/1596505593790.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=739885723661893632"
      },
      {
        "title": "图2-61 渐开线圆柱齿轮接触斑痕",
        "cover": "https://www.keming365.com/images/1596697343584.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740894759442186240"
      },
      {
        "title": "图2-56 滚动轴承的间隙",
        "cover": "https://www.keming365.com/images/1596697098148.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740895613863854080"
      },
      {
        "title": "图2-76 牙嵌离合器",
        "cover": "https://www.keming365.com/images/1596696905324.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740896594777341952"
      },
      {
        "title": "图2-41 键联结形式",
        "cover": "https://www.keming365.com/images/1596696817178.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=740897184957857792"
      },
      {
        "title": "图2-46 键联结",
        "cover": "https://www.keming365.com/images/1618970040668.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834103003987312640"
      },
      {
        "title": "图5-4 CJ20系列交流接触器结构示意图",
        "cover": "https://www.keming365.com/images/1633916811157.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896066565424807936"
      },
      {
        "title": "图2-21 减速箱装配图",
        "cover": "https://www.keming365.com/images/圆柱齿轮减速器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1008777332602699776"
      },
      {
        "title": "图6-5 主变速操纵机构",
        "cover": "https://www.keming365.com/images/bscaozuo.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1022865046880911360"
      },
      {
        "title": "图2-55 推力轴承松圈与紧圈的装配位置",
        "cover": "https://www.keming365.com/images/角接触球轴承的安装.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1124751503131672576"
      },
      {
        "title": "图4-22 导轨的直线度误差",
        "cover": "https://www.keming365.com/images/1.直线度误差检测.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1193844908771770368"
      },
      {
        "title": "图4-28 用自准直仪测量水平面内的直线度误差",
        "cover": "https://www.keming365.com/images/1.直线度误差检测.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1193844908771770368"
      },
      {
        "title": "图4-35 同轴度误差的测量（一）",
        "cover": "https://www.keming365.com/images/8同轴度误差检测.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1193849722633191424"
      },
      {
        "title": "图4-18 主轴锥孔中心线径向圆跳动的检验方法",
        "cover": "https://www.keming365.com/images/9.径向圆跳动1.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1193851183085649920"
      },
      {
        "title": "图2-53 滚动轴承",
        "cover": "https://www.keming365.com/images/hfjh2/图8-33 滚动轴承的结构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965900046663680"
      },
      {
        "title": "图2-39 破坏螺纹副的不可拆防松",
        "cover": "https://www.keming365.com/images/jxsjjc/图12-19 常用破坏螺纹副的防松方法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341706825862479872"
      },
      {
        "title": "图2-57 用防松螺母调整轴向间隙",
        "cover": "https://www.keming365.com/images/jxsjjc/图15-18 轴承间隙的调整.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1341709316515692544"
      },
      {
        "title": "图2-34 弹簧垫圈防松",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-16标准型弹簧垫圈.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919145811509248"
      },
      {
        "title": "图2-42 销钉及其作用",
        "cover": "https://www.keming365.com/images/jxsjkcsjzds/表12-23 圆柱销.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1493919779063332864"
      }
    ],
    "机加工技能实训A": [
      {
        "title": "图3-10 气割操作现场要求",
        "cover": "https://www.keming365.com/images/gx/3气焊与气割.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=706146790570721280"
      },
      {
        "title": "图3-2 氧乙炔火焰种类",
        "cover": "https://www.keming365.com/images/gx/3气焊与气割.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=706146790570721280"
      },
      {
        "title": "图3-14平敷焊操作姿势",
        "cover": "https://www.keming365.com/images/gx/3气焊与气割.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=706146790570721280"
      },
      {
        "title": "图3-4 乙炔瓶",
        "cover": "https://www.keming365.com/images/gx/3气焊与气割.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=706146790570721280"
      },
      {
        "title": "图2-4 钳台",
        "cover": "https://www.keming365.com/images/gx/1基本知识.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=706170776910299136"
      },
      {
        "title": "图4-6 HR-150型洛氏硬度计结构图",
        "cover": "https://www.keming365.com/images/gx/4基本操作.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=706176565813182464"
      },
      {
        "title": "图4-4 HB-3000型布氏硬度计结构图",
        "cover": "https://www.keming365.com/images/gx/4基本操作.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=706176565813182464"
      },
      {
        "title": "图2-5 机用虎钳",
        "cover": "https://www.keming365.com/images/gx/图2-2 台虎钳.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720656089867091968"
      },
      {
        "title": "图2-68 攻螺纹方法",
        "cover": "https://www.keming365.com/images/gx/图2-57 攻螺纹.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720677707842584576"
      },
      {
        "title": "图2-66 起攻方法",
        "cover": "https://www.keming365.com/images/gx/图2-57 攻螺纹.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720677707842584576"
      },
      {
        "title": "图2-69 套螺纹",
        "cover": "https://www.keming365.com/images/gx/图2-61 套螺纹.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=720677929352167424"
      },
      {
        "title": "图1-2  卧式车床结构图",
        "cover": "https://www.keming365.com/images/5-2 CA6140车床的总体布局.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722818286944780288"
      },
      {
        "title": "图1-30 卧式铣床",
        "cover": "https://www.keming365.com/images/6-35 卧式升降台铣床.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722822030231076864"
      },
      {
        "title": "图1-69 丝锥和丝锥扳手",
        "cover": "https://www.keming365.com/images/图3.2.30丝锥与铰杠.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806852496839409664"
      },
      {
        "title": "图1-70 攻螺纹的方法",
        "cover": "https://www.keming365.com/images/图3.2.31攻螺纹.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806852636807528448"
      },
      {
        "title": "图2-31 板牙",
        "cover": "https://www.keming365.com/images/图3.2.32板牙与板牙架.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806879796393934848"
      },
      {
        "title": "图2-33 板牙架(铰杠)",
        "cover": "https://www.keming365.com/images/图3.2.32板牙与板牙架.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806879796393934848"
      },
      {
        "title": "图1-22 板牙",
        "cover": "https://www.keming365.com/images/图3.2.32板牙与板牙架.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=806879796393934848"
      },
      {
        "title": "图2-57 交叉锉法",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-60 内圆弧面锉削",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-19 台钻外形",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-35 划线平台",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-41 划规及其使用",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-46 锯条的安装方向",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-51 大锉刀的握法",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-58 推锉法",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-61 球面锉削",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-6 平面划线",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-20 立钻外形",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-36 角度规及其使用",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-42 样冲及其使用方法",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-47 手锯的握法",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-56 顺向锉法",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-59 外圆弧面的锉削方法",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-62 检查直角度",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-10 锯弓的构造",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-21 钻孔",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-38 90°角尺机器使用",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-45平面划线和立体划线",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图2-48 起锯方法",
        "cover": "https://www.keming365.com/images/1632791696500.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=892079493282267136"
      },
      {
        "title": "图1-13 两顶尖安装工件",
        "cover": "https://www.keming365.com/images/jxzzgyx/图2-19自定心卡盘和尾座顶尖装夹长轴的定位分析简图.jpg",
        "url": "http://www.keming365.com/user/showPPT?appliId=1384566795238637568"
      },
      {
        "title": "图3-3 氧气瓶",
        "cover": "https://www.keming365.com/images/gcxljc/图4-12气焊设备及其连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476093915791360"
      },
      {
        "title": "图3-5 氧气减压器",
        "cover": "https://www.keming365.com/images/gcxljc/图4-12气焊设备及其连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476093915791360"
      },
      {
        "title": "图3-9 气割姿势",
        "cover": "https://www.keming365.com/images/gcxljc/图4-11气焊示意图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476102707052544"
      },
      {
        "title": "图3-7 射吸式割炬",
        "cover": "https://www.keming365.com/images/gcxljc/图4-16割炬及气割过程.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476162358444033"
      },
      {
        "title": "图3-15 焊条的角度、运条方向",
        "cover": "https://www.keming365.com/images/gcxljc/图4-2焊条电弧焊的焊接过程.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476252674392064"
      },
      {
        "title": "图1-7 常见车削加工工艺",
        "cover": "https://www.keming365.com/images/gcxljc/图7-1各种表面.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476378222493696"
      },
      {
        "title": "图1-8 自定心卡盘",
        "cover": "https://www.keming365.com/images/gcxljc/图7-14自定心卡盘结构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476430227668992"
      },
      {
        "title": "图1-10 单动卡盘",
        "cover": "https://www.keming365.com/images/gcxljc/图7-15单动卡盘及适合装夹的零件.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476438201040896"
      },
      {
        "title": "图1-11 中心架",
        "cover": "https://www.keming365.com/images/gcxljc/图7-23中心架与跟刀架.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476445058727936"
      },
      {
        "title": "图1-17 外圆柱面车削的几种情况",
        "cover": "https://www.keming365.com/images/gcxljc/图7-28车外圆的形式.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476462809022464"
      },
      {
        "title": "图1-16 车削端面",
        "cover": "https://www.keming365.com/images/gcxljc/图7-30端面车刀的选择.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476489451241472"
      },
      {
        "title": "图1-23 两用游标卡尺",
        "cover": "https://www.keming365.com/images/gcxljc/图6-11游标卡尺.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476498896814080"
      },
      {
        "title": "图1-33 铣削加工工艺范围",
        "cover": "https://www.keming365.com/images/gcxljc/图8-1铣削加工范围.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476546762211328"
      },
      {
        "title": "图1-20 滚花花纹的种类",
        "cover": "https://www.keming365.com/images/gcxljc/图7-37滚花刀花纹种类.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476550671302656"
      },
      {
        "title": "图1-41 带孔铣刀安装",
        "cover": "https://www.keming365.com/images/gcxljc/图8-10面铣刀的安装.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476559617753088"
      },
      {
        "title": "图1-40 机动进给式回转工作台",
        "cover": "https://www.keming365.com/images/gcxljc/图8-12回转工作台.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476564155990017"
      },
      {
        "title": "图1-37 万能分度头结构图",
        "cover": "https://www.keming365.com/images/gcxljc/图8-14万能分度头结构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476586171891712"
      },
      {
        "title": "图1-54 顺铣",
        "cover": "https://www.keming365.com/images/gcxljc/图8-16顺铣和逆铣.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476595760070656"
      },
      {
        "title": "图1-53 逆铣",
        "cover": "https://www.keming365.com/images/gcxljc/图8-16顺铣和逆铣.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476595760070656"
      },
      {
        "title": "图1-55 端铣法",
        "cover": "https://www.keming365.com/images/gcxljc/图8-2铣削运动与铣削用量.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476613799772160"
      },
      {
        "title": "图1-52 周铣法",
        "cover": "https://www.keming365.com/images/gcxljc/图8-2铣削运动与铣削用量.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476613799772160"
      },
      {
        "title": "图1-31 立式铣床",
        "cover": "https://www.keming365.com/images/gcxljc/图8-4X5032立式铣床.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476745547055104"
      },
      {
        "title": "图1-32 X5032型立式升降台铣床结构",
        "cover": "https://www.keming365.com/images/gcxljc/图8-4X5032立式铣床.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476745547055104"
      },
      {
        "title": "图1-34 常见铣刀",
        "cover": "https://www.keming365.com/images/gcxljc/图8-6带柄铣刀.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476804716101632"
      },
      {
        "title": "",
        "cover": "https://www.keming365.com/images/gcxljc/图8-7带孔铣刀.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476807622754304"
      },
      {
        "title": "图2-40 划线及其使用",
        "cover": "https://www.keming365.com/images/gcxljc/图9-4划线盘及高度游标尺的应用.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476864057114624"
      },
      {
        "title": "图1-28 游标高度卡尺",
        "cover": "https://www.keming365.com/images/gcxljc/图9-4划线盘及高度游标尺的应用.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476864057114624"
      },
      {
        "title": "图2-39 高度尺",
        "cover": "https://www.keming365.com/images/gcxljc/图9-4划线盘及高度游标尺的应用.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476864057114624"
      },
      {
        "title": "图2-13 锉刀各部分名称",
        "cover": "https://www.keming365.com/images/gcxljc/图9-8锉刀各部分名称.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476918209773568"
      },
      {
        "title": "图2-7 立体划线",
        "cover": "https://www.keming365.com/images/gcxljc/图9-6轴承座的划线.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476942020837376"
      },
      {
        "title": "图2-26 丝锥",
        "cover": "https://www.keming365.com/images/gcxljc/图9-16丝锥构造.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476961557905408"
      },
      {
        "title": "图2-27 成套螺纹锥的切削用量分布",
        "cover": "https://www.keming365.com/images/gcxljc/图9-16丝锥构造.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458476961557905408"
      },
      {
        "title": "图1-67 麻花钻结构图",
        "cover": "https://www.keming365.com/images/gcxljc/图9-21麻花钻的构造.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458477002087464960"
      },
      {
        "title": "图2-54 锉削动作姿势",
        "cover": "https://www.keming365.com/images/gcxljc/图9-12锉削时的步法与姿势.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1458477035688034304"
      }
    ],
    "电路分析基础B": [
      {
        "title": "图4-13 三相异步电动机铁心",
        "cover": "https://www.keming365.com/images/1595295675496.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=734804486849036288"
      },
      {
        "title": "图5-22 常见电磁铁的结构",
        "cover": "https://www.keming365.com/images/1596505527717.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=739886063857696768"
      },
      {
        "title": "图4-4 三相电路",
        "cover": "https://www.keming365.com/images/1633914774546.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896060089276825600"
      },
      {
        "title": "图4-10 三相异步电动机的构造",
        "cover": "https://www.keming365.com/images/1633915069319.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896060504626167808"
      },
      {
        "title": "图4-12 三相异步电动机转子",
        "cover": "https://www.keming365.com/images/1633915098246.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896060630170075136"
      },
      {
        "title": "图4-14 旋转磁场",
        "cover": "https://www.keming365.com/images/1633915175979.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896060832666877952"
      },
      {
        "title": "图4-15 三相异步电动机转动原理",
        "cover": "https://www.keming365.com/images/1633915242111.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896061011272925184"
      },
      {
        "title": "图5-15 交流接触器的磁路",
        "cover": "https://www.keming365.com/images/1633916811157.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=896066565424807936"
      },
      {
        "title": "图3-6 低压断路器",
        "cover": "https://www.keming365.com/images/gjdg/04 低压断路器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1446083506219253760"
      },
      {
        "title": "图1-14 自动断路器",
        "cover": "https://www.keming365.com/images/gjdg/04 低压断路器.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1446083506219253760"
      },
      {
        "title": "图1-2 数字式万用表",
        "cover": "https://www.keming365.com/images/hzc/dz/图1-17 使用万用表确定二极管极性.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1496795014989086720"
      }
    ],
    "机械制图": [
      {
        "title": "图2-5-8直线的投影",
        "cover": "https://www.keming365.com/images/表4-2.6 垂直线的投影特点.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722475251648167936"
      },
      {
        "title": "图2-6-1补画平面的第三面投影",
        "cover": "https://www.keming365.com/images/表5-1.6 投影面垂直面的投影特性.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722475453977198592"
      },
      {
        "title": "图1-6-4等分作图",
        "cover": "https://www.keming365.com/images/图2-19 正六边形的作法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722476766337171456"
      },
      {
        "title": "图3-8-13-8 补画相贯线的投影",
        "cover": "https://www.keming365.com/images/图10-7 两圆柱正交相贯线的近似画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722487946355146752"
      },
      {
        "title": "图2-8-3棱柱、棱锥、棱台及其表面上点的投影",
        "cover": "https://www.keming365.com/images/1595208501626.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=733993719748886528"
      },
      {
        "title": "图1-6-1等分作图",
        "cover": "https://www.keming365.com/images/1618984480444.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834066789213143040"
      },
      {
        "title": "图1-6-6等分作图",
        "cover": "https://www.keming365.com/images/1618984451227.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834066924412338176"
      },
      {
        "title": "图2-9-4圆柱、圆锥、圆台、圆球及其表面上的投影",
        "cover": "https://www.keming365.com/images/1618975397252.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834081891693887488"
      },
      {
        "title": "图2-9-3圆柱、圆锥、圆台、圆球及其表面上的投影",
        "cover": "https://www.keming365.com/images/1618975397252.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834081891693887488"
      },
      {
        "title": "图2-9-8圆柱、圆锥、圆台、圆球及其表面上的投影",
        "cover": "https://www.keming365.com/images/1618975349637.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834085506764505088"
      },
      {
        "title": "图3-8-23-8 补画相贯线的投影",
        "cover": "https://www.keming365.com/images/1618974569063.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834092351684083712"
      },
      {
        "title": "图1-9-1斜度、锥度和椭圆的画法",
        "cover": "https://www.keming365.com/images/cgzt/1-6 按小图所示斜度，完成大图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253759383439933440"
      },
      {
        "title": "图1-9-4斜度、锥度和椭圆的画法",
        "cover": "https://www.keming365.com/images/cgzt/1-7 按小图所示锥度，完成大图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253759384551424000"
      },
      {
        "title": "图2-4-6根据轴测图画出三视图；求点的投影",
        "cover": "https://www.keming365.com/images/cgzt/2-2 求点B、C、D的三面投影，使B在A正下方5，C在A正前方6，D在A正左方9，并判断可见性.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253759876350345216"
      },
      {
        "title": "图2-5-3直线的投影",
        "cover": "https://www.keming365.com/images/cgzt/2-4 己知线段AB的两面投影，求作第三面投影，并注写线段与投影面的相对位置.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253761330322604032"
      },
      {
        "title": "图3-8-33-8 补画相贯线的投影",
        "cover": "https://www.keming365.com/images/cgzt/3-20 根据所给视图,补全所缺图线.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253761826244526080"
      },
      {
        "title": "图3-8-43-8 补画相贯线的投影",
        "cover": "https://www.keming365.com/images/cgzt/3-23  根据所给视图,补全三视图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253762269473406976"
      },
      {
        "title": "图3-8-73-8 补画相贯线的投影",
        "cover": "https://www.keming365.com/images/cgzt/3-26  根据所给视图,补全三视图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253762309952634880"
      },
      {
        "title": "图3-1-5补全视图中所缺的图线(一)",
        "cover": "https://www.keming365.com/images/cgzt/4-17 根据所给视图,补全所缺图线.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253763285312864256"
      },
      {
        "title": "图3-1-3补全视图中所缺的图线(一)",
        "cover": "https://www.keming365.com/images/cgzt/4-19 根据所给视图,补全所缺图线.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253763324055650304"
      },
      {
        "title": "图3-1-4补全视图中所缺的图线(一)",
        "cover": "https://www.keming365.com/images/cgzt/4-20 根据所给视图,补全所缺图线.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253763331974496256"
      },
      {
        "title": "图3-1-8补全视图中所缺的图线(一)",
        "cover": "https://www.keming365.com/images/cgzt/4-22 根据所给视图,补全所缺图线.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253763700523794432"
      },
      {
        "title": "图1-5-1尺寸注法练习",
        "cover": "https://www.keming365.com/images/cgzt/4-27 根据所给视图进行尺寸标注,尺寸数值直接从图中量取并取整.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253763815166705664"
      },
      {
        "title": "图3-4-1补画主视图中所缺的图线",
        "cover": "https://www.keming365.com/images/cgzt/4-31 补画视图中所缺的图线.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253763902127210496"
      },
      {
        "title": "图3-9-1按1：1的比例画出三视图(不注尺寸)；补全漏注的尺寸；修改标注不妥的尺寸",
        "cover": "https://www.keming365.com/images/cgzt/4-34 根据所给轴测图,画出三视图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253763912810102784"
      },
      {
        "title": "图3-4-2补画主视图中所缺的图线",
        "cover": "https://www.keming365.com/images/cgzt/4-32 补画视图中所缺的图线.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253763987766509568"
      },
      {
        "title": "图5-3-1将右侧的主视图改画成全剖视图",
        "cover": "https://www.keming365.com/images/cgzt/5-11 补画轮廓线和剖面线.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764028950380544"
      },
      {
        "title": "图5-3-2将右侧的主视图改画成全剖视图",
        "cover": "https://www.keming365.com/images/cgzt/5-22 主视图改画合适的剖视图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764052161658880"
      },
      {
        "title": "图5-3-3将右侧的主视图改画成全剖视图",
        "cover": "https://www.keming365.com/images/cgzt/5-23 主视图改画合适的剖视图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764075888836608"
      },
      {
        "title": "图5-9-1在指定位置将主视图改画成剖视图",
        "cover": "https://www.keming365.com/images/cgzt/5-30 俯视图改画全剖视图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764104041005056"
      },
      {
        "title": "图5-10-4移出断面图画法练习",
        "cover": "https://www.keming365.com/images/cgzt/5-42 绘制移出断面图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764186672988160"
      },
      {
        "title": "图6-5-2单个直齿轮及直齿轮啮齿画法",
        "cover": "https://www.keming365.com/images/cgzt/6-10 啮合齿轮的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764220906897408"
      },
      {
        "title": "图6-1-1找出下列螺纹画法中的错误，用铅笔圈出",
        "cover": "https://www.keming365.com/images/cgzt/6-1 绘制正确的外螺纹并标注.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764223939379200"
      },
      {
        "title": "图6-6-1键、销和圆柱螺旋压缩弹簧的画法",
        "cover": "https://www.keming365.com/images/cgzt/6-11 键连接的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764254582964224"
      },
      {
        "title": "图6-6-2键、销和圆柱螺旋压缩弹簧的画法",
        "cover": "https://www.keming365.com/images/cgzt/6-12 圆柱销连接的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764255593791488"
      },
      {
        "title": "图6-6-3键、销和圆柱螺旋压缩弹簧的画法",
        "cover": "https://www.keming365.com/images/cgzt/6-15 弹簧的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764261025415168"
      },
      {
        "title": "图6-2-1螺纹画法练习:标注螺纹",
        "cover": "https://www.keming365.com/images/cgzt/6-5 螺纹的标注.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764293615157248"
      },
      {
        "title": "图6-1-5找出下列螺纹画法中的错误，用铅笔圈出",
        "cover": "https://www.keming365.com/images/cgzt/6-4 绘制正确的内螺纹并标注.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764316872572928"
      },
      {
        "title": "图6-5-1单个直齿轮及直齿轮啮齿画法",
        "cover": "https://www.keming365.com/images/cgzt/6-9 齿轮的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764339546980352"
      },
      {
        "title": "图6-4-4查附录确定标准件尺寸，写出其标记；找出螺栓联接的错误；完成螺栓联接的全剖视图",
        "cover": "https://www.keming365.com/images/cgzt/6-7 绘制正确的螺栓连接图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764339605700608"
      },
      {
        "title": "图7-6-1读轴零件图，回答问题",
        "cover": "https://www.keming365.com/images/cgzt/7-24.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764495877079040"
      },
      {
        "title": "图8-3-1阅读钻模装配图",
        "cover": "https://www.keming365.com/images/cgzt/8-4.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764745522053120"
      },
      {
        "title": "图3-1-7补全视图中所缺的图线(一)",
        "cover": "https://www.keming365.com/images/cgzt/4-21 根据所给视图,补全所缺图线.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253765513142599680"
      },
      {
        "title": "图3-1-6补全视图中所缺的图线(一)",
        "cover": "https://www.keming365.com/images/cgzt/4-18 根据所给视图,补全所缺图线.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253765530985168896"
      },
      {
        "title": "图5-1-1 基本视图和向视图表达方法练习",
        "cover": "https://www.keming365.com/images/cgzt/5-1 补画其余视图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253765588656848896"
      },
      {
        "title": "图6-7-1滚动轴承画法",
        "cover": "https://www.keming365.com/images/cgzt/6-14 滚动轴承的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253765657938362368"
      },
      {
        "title": "图5-8-2根据左侧的主、俯两视图，在适合的部位作出局部剖视图",
        "cover": "https://www.keming365.com/images/cgzt/5-39 绘制局部剖视图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253765716998356992"
      },
      {
        "title": "图5-2-1局部视图和斜视图表达方法练习",
        "cover": "https://www.keming365.com/images/cgzt/5-5 绘制斜视图和局部视图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1256663073016512512"
      },
      {
        "title": "图2-9-2圆柱、圆锥、圆台、圆球及其表面上的投影",
        "cover": "https://www.keming365.com/images/圆台的形成.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1258031338787700736"
      },
      {
        "title": "图3-7-7补画基本几何体被截切后的投影(二)",
        "cover": "https://www.keming365.com/images/曲面体的截交线-圆锥.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1258052701690789888"
      },
      {
        "title": "图3-7-3补画基本几何体被截切后的投影(二)",
        "cover": "https://www.keming365.com/images/曲面体的截交线-圆锥.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1258052701690789888"
      },
      {
        "title": "图2-4-3根据轴测图画出三视图；求点的投影",
        "cover": "https://www.keming365.com/images/点的三面投影图的形成.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1258055135934808064"
      },
      {
        "title": "图1-9-3斜度、锥度和椭圆的画法",
        "cover": "https://www.keming365.com/images/hfjh2/图1-34 用四心近似法画椭圆.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293963810029174784"
      },
      {
        "title": "图1-7-4圆弧连接",
        "cover": "https://www.keming365.com/images/hfjh2/图1-37 手柄的平面图形.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293963810733817856"
      },
      {
        "title": "图2-8-1棱柱、棱锥、棱台及其表面上点的投影",
        "cover": "https://www.keming365.com/images/hfjh2/图3-2 正六棱柱三视图的画图步骤.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293964575112167424"
      },
      {
        "title": "图4-2-1根据视图中的尺寸，按1:1的比例画出其正等轴测图",
        "cover": "https://www.keming365.com/images/cgzt/4-40-1 根据已给视图,补画第三视图并画出正等测轴测图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1300824932455809024"
      },
      {
        "title": "图2-4-4根据轴测图画出三视图；求点的投影",
        "cover": "https://www.keming365.com/images/qdxha/图2-14 已知点的两面投影作第三面投影.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1315615050693607424"
      },
      {
        "title": "图2-4-5根据轴测图画出三视图；求点的投影",
        "cover": "https://www.keming365.com/images/qdxha/图2-21 根据两点的投影判断其相对位置.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1315615769815416832"
      },
      {
        "title": "图2-8-2棱柱、棱锥、棱台及其表面上点的投影",
        "cover": "https://www.keming365.com/images/qdxha/图2-36 三棱柱的投影.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1315616476035547136"
      },
      {
        "title": "图2-8-6棱柱、棱锥、棱台及其表面上点的投影",
        "cover": "https://www.keming365.com/images/qdxha/图2-38 三棱锥表面上点和直线的投影.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1315616644331995136"
      },
      {
        "title": "图2-8-7棱柱、棱锥、棱台及其表面上点的投影",
        "cover": "https://www.keming365.com/images/qdxha/图2-39 三棱锥表面上点的投影.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1315616941494239232"
      },
      {
        "title": "图2-9-5圆柱、圆锥、圆台、圆球及其表面上的投影",
        "cover": "https://www.keming365.com/images/qdxha/图2-47 圆柱体表面上点的投影.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1315617193320251392"
      },
      {
        "title": "图1-9-6斜度、锥度和椭圆的画法",
        "cover": "https://www.keming365.com/images/qdxha/表1-15 椭圆的作图方法与步骤.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1315619596023103488"
      }
    ],
    "机械制图习题集": [
      {
        "title": "图6-14 直齿轮的各部分名称及代号",
        "cover": "https://www.keming365.com/images/图8-5 外齿轮各部分的名称和符号.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=718877095173816320"
      },
      {
        "title": "图8-20 齿轮泵的工作原理",
        "cover": "https://www.keming365.com/images/3.6外啮合齿轮泵工作原理.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722084261015846912"
      },
      {
        "title": "图1-35 楔键",
        "cover": "https://www.keming365.com/images/图6-5楔键连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722127464192540672"
      },
      {
        "title": "图6-21 销的基本类型",
        "cover": "https://www.keming365.com/images/图6-22槽销.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722131793657987072"
      },
      {
        "title": "图6-28 圆柱螺旋压缩弹簧的作图步骤",
        "cover": "https://www.keming365.com/images/图15-9圆柱螺旋扭转弹簧的类型.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722378056756363264"
      },
      {
        "title": "图6-26 圆柱螺旋压缩弹簧的旋向",
        "cover": "https://www.keming365.com/images/图15-9圆柱螺旋扭转弹簧的类型.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722378056756363264"
      },
      {
        "title": "图7-24 基本术语和公差带示意图",
        "cover": "https://www.keming365.com/images/2-6极限与配合.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722389817488310272"
      },
      {
        "title": "图7-26 间隙配合",
        "cover": "https://www.keming365.com/images/2-8间隙配合.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722396123787952128"
      },
      {
        "title": "图7-27 过盈配合",
        "cover": "https://www.keming365.com/images/2-9过盈配合.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722396274933891072"
      },
      {
        "title": "图7-28 过渡配合",
        "cover": "https://www.keming365.com/images/2-10过渡配合.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722396432966877184"
      },
      {
        "title": "图7-25 公差带（基本偏差）相对于公称尺寸的位置示意图",
        "cover": "https://www.keming365.com/images/2-17基本偏差系列.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722401694553473024"
      },
      {
        "title": "图7-29 基孔制配合",
        "cover": "https://www.keming365.com/images/2-26b基孔制配合.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722406254017773568"
      },
      {
        "title": "图7-30 基轴制配合",
        "cover": "https://www.keming365.com/images/2-26c基轴制配合.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722407009206403072"
      },
      {
        "title": "图7-16 算数平均偏差Ra和轮廓最大高度Rz",
        "cover": "https://www.keming365.com/images/5-5几何参数.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722461872174923776"
      },
      {
        "title": "图1-24 作已知圆的内接正六边形",
        "cover": "https://www.keming365.com/images/图2-19 正六边形的作法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722476766337171456"
      },
      {
        "title": "图1-27 用圆弧连接钝角的两边",
        "cover": "https://www.keming365.com/images/图2-24 圆弧连接两直线.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722477272069570560"
      },
      {
        "title": "图3-21 两回转体公切于同一球面的相贯线——椭圆",
        "cover": "https://www.keming365.com/images/图9-43b 相贯线为平面曲线（续）.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722486484656979968"
      },
      {
        "title": "图3-2 两形体共面的画法",
        "cover": "https://www.keming365.com/images/图10-3 形体表面的连接方式.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722487287941693440"
      },
      {
        "title": "图3-4 两形体表面相切的画法",
        "cover": "https://www.keming365.com/images/图10-4  相切的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722487450944929792"
      },
      {
        "title": "图3-26 支座的画图步骤",
        "cover": "https://www.keming365.com/images/图10-10 支架及其形体分析.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722488549676417024"
      },
      {
        "title": "图3-24 支座的形体分析",
        "cover": "https://www.keming365.com/images/图10-10 支架及其形体分析.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722488549676417024"
      },
      {
        "title": "图5-15 用两个相交的剖切平面剖切获得的全剖视图",
        "cover": "https://www.keming365.com/images/图12-22 相交剖切面获得的剖视图示例（一）.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722491985264377856"
      },
      {
        "title": "图1-36 楔键的画法",
        "cover": "https://www.keming365.com/images/图13-40 钩头楔键联接的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722495534715109376"
      },
      {
        "title": "图7-36 两圆柱面相交的过渡线画法",
        "cover": "https://www.keming365.com/images/图14-21 过渡线画法（一）.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=722497950755848192"
      },
      {
        "title": "图1-26 圆弧连接实例",
        "cover": "https://www.keming365.com/images/1595209944996.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=733989900692488192"
      },
      {
        "title": "图1-23 作已知圆的内接正三边形",
        "cover": "https://www.keming365.com/images/1595209190856.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=733990828078268416"
      },
      {
        "title": "图2-8 三投影面体系",
        "cover": "https://www.keming365.com/images/1595208648549.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=733993006067089408"
      },
      {
        "title": "图2-12 三棱锥",
        "cover": "https://www.keming365.com/images/1595208453945.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=733993896878538752"
      },
      {
        "title": "图2-38 圆球的形成及三视图",
        "cover": "https://www.keming365.com/images/1595207889269.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=733995493721374720"
      },
      {
        "title": "图3-20 同轴回转体的相贯线——圆",
        "cover": "https://www.keming365.com/images/1595062045724.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=734000632293228544"
      },
      {
        "title": "2-11 画支座三视图的步骤",
        "cover": "https://www.keming365.com/images/1595062003711.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=734000819275300864"
      },
      {
        "title": "图4-11 圆柱的正等测画法",
        "cover": "https://www.keming365.com/images/1595061243252.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=734002532145168384"
      },
      {
        "title": "图4-13 圆角正等测的简化画法",
        "cover": "https://www.keming365.com/images/1595061172085.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=734002824144224256"
      },
      {
        "title": "图5-47 第一角画法与第三角画法获得的投影的方式",
        "cover": "https://www.keming365.com/images/1595060827864.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=734003698102960128"
      },
      {
        "title": "图7-48 测量中心距",
        "cover": "https://www.keming365.com/images/1595056780625.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=734045626571948032"
      },
      {
        "title": "图7-47 用游标卡尺测量尺寸",
        "cover": "https://www.keming365.com/images/1595056780625.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=734045626571948032"
      },
      {
        "title": "图8-1传动器轴测剖视图",
        "cover": "https://www.keming365.com/images/1595055467661.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=734046240798408704"
      },
      {
        "title": "图2-15 点的投影与坐标的关系",
        "cover": "https://www.keming365.com/images/1604388468972.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=772781521244258304"
      },
      {
        "title": "图2-21 一般位置直线的投影",
        "cover": "https://www.keming365.com/images/1604388448493.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=772786041558925312"
      },
      {
        "title": "图3-28 曲面立体的尺寸注法",
        "cover": "https://www.keming365.com/images/1618984788508.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834064780758089728"
      },
      {
        "title": "图3-27 平面立体的尺寸注法",
        "cover": "https://www.keming365.com/images/1618984788508.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834064780758089728"
      },
      {
        "title": "图1-1 基本幅面的尺寸关系",
        "cover": "https://www.keming365.com/images/1618984607368.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834066141520330752"
      },
      {
        "title": "图1-6 基本幅面的看图方向",
        "cover": "https://www.keming365.com/images/1618984582776.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834066276719525888"
      },
      {
        "title": "图1-2 不留装订边的图框格式",
        "cover": "https://www.keming365.com/images/1618984582776.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834066276719525888"
      },
      {
        "title": "图1-3 留装订边的图框格式",
        "cover": "https://www.keming365.com/images/1618984582776.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834066276719525888"
      },
      {
        "title": "图1-8 图形比例与尺寸数字",
        "cover": "https://www.keming365.com/images/1618984557531.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834066400464076800"
      },
      {
        "title": "",
        "cover": "https://www.keming365.com/images/1618984451227.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834066924412338176"
      },
      {
        "title": "图1-34 斜度的概念",
        "cover": "https://www.keming365.com/images/1618984356398.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834067473048272896"
      },
      {
        "title": "图1-37 锥度的定义",
        "cover": "https://www.keming365.com/images/1618984294712.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834067829316648960"
      },
      {
        "title": "图1-39 锥度的画法",
        "cover": "https://www.keming365.com/images/1618983440194.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834068064604520448"
      },
      {
        "title": "图1-51 徒手画直线的方法",
        "cover": "https://www.keming365.com/images/1618977818358.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834068486958350336"
      },
      {
        "title": "图1-54 特殊角度的徒手画法",
        "cover": "https://www.keming365.com/images/1618977360929.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834068618487529472"
      },
      {
        "title": "图1-52 圆的徒手画法",
        "cover": "https://www.keming365.com/images/1618977424549.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834068795680096256"
      },
      {
        "title": "图1-55 椭圆的徒手画法",
        "cover": "https://www.keming365.com/images/1618977309411.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834068930401140736"
      },
      {
        "title": "图2-3 投射线垂直投影面的平行投影法",
        "cover": "https://www.keming365.com/images/1618977069211.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834069869149290496"
      },
      {
        "title": "图2-17 两点的相对位置",
        "cover": "https://www.keming365.com/images/1618976745046.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834071325449388032"
      },
      {
        "title": "图2-36 圆锥的形成及三视图",
        "cover": "https://www.keming365.com/images/1618975459485.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834081428835663872"
      },
      {
        "title": "图2-39 圆球表面上点的求法",
        "cover": "https://www.keming365.com/images/1618975349637.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834085506764505088"
      },
      {
        "title": "图4-14 组合体正等测的叠加画法",
        "cover": "https://www.keming365.com/images/1618975171196.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834087315650379776"
      },
      {
        "title": "图4-20 支座的斜二测画法",
        "cover": "https://www.keming365.com/images/1618975065887.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834088189260988416"
      },
      {
        "title": "图3-14 圆球被平面截切的画法",
        "cover": "https://www.keming365.com/images/1618974721275.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834091543697555456"
      },
      {
        "title": "图3-17 两圆柱正交时相贯线的变化",
        "cover": "https://www.keming365.com/images/1618974569063.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834092351684083712"
      },
      {
        "title": "图5-3 六个基本视图的配置",
        "cover": "https://www.keming365.com/images/1618971119281.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834094057029369856"
      },
      {
        "title": "图5-33 按剖视图绘制的移出断面图",
        "cover": "https://www.keming365.com/images/1618970657045.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834098771368345600"
      },
      {
        "title": "图5-35 断开的移出断面图",
        "cover": "https://www.keming365.com/images/1618970621949.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834098929594269696"
      },
      {
        "title": "图5-36 重合断面图",
        "cover": "https://www.keming365.com/images/1618970563750.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834099167310643200"
      },
      {
        "title": "图6-4 螺纹旋向的判定",
        "cover": "https://www.keming365.com/images/1618970184206.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=834100340725907456"
      },
      {
        "title": "图5-3 向视图",
        "cover": "https://www.keming365.com/images/cgzt/5-4 绘制向视图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764148987166720"
      },
      {
        "title": "图5-31 移出断面的配置及标注",
        "cover": "https://www.keming365.com/images/cgzt/5-42 绘制移出断面图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764186672988160"
      },
      {
        "title": "图6-16 直齿轮啮合时的规定画法",
        "cover": "https://www.keming365.com/images/cgzt/6-10 啮合齿轮的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764220906897408"
      },
      {
        "title": "图6-5 外螺纹的规定画法",
        "cover": "https://www.keming365.com/images/cgzt/6-1 绘制正确的外螺纹并标注.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764223939379200"
      },
      {
        "title": "图6-17 键联结",
        "cover": "https://www.keming365.com/images/cgzt/6-11 键连接的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764254582964224"
      },
      {
        "title": "图6-20 键联接的画法",
        "cover": "https://www.keming365.com/images/cgzt/6-11 键连接的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764254582964224"
      },
      {
        "title": "图6-25 圆柱螺旋压缩弹簧的规定画法",
        "cover": "https://www.keming365.com/images/cgzt/6-15 弹簧的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764261025415168"
      },
      {
        "title": "图6-9 螺纹的标注方法",
        "cover": "https://www.keming365.com/images/cgzt/6-5 螺纹的标注.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764293615157248"
      },
      {
        "title": "图6-15 单个直齿轮的规定画法",
        "cover": "https://www.keming365.com/images/cgzt/6-9 齿轮的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764339546980352"
      },
      {
        "title": "图6-6 内螺纹的规定画法",
        "cover": "https://www.keming365.com/images/cgzt/6-3 绘制正确的内螺纹并标注.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764416109805568"
      },
      {
        "title": "图7-4 轴零件图",
        "cover": "https://www.keming365.com/images/cgzt/7-24.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764495877079040"
      },
      {
        "title": "图8-14 机用虎钳轴测剖视图",
        "cover": "https://www.keming365.com/images/cgzt/8-1.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1253764980063338496"
      },
      {
        "title": "图2-18 重影点和可见性",
        "cover": "https://www.keming365.com/images/两点的相对位置和重影点.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1258026077322739712"
      },
      {
        "title": "1-30 圆弧与圆弧外切连接",
        "cover": "https://www.keming365.com/images/两圆弧之间的圆弧连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1258026490109362176"
      },
      {
        "title": "图1-31 圆弧与圆弧内切连接",
        "cover": "https://www.keming365.com/images/两圆弧之间的圆弧连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1258026490109362176"
      },
      {
        "title": "图1-28 用圆弧连接直角的两边",
        "cover": "https://www.keming365.com/images/两直线的圆弧连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1258028718488551424"
      },
      {
        "title": "图5-37 局部放大图（一）",
        "cover": "https://www.keming365.com/images/局部放大图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1258035394558033920"
      },
      {
        "title": "图3-13 用辅助面法求圆锥的截交线",
        "cover": "https://www.keming365.com/images/曲面体的截交线-圆锥.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1258052701690789888"
      },
      {
        "title": "图3-12 用辅助线法求圆锥的截交线",
        "cover": "https://www.keming365.com/images/曲面体的截交线-圆锥.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1258052701690789888"
      },
      {
        "title": "图1-45 用两块三角板作任意方向已知直线的平行线和垂直线",
        "cover": "https://www.keming365.com/images/水平线与垂直线.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1258054585809895424"
      },
      {
        "title": "图1-29 用圆弧连接直线和圆弧",
        "cover": "https://www.keming365.com/images/直线与圆弧的圆弧连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1258056041564733440"
      },
      {
        "title": "图6-8 螺纹联接的规定画法",
        "cover": "https://www.keming365.com/images/hfjh-zy/3-1-7 补画三视图，并作立体表面上点M 、N 的另两个投影(二).png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1280555065689505792"
      },
      {
        "title": "图3-9 平面斜截交线的画法",
        "cover": "https://www.keming365.com/images/hfjh2/图4-8 平面斜切圆柱.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293963669926838272"
      },
      {
        "title": "图1-41 用四心近似画法画椭圆",
        "cover": "https://www.keming365.com/images/hfjh2/图1-34 用四心近似法画椭圆.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293963810029174784"
      },
      {
        "title": "图2-13 点的投影规律",
        "cover": "https://www.keming365.com/images/hfjh2/图2-10 点的投影.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293963881810493440"
      },
      {
        "title": "图2-4 平行投影法",
        "cover": "https://www.keming365.com/images/hfjh2/图2-1 投影法分类.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293963891025379328"
      },
      {
        "title": "图2-20 直线的投影",
        "cover": "https://www.keming365.com/images/hfjh2/图2-15 直线的投影.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293963911564886016"
      },
      {
        "title": "图2-23 直线上点的投影",
        "cover": "https://www.keming365.com/images/hfjh2/图2-16 直线上点的投影.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293963964333424640"
      },
      {
        "title": "图2-27 一般位置平面的投影特性",
        "cover": "https://www.keming365.com/images/hfjh2/图2-28 一般位置平面.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293964083514572800"
      },
      {
        "title": "图2-9 三视图的形成",
        "cover": "https://www.keming365.com/images/hfjh2/图2-6 三视图的形成.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293964463581429760"
      },
      {
        "title": "图2-10 展开后的三视图",
        "cover": "https://www.keming365.com/images/hfjh2/图2-6 三视图的形成.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293964463581429760"
      },
      {
        "title": "图3-15 半圆球开槽的画法",
        "cover": "https://www.keming365.com/images/hfjh2/图4-16 开槽半球三视图的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293964811175985152"
      },
      {
        "title": "图3-18 两圆柱正交时相贯线投影的简化画法",
        "cover": "https://www.keming365.com/images/hfjh2/图4-20_相贯线的作图方法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293964905027731456"
      },
      {
        "title": "图4-16 斜二测的形成",
        "cover": "https://www.keming365.com/images/hfjh2/图6-12 斜二测图的轴间角和轴向伸缩系数.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965222523961344"
      },
      {
        "title": "图4-5 楔形块正等测的作图步骤",
        "cover": "https://www.keming365.com/images/hfjh2/图6-5 切割法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965256241971200"
      },
      {
        "title": "图4-2 轴间角和轴向伸缩系数的规定",
        "cover": "https://www.keming365.com/images/hfjh2/图6-2 轴测图的形成.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965265230364672"
      },
      {
        "title": "图4-4 正六棱柱正等测的作图步骤",
        "cover": "https://www.keming365.com/images/hfjh2/图6-6 坐标法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965310612733952"
      },
      {
        "title": "图4-7 不同坐标面上圆的正等测画法",
        "cover": "https://www.keming365.com/images/hfjh2/图6-7 圆的正等测投影.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965406536466432"
      },
      {
        "title": "图5-8 剖视图的获得",
        "cover": "https://www.keming365.com/images/hfjh2/图7-10 视图与剖视图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965440162201600"
      },
      {
        "title": "图5-2 六个基本投影面的展开",
        "cover": "https://www.keming365.com/images/hfjh2/图7-2 基本视图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965540083105792"
      },
      {
        "title": "图5-1 基本视图的获得",
        "cover": "https://www.keming365.com/images/hfjh2/图7-2 基本视图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965540083105792"
      },
      {
        "title": "图5-16 剖切平面后的结构画法",
        "cover": "https://www.keming365.com/images/hfjh2/图7-23 相交剖切面的全剖视图示例（二）.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965570844131328"
      },
      {
        "title": "图5-30 断面图的获得",
        "cover": "https://www.keming365.com/images/hfjh2/图7-26 断面图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965604390174720"
      },
      {
        "title": "图6-10 螺栓联接",
        "cover": "https://www.keming365.com/images/hfjh2/图8-15 螺栓连接装配图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965717879652352"
      },
      {
        "title": "图6-1 在车床上车削螺纹",
        "cover": "https://www.keming365.com/images/hfjh2/图8-1 螺纹的加工方法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965746371559424"
      },
      {
        "title": "图6-12 螺纹紧固件的简化画法",
        "cover": "https://www.keming365.com/images/hfjh2/图8-17 螺钉连接.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965772338495488"
      },
      {
        "title": "图6-13 齿轮传动",
        "cover": "https://www.keming365.com/images/hfjh2/图8-20 齿轮传动.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965793687502848"
      },
      {
        "title": "图6-22 销联接的画法",
        "cover": "https://www.keming365.com/images/hfjh2/图8-32 销连接的画法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965802738810880"
      },
      {
        "title": "图6-18 普通平键的类型",
        "cover": "https://www.keming365.com/images/hfjh2/图8-30 键.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965889078558720"
      },
      {
        "title": "图6-23 滚动轴承的结构及类型",
        "cover": "https://www.keming365.com/images/hfjh2/图8-33 滚动轴承的结构.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293965900046663680"
      },
      {
        "title": "图7-37 倒角与倒圆的注法",
        "cover": "https://www.keming365.com/images/hfjh2/图9-23 倒角和倒圆.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293966086017908736"
      },
      {
        "title": "图7-3 轴的结构",
        "cover": "https://www.keming365.com/images/hfjh2/图9-8 常见轴套类零件.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1293966151897841664"
      },
      {
        "title": "图1-44 丁字尺和三角板的使用方法",
        "cover": "https://www.keming365.com/images/qdxha/图1-1 绘图板与丁字尺.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1315614551110057984"
      },
      {
        "title": "图1-48 圆规的用法",
        "cover": "https://www.keming365.com/images/qdxha/图1-7 圆规的使用方法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1315614565932728320"
      },
      {
        "title": "图1-49 分规的用法",
        "cover": "https://www.keming365.com/images/qdxha/图1-8 分规的使用方法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1315614630000721920"
      },
      {
        "title": "图2-14 已知点的两面投影求第三面投影",
        "cover": "https://www.keming365.com/images/qdxha/图2-14 已知点的两面投影作第三面投影.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1315615050693607424"
      },
      {
        "title": "图2-1 投影的形成",
        "cover": "https://www.keming365.com/images/qdxha/图2-2 中心投影法.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1315615616249364480"
      },
      {
        "title": "图2-16 根据点的坐标求作投影",
        "cover": "https://www.keming365.com/images/qdxha/图2-19 根据点的坐标作投影图.png",
        "url": "http://www.keming365.com/user/showPPT?appliId=1315615636914700288"
      }
    ],
    "电工技能实训A": [],
    "钳工技能实训A": []
  },
  "malaysia": {},
  "indonesia": {},
  "singapore": {},
  "mexico": {}
}

const courseCategoryAliases: Record<string, Record<string, string>> = {
  vietnam: {
    // The legacy page displayed this resource list under 钳工技能实训A.
    '钳工技能实训A': '机加工技能实训A'
  }
}

export function getCourses(country: string, category: string): VideoCourse[] {
  const resolvedCategory = courseCategoryAliases[country]?.[category] || category
  return courseData[country]?.[resolvedCategory] || []
}

export function t(text: string, _lang?: string): string {
  return text
}

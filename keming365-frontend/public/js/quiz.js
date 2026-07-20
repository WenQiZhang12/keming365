/**
 * 在线测试系统 - JavaScript实现 * 支持动态创建测试题，无需修改HTML
 */

var QuizSystem = (function() {
    var quizData = {
        huafa: [
            // ========== 1.1 技术制图国家标准的一般规定==========
            {
                id: 'q1_1_1',
                type: 'single',
                question: '根据GB/T 14689-2008，标准的图纸幅面共有几种？',
                options: [
                    { key: 'A', value: '3' },
                    { key: 'B', value: '4' },
                    { key: 'C', value: '5' },
                    { key: 'D', value: '6' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：标准的图纸幅面代号为A0、A1、A2、A3、A4，共五种。'
            },
            {
                id: 'q1_1_2',
                type: 'single',
                question: '关于比例，下列说法正确的是：',
                options: [
                    { key: 'A', value: '比例是指实物与图形相应要素的线性尺寸之比' },
                    { key: 'B', value: '无论采用何种比例，所注尺寸数字均为物体的实际尺寸' },
                    { key: 'C', value: '采用1:2的比例时，尺寸数字应缩小一半' },
                    { key: 'D', value: '比例只能从"允许选择系列"中选取' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：比例定义为图形与实物相应要素的线性尺寸之比，故A错。尺寸数字必须标注物体的真实大小，不随比例改变，故B对、C错。比例优先从"优先选择系列"中选取，并非只能从"允许选择系列"中选，故D错。'
            },
            {
                id: 'q1_1_3',
                type: 'single',
                question: '标题栏在图纸中的配置位置一般是？',
                options: [
                    { key: 'A', value: '图纸边框内的左上角' },
                    { key: 'B', value: '图纸边框内的右上角' },
                    { key: 'C', value: '图纸边框内的左下角' },
                    { key: 'D', value: '图纸边框内的右下角' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：标题栏通常配置在图纸边框内的右下角，并且标题栏中的文字方向应与看图方向一致。'
            },
            {
                id: 'q1_1_4',
                type: 'single',
                question: '关于图线的规定，下列说法错误的是：',
                options: [
                    { key: 'A', value: '同一张图样中，同类图线的宽度应基本一致' },
                    { key: 'B', value: '粗线与细线的宽度比为2:1' },
                    { key: 'C', value: '点画线和双点画线的末端可以是点或空隙' },
                    { key: 'D', value: '两条平行线的最小距离不得小于0.7mm' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：点画线和双点画线的末端必须是线段，不能是点或空隙。其他选项均符合图线规范。'
            },
            {
                id: 'q1_1_5',
                type: 'single',
                question: '标注线性尺寸时，尺寸数字的注写方向要求是：',
                options: [
                    { key: 'A', value: '水平方向字头向左' },
                    { key: 'B', value: '竖直方向字头向上' },
                    { key: 'C', value: '倾斜方向字头保持向上趋势' },
                    { key: 'D', value: '所有方向字头都向右' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：水平方向尺寸数字字头向上；竖直方向字头向左；倾斜方向字头保持向上的趋势。因此C正确。'
            },
            {
                id: 'q1_1_6',
                type: 'single',
                question: '尺寸标注中，表示"45°倒角"的常用符号是？',
                options: [
                    { key: 'A', value: 'R' },
                    { key: 'B', value: 'C' },
                    { key: 'C', value: 't' },
                    { key: 'D', value: 'EQS' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：R表示半径，C表示45°倒角，t表示厚度，EQS表示均布。'
            },
            {
                id: 'q1_1_7',
                type: 'judge',
                question: '必要时，加长幅面的尺寸由基本幅面的短边乘整数倍增加后得出？',
                answer: 'true',
                explanation: '参考答案：√<br>解析：加长幅面是在基本幅面的基础上，将其短边乘以整数倍来获得长边尺寸，从而得到加长幅面。'
            },
            {
                id: 'q1_1_8',
                type: 'judge',
                question: '在较小的图形上绘制点画线或双点画线有困难时，可用粗实线代替？',
                answer: 'false',
                explanation: '参考答案：×<br>解析：当绘制点画线或双点画线有困难时，应使用细实线代替，而不是粗实线。'
            },
            {
                id: 'q1_1_9',
                type: 'judge',
                question: '整圆或大于半圆的圆弧一般标注半径尺寸，并在数值前加"R"？',
                answer: 'false',
                explanation: '参考答案：×<br>解析：整圆或大于半圆的圆弧应标注直径尺寸，并在数值前加"φ"或"Ø"；只有半圆或小于半圆的圆弧才标注半径尺寸并加"R"。'
            },
            {
                id: 'q1_1_10',
                type: 'judge',
                question: '尺寸线可以用其他图线代替，也可以与其他图线重合？',
                answer: 'false',
                explanation: '参考答案：×<br>解析：尺寸线必须用细实线单独绘制，不能用其他图线代替，也不得与其他图线重合或画在其延长线上。'
            },
            // ========== 1.2 绘图工具的使用方法==========
            {
                id: 'q1_2_1',
                type: 'single',
                question: '丁字尺与图板配合，主要用来绘制（）',
                options: [
                    { key: 'A', value: '竖直线' },
                    { key: 'B', value: '水平线' },
                    { key: 'C', value: '45°斜线' },
                    { key: 'D', value: '圆弧' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：丁字尺尺头靠紧图板左侧，沿尺身可画出水平直线。'
            },
            {
                id: 'q1_2_2',
                type: 'single',
                question: '绘制工程图底稿时，应选用的铅笔型号是（）',
                options: [
                    { key: 'A', value: '2H' },
                    { key: 'B', value: 'HB' },
                    { key: 'C', value: 'B' },
                    { key: 'D', value: '6B' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：H铅笔较硬，颜色浅，适合绘制底稿。'
            },
            {
                id: 'q1_2_3',
                type: 'single',
                question: '绘制机械图样粗实线时，常用铅笔型号为（）',
                options: [
                    { key: 'A', value: 'H' },
                    { key: 'B', value: '2H' },
                    { key: 'C', value: 'B/HB' },
                    { key: 'D', value: '6H' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：B/HB铅芯软硬适中，适合绘制粗实线。'
            },
            {
                id: 'q1_2_4',
                type: 'single',
                question: '圆规在使用时，针脚与铅芯应（）',
                options: [
                    { key: 'A', value: '与纸面倾斜' },
                    { key: 'B', value: '尽量与纸面垂直' },
                    { key: 'C', value: '一高一低' },
                    { key: 'D', value: '随意放置' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：圆规画图时，针脚与铅芯尽量垂直纸面，保证圆弧光滑。'
            },
            {
                id: 'q1_2_5',
                type: 'single',
                question: '主要用于量取长度、等分线段的绘图工具是（）',
                options: [
                    { key: 'A', value: '圆规' },
                    { key: 'B', value: '分规' },
                    { key: 'C', value: '曲线板' },
                    { key: 'D', value: '三角板' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：分规的作用是量取尺寸、等分线段、转移长度。'
            },
            {
                id: 'q1_2_6',
                type: 'single',
                question: '曲线板的正确使用方法是（）',
                options: [
                    { key: 'A', value: '对准2点连1点' },
                    { key: 'B', value: '对准3点连2点' },
                    { key: 'C', value: '对准4点连3点' },
                    { key: 'D', value: '随意连接' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：曲线板画非圆曲线，对准4点、连3点，保证曲线顺滑。'
            },
            {
                id: 'q1_2_7',
                type: 'judge',
                question: '丁字尺移动时，应用左手扶持尺头，画线前推紧尺头。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：使用丁字尺的规范动作：左手扶尺头、画线前推紧尺头。'
            },
            {
                id: 'q1_2_8',
                type: 'judge',
                question: '6H铅笔比B铅笔更软，颜色更深。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：H代表硬，B代表软；6H最硬最浅，6B最软最深。'
            },
            {
                id: 'q1_2_9',
                type: 'judge',
                question: '三角板与丁字尺配合，可画出5°、10°、15°、20°、25°等斜线。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：5°、10°、15°、20°、25°三角板组合，可画出上述常用角度斜线。'  
            },
            {
                id: 'q1_2_10',
                type: 'judge',
                question: '曲线板只能用来画圆和圆弧。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：曲线板专门用于绘制非圆曲线，不画圆与圆弧。'
            },
            // ========== 1.3 几何作图 ==========
            {
                id: 'q1_3_1',
                type: 'single',
                question: '正五边形作图时，确定边长的关键步骤是先平分（）',
                options: [
                    { key: 'A', value: '外接圆直径' },
                    { key: 'B', value: '外接圆半径' },
                    { key: 'C', value: '圆周' },
                    { key: 'D', value: '角度' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：正五边形画法第一步为平分外接圆半径OB得到O₁。'
            },
            {
                id: 'q1_3_2',
                type: 'single',
                question: '斜度标注时，应在比例前加注的符号是（）',
                options: [
                    { key: 'A', value: '∠' },
                    { key: 'B', value: '△' },
                    { key: 'C', value: '⊥' },
                    { key: 'D', value: '∥' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：斜度以1:n标注，数值前加∠符号。'
            },
            {
                id: 'q1_3_3',
                type: 'single',
                question: '锥度是指（）',
                options: [
                    { key: 'A', value: '底圆直径与圆锥高度之比' },
                    { key: 'B', value: '底圆半径与高度之比' },
                    { key: 'C', value: '斜边与高度之比' },
                    { key: 'D', value: '周长与高度之比' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：锥度= 底圆直径D / 圆锥高度L'
            },
            {
                id: 'q1_3_4',
                type: 'single',
                question: '圆弧连接的作图核心步骤是先确定（）',
                options: [
                    { key: 'A', value: '切点' },
                    { key: 'B', value: '连接圆弧的圆心' },
                    { key: 'C', value: '半径' },
                    { key: 'D', value: '角度' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：圆弧连接必须先找圆心，再找切点。'
            },
            {
                id: 'q1_3_5',
                type: 'single',
                question: '绘制椭圆的常用近似方法是（）',
                options: [
                    { key: 'A', value: '同心圆法' },
                    { key: 'B', value: '四心法' },
                    { key: 'C', value: '三等分法' },
                    { key: 'D', value: '圆弧法' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：椭圆近似画法常用四心法（四段圆弧拼成椭圆）'
            },
            {
                id: 'q1_3_6',
                type: 'single',
                question: '斜度符号的方向应（）',
                options: [
                    { key: 'A', value: '与斜边倾斜方向一致' },
                    { key: 'B', value: '水平向右' },
                    { key: 'C', value: '竖直向上' },
                    { key: 'D', value: '任意方向' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：斜度符号方向必须与斜边倾斜方向一致。'
            },
            {
                id: 'q1_3_7',
                type: 'judge',
                question: '正N边形作图时，需先将外接圆直径等分为N等份。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：正N边形画法第二步为将直径N等分。'
            },
            {
                id: 'q1_3_8',
                type: 'judge',
                question: '锥度符号的尖端方向应与圆锥倾斜方向一致。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：锥度符号尖端方向与锥面倾斜方向一致。'
            },
            {
                id: 'q1_3_9',
                type: 'judge',
                question: '用圆弧内切连接两圆弧时，圆心距为两半径之和。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：内切时圆心距为两半径之差（R−R₁）'
            },
            {
                id: 'q1_3_10',
                type: 'judge',
                question: '齿轮的齿形轮廓常采用圆的渐开线。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：机械中齿轮齿形常用渐开线。'
            },
            // ========== 1.4 平面图形的分析及画法 ==========
            {
                id: 'q1_4_1',
                type: 'single',
                question: '用来确定平面图形各部分形状大小的尺寸称为（）',
                options: [
                    { key: 'A', value: '定位尺寸' },
                    { key: 'B', value: '定形尺寸' },
                    { key: 'C', value: '基准尺寸' },
                    { key: 'D', value: '连接尺寸' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：定形尺寸用于确定线段、圆弧、角度的大小。'
            },
            {
                id: 'q1_4_2',
                type: 'single',
                question: '尺寸基准是指标注尺寸的（）',
                options: [
                    { key: 'A', value: '终点' },
                    { key: 'B', value: '起点' },
                    { key: 'C', value: '中间点' },
                    { key: 'D', value: '切点' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：尺寸基准是注写尺寸与计量尺寸的起点。'
            },
            {
                id: 'q1_4_3',
                type: 'single',
                question: '定形尺寸和定位尺寸都齐全，可直接画出的线段是（）',
                options: [
                    { key: 'A', value: '已知线段' },
                    { key: 'B', value: '中间线段' },
                    { key: 'C', value: '连接线段' },
                    { key: 'D', value: '过渡线段' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：已知线段的定形、定位尺寸齐全，可直接绘制。'
            },
            {
                id: 'q1_4_4',
                type: 'single',
                question: '只给出定形尺寸，需依靠相切条件才能画出的线段是（）',
                options: [
                    { key: 'A', value: '已知线段' },
                    { key: 'B', value: '中间线段' },
                    { key: 'C', value: '连接线段' },
                    { key: 'D', value: '基准线段' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：连接线段只有定形尺寸，靠相切关系画出。'
            },
            {
                id: 'q1_4_5',
                type: 'single',
                question: '平面图形绘图步骤的正确顺序是（）',
                options: [
                    { key: 'A', value: '已知线段→基准线→中间线段→连接线段' },
                    { key: 'B', value: '基准线→已知线段→中间线段→连接线段' },
                    { key: 'C', value: '连接线段→中间线段→已知线段→基准线' },
                    { key: 'D', value: '基准线→连接线段→中间线段→已知线段' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：画图顺序固定为：基准→已知→中间→连接。'
            },
            {
                id: 'q1_4_6',
                type: 'single',
                question: '下列不属于尺寸基准常用选择的是（）',
                options: [
                    { key: 'A', value: '对称中心线' },
                    { key: 'B', value: '轴线' },
                    { key: 'C', value: '基准线' },
                    { key: 'D', value: '任意切点' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：基准一般是中心线、轴线、基准线，不选切点。'
            },
            {
                id: 'q1_4_7',
                type: 'judge',
                question: '定位尺寸用于确定平面图形各部分之间的相对位置。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：定位尺寸决定各结构的位置关系。'
            },
            {
                id: 'q1_4_8',
                type: 'judge',
                question: '中间线段不需要任何附加条件即可直接画出。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：中间线段定位尺寸不全，需附加几何条件才能画出。'
            },
            {
                id: 'q1_4_9',
                type: 'judge',
                question: '绘制平面图形时，应最后画连接线段。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：连接线段依赖相切，放在最后绘制。'
            },
            {
                id: 'q1_4_10',
                type: 'judge',
                question: 'R20、Φ20°都属于定形尺寸。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：半径、直径、角度都用于确定形状大小，是定形尺寸。'
            },
            // ========== 2.1 投影的基础知识 ==========
            {
                id: 'q2_1_1',
                type: 'single',
                question: '投影法必须具备的三个基本条件不包括（）',
                options: [
                    { key: 'A', value: '投射中心与投射线' },
                    { key: 'B', value: '投影面' },
                    { key: 'C', value: '空间物体' },
                    { key: 'D', value: '投影仪器' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：投影三要素是投射中心、投影面、空间物体，不需要仪器。'
            },
            {
                id: 'q2_1_2',
                type: 'single',
                question: '工程制图中主要采用的投影法是（）',
                options: [
                    { key: 'A', value: '中心投影法' },
                    { key: 'B', value: '平行投影法中的正投影法' },
                    { key: 'C', value: '斜投影法' },
                    { key: 'D', value: '透视投影法' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：工程图样全部使用正投影法。'
            },
            {
                id: 'q2_1_3',
                type: 'single',
                question: '投射线汇交于一点的投影法是（）',
                options: [
                    { key: 'A', value: '正投影法' },
                    { key: 'B', value: '平行投影法' },
                    { key: 'C', value: '中心投影法' },
                    { key: 'D', value: '斜投影法' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：中心投影法的投射线相交于同一投射中心。'
            },
            {
                id: 'q2_1_4',
                type: 'single',
                question: '当直线平行于投影面时，正投影具有（）',
                options: [
                    { key: 'A', value: '积聚性' },
                    { key: 'B', value: '实形性' },
                    { key: 'C', value: '类似性' },
                    { key: 'D', value: '定比性' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：平行于投影面的直线，其正投影反映实长/实形，即实形性。'
            },
            {
                id: 'q2_1_5',
                type: 'single',
                question: '当直线垂直于投影面时，其正投影会（）',
                options: [
                    { key: 'A', value: '反映实长' },
                    { key: 'B', value: '积聚成一点' },
                    { key: 'C', value: '成缩小直线' },
                    { key: 'D', value: '成类似形' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：垂直投影面的直线，其正投影积聚为一点。'
            },
            {
                id: 'q2_1_6',
                type: 'single',
                question: '空间两直线互相平行，其正投影会（）',
                options: [
                    { key: 'A', value: '一定相交' },
                    { key: 'B', value: '仍然互相平行' },
                    { key: 'C', value: '积聚成一点' },
                    { key: 'D', value: '成任意角度' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：正投影具有平行性，空间平行则投影平行。'
            },
            {
                id: 'q2_1_7',
                type: 'judge',
                question: '中心投影法能准确反映物体的真实大小，适合工程制图。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：中心投影度量性差，不用于工程制图。'
            },
            {
                id: 'q2_1_8',
                type: 'judge',
                question: '正投影法的投射线与投影面互相垂直。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：正投影 = 投射线垂直投影面。'
            },
            {
                id: 'q2_1_9',
                type: 'judge',
                question: '正投影的类似性是指投影后图形边数、凸凹性、曲直不变。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：类似性只改变大小，不改变形状特征。'
            },
            {
                id: 'q2_1_10',
                type: 'judge',
                question: '点在直线上，则点的投影一定在该直线的投影上。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：这是正投影的从属性。'
            },
            // ========== 2.2 三视图 ==========
            {
                id: 'q2_2_1',
                type: 'single',
                question: '三视图的投影规律中，"长对正"指的是（　）',
                options: [
                    { key: 'A', value: '主视图与左视图的长度相等' },
                    { key: 'B', value: '主视图与俯视图的长度相等' },
                    { key: 'C', value: '俯视图与左视图的长度相等' },
                    { key: 'D', value: '主视图与俯视图的高度相等' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：长对正指主视图和俯视图中，物体的长度（左右方向尺寸）相互对正且相等。'
            },
            {
                id: 'q2_2_2',
                type: 'single',
                question: '在三视图中，物体的前方应表示为（　）',
                options: [
                    { key: 'A', value: '俯视图的下方和左视图的左方' },
                    { key: 'B', value: '俯视图的上方和左视图的右方' },
                    { key: 'C', value: '俯视图的下方和左视图的右方' },
                    { key: 'D', value: '俯视图的上方和左视图的左方' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：俯视图中，下方表示物体前方；左视图中，右侧表示物体前方。即"下前右前"。'
            },
            {
                id: 'q2_2_3',
                type: 'single',
                question: '左视图可以反映物体的哪些方位和尺寸？（　）',
                options: [
                    { key: 'A', value: '上下和左右，高度和长度' },
                    { key: 'B', value: '前后和左右，宽度和长度' },
                    { key: 'C', value: '上下和前后，高度和宽度' },
                    { key: 'D', value: '上下和左右，高度和宽度' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：左视图是从物体左侧向右投影，反映物体的上下（高）和前后（宽）方位，以及高度和宽度尺寸。'
            },
            {
                id: 'q2_2_4',
                type: 'single',
                question: '三投影面体系中，水平投影面用字母（　）表示',
                options: [
                    { key: 'A', value: 'H' },
                    { key: 'B', value: 'V' },
                    { key: 'C', value: 'W' },
                    { key: 'D', value: 'X' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：正立投影面用V表示，水平投影面用H表示，侧立投影面用W表示。'
            },
            {
                id: 'q2_2_5',
                type: 'single',
                question: '形成三视图时，投影面展开的方法是（　）',
                options: [
                    { key: 'A', value: 'H面绕OX轴向上转90°，W面绕OZ轴向右转90°' },
                    { key: 'B', value: 'H面绕OX轴向下转90°，W面绕OZ轴向左转90°' },
                    { key: 'C', value: 'H面绕OX轴向下转90°，W面绕OZ轴向右转90°' },
                    { key: 'D', value: 'H面绕OX轴向上转90°，W面绕OZ轴向左转90°' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：为使三个视图展平在同一平面内，规定V面不动，H面绕OX轴向下转90°，W面绕OZ轴向右转90°。'
            },
            {
                id: 'q2_2_6',
                type: 'single',
                question: '仅凭一个视图，能反映物体的（　）尺寸',
                options: [
                    { key: 'A', value: '三个方向' },
                    { key: 'B', value: '两个方向' },
                    { key: 'C', value: '一个方向' },
                    { key: 'D', value: '无法确定' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：每个视图均能反映两个方向的尺寸：主视图反映长和高，俯视图反映长和宽，左视图反映高和宽。'
            },
            {
                id: 'q2_2_7',
                type: 'judge',
                question: '主视图和俯视图都反映了物体的宽度方向尺寸。（　）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：主视图反映长度和高度，不反映宽度；宽度由俯视图和左视图共同反映。'
            },
            {
                id: 'q2_2_8',
                type: 'judge',
                question: '三视图的投影规律可概括为：主、俯视图长对正，主、左视图高平齐，俯、左视图宽相等。（　）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：这是三视图最基本的投影规律，绘图和读图必须遵循。'
            },
            {
                id: 'q2_2_9',
                type: 'judge',
                question: '在左视图中，水平方向的尺寸表示物体的左右长度。（　）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：左视图中的水平方向，反映的是物体的宽度（前后方向）尺寸，左右长度由主视图和俯视图反映。'
            },
            {
                id: 'q2_2_10',
                type: 'judge',
                question: '我国机械制图标准采用第一角画法，遵循"物体-投影面-观察者"的位置关系。（　）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：第一角画法中，物体置于观察者与投影面之间，位置关系为"物体-投影面-观察者"，不为"物体-观察者-投影面"。第三角画法才是投影面在物体和观察者之间。'
            },
            // ========== 2.3 点的投影 ==========
            {
                id: 'q2_3_1',
                type: 'single',
                question: '空间点A的正面投影符号为（）',
                options: [
                    { key: 'A', value: 'a' },
                    { key: 'B', value: 'a′' },
                    { key: 'C', value: 'a″' },
                    { key: 'D', value: 'A' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：正面投影用a′表示。'
            },
            {
                id: 'q2_3_2',
                type: 'single',
                question: '点的正面投影与水平投影的连线（）',
                options: [
                    { key: 'A', value: '平行于OX轴' },
                    { key: 'B', value: '垂直于OX轴' },
                    { key: 'C', value: '平行于OY轴' },
                    { key: 'D', value: '垂直于OZ轴' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：a′a ⊥ OX，是点的核心投影规律。'
            },
            {
                id: 'q2_3_3',
                type: 'single',
                question: '已知点A(10,20,30)，其中代表上下高度的坐标是（）',
                options: [
                    { key: 'A', value: 'x' },
                    { key: 'B', value: 'y' },
                    { key: 'C', value: 'z' },
                    { key: 'D', value: '都不表示'  }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：Z坐标表示上下高度。'
            },
            {
                id: 'q2_3_4',
                type: 'single',
                question: '判断两点前后位置，应比较（）',
                options: [
                    { key: 'A', value: 'X坐标' },
                    { key: 'B', value: 'Y坐标' },
                    { key: 'C', value: 'Z坐标' },
                    { key: 'D', value: '任意坐标' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：Y坐标大表示靠前。'
            },
            {
                id: 'q2_3_5',
                type: 'single',
                question: '水平投影重影时，可见性由（）坐标判断',
                options: [
                    { key: 'A', value: 'X' },
                    { key: 'B', value: 'Y' },
                    { key: 'C', value: 'Z' },
                    { key: 'D', value: '都不是' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：H面重影看Z，Z大可见。'
            },
            {
                id: 'q2_3_6',
                type: 'single',
                question: '不可见的重影点投影，书写时应（）',
                options: [
                    { key: 'A', value: '加下划线' },
                    { key: 'B', value: '加括号' },
                    { key: 'C', value: '加波浪线' },
                    { key: 'D', value: '不变' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：不可见投影加括号，如(a)。'
            },
            {
                id: 'q2_3_7',
                type: 'judge',
                question: '单点的一个投影可以确定点的空间位置。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：单面投影不能确定空间位置。'
            },
            {
                id: 'q2_3_8',
                type: 'judge',
                question: '点的水平投影到OX轴的距离等于侧面投影到OZ轴的距离。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：符合点的第三条投影规律。'
            },
            {
                id: 'q2_3_9',
                type: 'judge',
                question: '两点X坐标大的点，位于左侧。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：X坐标判定左右。'
            },
            {
                id: 'q2_3_10',
                type: 'judge',
                question: '当两点在同一条投射线上时，它们在该投影面上的投影重合，称为重影点。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：这是重影点的标准定义。'
            },
            // ========== 2.4 直线的投影 ==========
            {
                id: 'q2_4_1',
                type: 'single',
                question: '直线垂直于投影面时，其投影为（）',
                options: [
                    { key: 'A', value: '实长直线' },
                    { key: 'B', value: '一点' },
                    { key: 'C', value: '缩短直线' },
                    { key: 'D', value: '曲线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：直线垂直投影面，投影积聚成一点。'
            },
            {
                id: 'q2_4_2',
                type: 'single',
                question: '直线上的点分割线段之比等于投影之比，这是（）',
                options: [
                    { key: 'A', value: '从属性' },
                    { key: 'B', value: '定比性' },
                    { key: 'C', value: '平行性' },
                    { key: 'D', value: '积聚性' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：这是直线上点的定比性。'
            },
            {
                id: 'q2_4_3',
                type: 'single',
                question: '平行于H面的直线称为（）',
                options: [
                    { key: 'A', value: '正平线' },
                    { key: 'B', value: '水平线' },
                    { key: 'C', value: '侧平线' },
                    { key: 'D', value: '铅垂线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：平行H面为水平线。'
            },
            {
                id: 'q2_4_4',
                type: 'single',
                question: '铅垂线在哪个投影面的投影积聚为一点（）',
                options: [
                    { key: 'A', value: 'V面' },
                    { key: 'B', value: 'H面' },
                    { key: 'C', value: 'W面' },
                    { key: 'D', value: '全部' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：铅垂线垂直H面，H投影聚成点。'
            },
            {
                id: 'q2_4_5',
                type: 'single',
                question: '两直线既不平行也不相交，称为（）',
                options: [
                    { key: 'A', value: '平行直线' },
                    { key: 'B', value: '相交直线' },
                    { key: 'C', value: '交叉直线' },
                    { key: 'D', value: '垂直直线' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：既不平行也不相交为交叉直线。'
            },
            {
                id: 'q2_4_6',
                type: 'single',
                question: '直角投影定理成立的条件是，有一条直线（）',
                options: [
                    { key: 'A', value: '垂直投影面' },
                    { key: 'B', value: '平行投影面' },
                    { key: 'C', value: '一般位置' },
                    { key: 'D', value: '任意位置' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：必须有一条直线平行于投影面。'
            },
            {
                id: 'q2_4_7',
                type: 'judge',
                question: '直线平行于投影面，其投影反映实长。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：符合真实性。'
            },
            {
                id: 'q2_4_8',
                type: 'judge',
                question: '点的两面投影在直线的同面投影上，即可判定点在直线上。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：符合从属性。'
            },
            {
                id: 'q2_4_9',
                type: 'judge',
                question: '正平线的正面投影反映实长。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：平行线在平行面上投影为实长。'
            },
            {
                id: 'q2_4_10',
                type: 'judge',
                question: '一般位置直线的三个投影都反映实长。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：一般位置直线投影都短于实长。'
            },
            // ========== 2.5 平面的投影 ==========
            {
                id: 'q2_5_1',
                type: 'single',
                question: '下列哪一项不属于平面的表示法（）',
                options: [
                    { key: 'A', value: '两相交直线' },
                    { key: 'B', value: '两平行直线' },
                    { key: 'C', value: '任意一点' },
                    { key: 'D', value: '平面图形' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：一个点不能唯一确定平面，平面需要至少不共线三点等条件确定。'
            },
            {
                id: 'q2_5_2',
                type: 'single',
                question: '水平面在H面的投影特性是（）',
                options: [
                    { key: 'A', value: '积聚为直线' },
                    { key: 'B', value: '反映实形' },
                    { key: 'C', value: '为缩小类似形' },
                    { key: 'D', value: '垂直于OY轴' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：水平面平行于H面，H投影反映实形。'
            },
            {
                id: 'q2_5_3',
                type: 'single',
                question: '正垂面在V面的投影为（）',
                options: [
                    { key: 'A', value: '实形' },
                    { key: 'B', value: '积聚成斜线' },
                    { key: 'C', value: '类似形' },
                    { key: 'D', value: '平行于OX轴' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：正垂面垂直V面，V投影积聚成一条斜线。'
            },
            {
                id: 'q2_5_4',
                type: 'single',
                question: '一般位置平面的投影特性是（）',
                options: [
                    { key: 'A', value: '一个积聚，两个类似' },
                    { key: 'B', value: '一个实形，两个积聚' },
                    { key: 'C', value: '三个都是类似形' },
                    { key: 'D', value: '三个都反映实形' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：一般位置平面三面投影都是类似形。'
            },
            {
                id: 'q2_5_5',
                type: 'single',
                question: '点在平面上的条件是（）',
                options: [
                    { key: 'A', value: '点在平面外一条直线上' },
                    { key: 'B', value: '点在平面内任意一条直线上' },
                    { key: 'C', value: '只需点的投影在平面投影内' },
                    { key: 'D', value: '点必须在顶点上' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：点在平面内直线。'
            },
            {
                id: 'q2_5_6',
                type: 'single',
                question: '侧平面在W面的投影（）',
                options: [
                    { key: 'A', value: '积聚成直线' },
                    { key: 'B', value: '反映实形' },
                    { key: 'C', value: '为类似形' },
                    { key: 'D', value: '垂直于OZ轴' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：侧平面平行W面，W投影反映实形。'
            },
            {
                id: 'q2_5_7',
                type: 'judge',
                question: '正平面的水平投影平行于OX轴，积聚为直线。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：正平面的H、W投影均积聚且平行对应轴。'
            },
            {
                id: 'q2_5_8',
                type: 'judge',
                question: '铅垂面的水平投影积聚成直线，并反映倾角β、γ。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：垂直面的积聚投影可直接反映真实倾角。'
            },
            {
                id: 'q2_5_9',
                type: 'judge',
                question: '一般位置平面的三个投影都不反映实形，均为类似形。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：一般面对三面都倾斜，无实形、无积聚。'
            },
            {
                id: 'q2_5_10',
                type: 'judge',
                question: '平面上不能画出投影面平行线。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：任何平面都能画出水平线、正平线、侧平线。'
            },
            // ========== 2.6 几何元素相对位置 ==========
            {
                id: 'q2_6_1',
                type: 'single',
                question: '直线与平面平行的几何条件是直线平行于平面内（）',
                options: [
                    { key: 'A', value: '任意一条直线' },
                    { key: 'B', value: '任意两条直线' },
                    { key: 'C', value: '一条水平线' },
                    { key: 'D', value: '一条正平线' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：直线平行于平面内任意一条直线，即可判定线面平行。'
            },
            {
                id: 'q2_6_2',
                type: 'single',
                question: '两平面平行的条件是：一平面内两条相交直线对应平行于另一平面内（）',
                options: [
                    { key: 'A', value: '一条直线' },
                    { key: 'B', value: '两条平行直线' },
                    { key: 'C', value: '两条相交直线' },
                    { key: 'D', value: '任意直线' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：面面平行需要两组相交直线分别平行。'
            },
            {
                id: 'q2_6_3',
                type: 'single',
                question: '直线与平面相交的交点是（）',
                options: [
                    { key: 'A', value: '直线上任意点' },
                    { key: 'B', value: '平面上任意点' },
                    { key: 'C', value: '直线与平面的共有点' },
                    { key: 'D', value: '投影重影点' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：交点是直线和平面共有的点。'
            },
            {
                id: 'q2_6_4',
                type: 'single',
                question: '两平面相交，其交线是（）',
                options: [
                    { key: 'A', value: '一条曲线' },
                    { key: 'B', value: '一条直线' },
                    { key: 'C', value: '一个点' },
                    { key: 'D', value: '一个平面' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：两平面相交，交线一定是直线。'
            },
            {
                id: 'q2_6_5',
                type: 'single',
                question: '直线垂直于平面，则该直线垂直于平面内（）',
                options: [
                    { key: 'A', value: '一条直线' },
                    { key: 'B', value: '两条相交直线' },
                    { key: 'C', value: '所有直线' },
                    { key: 'D', value: '水平线' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：线⊥面，则直线垂直平面内所有直线。'
            },
            {
                id: 'q2_6_6',
                type: 'single',
                question: '求点到平面的距离，需要作出点到平面的（）',
                options: [
                    { key: 'A', value: '平行线' },
                    { key: 'B', value: '斜线' },
                    { key: 'C', value: '垂线' },
                    { key: 'D', value: '水平线' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：点到平面的距离就是垂线的实长。'
            },
            {
                id: 'q2_6_7',
                type: 'judge',
                question: '过平面外一点，只能作一条直线与该平面平行。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：过一点可以作无数条直线与平面平行。'
            },
            {
                id: 'q2_6_8',
                type: 'judge',
                question: '两个投影面垂直面互相平行，则它们的积聚性投影必互相平行。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：这是垂直面平行的直接判定依据。'
            },
            {
                id: 'q2_6_9',
                type: 'judge',
                question: '直线与平面的交点，是可见与不可见的分界点。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：交点是分界点，一侧可见、一侧不可见。'
            },
            {
                id: 'q2_6_10',
                type: 'judge',
                question: '若直线垂直于一平面，则包含此直线的所有平面都垂直于该平面。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：这是面面垂直的判定定理。'
            },
            // ========== 2.7 换面法 ==========
            {
                id: 'q2_7_1',
                type: 'single',
                question: '换面法中，空间几何元素与投影面的变化方式是（）',
                options: [
                    { key: 'A', value: '物体不动，更换投影面' },
                    { key: 'B', value: '投影面不动，旋转物体' },
                    { key: 'C', value: '物体和投影面都不动' },
                    { key: 'D', value: '物体和投影面同时改变' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：换面法的核心是空间物体不动，替换投影面。'
            },
            {
                id: 'q2_7_2',
                type: 'single',
                question: '新投影面必须满足的基本条件是（）',
                options: [
                    { key: 'A', value: '平行于被保留的旧投影面' },
                    { key: 'B', value: '垂直于被保留的旧投影面' },
                    { key: 'C', value: '倾斜于被保留的旧投影面' },
                    { key: 'D', value: '可以任意设置' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：新投影面必须垂直于保留的投影面，形成直角体系。'
            },
            {
                id: 'q2_7_3',
                type: 'single',
                question: '点的一次换面中，新投影与不变投影的连线（）',
                options: [
                    { key: 'A', value: '平行于新投影轴' },
                    { key: 'B', value: '垂直于新投影轴' },
                    { key: 'C', value: '倾斜于新投影轴' },
                    { key: 'D', value: '方向随机' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：新投影与不变投影的连线垂直于新投影轴。'
            },
            {
                id: 'q2_7_4',
                type: 'single',
                question: '一般位置直线变换成投影面垂直线，需要换面（）',
                options: [
                    { key: 'A', value: '1次' },
                    { key: 'B', value: '2次' },
                    { key: 'C', value: '3次' },
                    { key: 'D', value: '不需要换面' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：一般位置→垂直线，必须两次换面。'
            },
            {
                id: 'q2_7_5',
                type: 'single',
                question: '用换面法求平面实形，应将平面变换为（）',
                options: [
                    { key: 'A', value: '投影面垂直面' },
                    { key: 'B', value: '投影面平行面' },
                    { key: 'C', value: '一般位置平面' },
                    { key: 'D', value: '任意位置平面' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：只有投影面平行面的投影反映实形。'
            },
            {
                id: 'q2_7_6',
                type: 'single',
                question: '将一般位置平面变换为投影面垂直面时，新轴应（）',
                options: [
                    { key: 'A', value: '垂直平面内投影面平行线的实长投影' },
                    { key: 'B', value: '平行平面内任意直线' },
                    { key: 'C', value: '垂直平面内任意直线' },
                    { key: 'D', value: '可以任意设置' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：新轴必须垂直平面内投影面平行线的实长投影。'
            },
            {
                id: 'q2_7_7',
                type: 'judge',
                question: '换面法一次可以同时更换V、H两个投影面。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：换面法每次只能更换一个投影面。'
            },
            {
                id: 'q2_7_8',
                type: 'judge',
                question: '点的新投影到新轴的距离等于被替换旧投影到旧轴的距离。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：这是换面法最核心的定量规律。'
            },
            {
                id: 'q2_7_9',
                type: 'judge',
                question: '投影面平行线变换为垂直线，只需一次换面。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：平行线→垂直线，一次换面即可。'
            },
            {
                id: 'q2_7_10',
                type: 'judge',
                question: '求点到平面的距离，应将平面变换为投影面垂直面。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：平面变为垂直面后，距离可直接量取。'
            },
            // ========== 3.1 平面立体的视图 ==========
            {
                id: 'q3_1_1',
                type: 'single',
                question: '下列几何体中，不属于平面立体的是（）',
                options: [
                    { key: 'A', value: '棱柱' },
                    { key: 'B', value: '棱锥' },
                    { key: 'C', value: '圆柱' },
                    { key: 'D', value: '四棱柱' }
                ],
                answer: 'C',    
                explanation: '参考答案：C<br>解析：圆柱表面包含曲面，属于曲面立体。'
            },
            {
                id: 'q3_1_2',
                type: 'single',
                question: '棱柱的侧棱线具有的特点是（）',
                options: [
                    { key: 'A', value: '交于一点' },
                    { key: 'B', value: '互相平行' },
                    { key: 'C', value: '互相垂直' },
                    { key: 'D', value: '无规律' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：棱柱的侧棱相互平行。'
            },
            {
                id: 'q3_1_3',
                type: 'single',
                question: '棱锥的侧棱线具有的特点是（）',
                options: [
                    { key: 'A', value: '互相平行' },
                    { key: 'B', value: '交于锥顶' },
                    { key: 'C', value: '互相垂直' },
                    { key: 'D', value: '全部积聚' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：棱锥的所有侧棱交于锥顶。'
            },
            {
                id: 'q3_1_4',
                type: 'single',
                question: '绘制平面立体的视图，实质是绘制其表面的（）',
                options: [
                    { key: 'A', value: '点和圆' },
                    { key: 'B', value: '点、直线、平面' },
                    { key: 'C', value: '曲线' },
                    { key: 'D', value: '中心线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：平面立体视图就是画点、线、面的投影。'
            },
            {
                id: 'q3_1_5',
                type: 'single',
                question: '六棱柱的俯视图反映实形的是（）',
                options: [
                    { key: 'A', value: '侧棱线' },
                    { key: 'B', value: '上下底面' },
                    { key: 'C', value: '侧棱' },
                    { key: 'D', value: '顶点' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：底面为水平面，俯视图反映实形。'
            },
            {
                id: 'q3_1_6',
                type: 'single',
                question: '平面立体不可见的轮廓线，在视图中应画成（）',
                options: [
                    { key: 'A', value: '粗实线' },
                    { key: 'B', value: '细虚线' },
                    { key: 'C', value: '细点画线' },
                    { key: 'D', value: '细实线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：不可见轮廓统一用细虚线绘制。'
            },
            {
                id: 'q3_1_7',
                type: 'judge',
                question: '平面立体的所有表面都是平面，不存在曲面。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：这是平面立体的定义。'
            },
            {
                id: 'q3_1_8',
                type: 'judge',
                question: '棱柱表面取点时，可利用棱面的积聚性直接求解。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：棱柱侧面多为垂直面，可用积聚性取点。'
            },
            {
                id: 'q3_1_9',
                type: 'judge',
                question: '棱锥的各个侧棱面投影都具有积聚性。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：棱锥部分侧面是一般位置平面，没有积聚性。'
            },
            {
                id: 'q3_1_10',
                type: 'judge',
                question: '绘制棱柱三视图时，通常先画出反映实形的俯视图。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：先画特征视图，再按三等规律画其余视图。'
            },
            // ========== 3.2 曲面立体 ==========
            {
                id: 'q3_2_1',
                type: 'single',
                question: '圆柱面的母线和轴线位置关系是（）',
                options: [
                    { key: 'A', value: '相交' },
                    { key: 'B', value: '平行' },
                    { key: 'C', value: '垂直' },
                    { key: 'D', value: '任意' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：圆柱母线平行回转轴线。'
            },
            {
                id: 'q3_2_2',
                type: 'single',
                question: '轴线垂直H面的圆柱，哪个视图圆柱面具有积聚性（）',
                options: [
                    { key: 'A', value: '主视图' },
                    { key: 'B', value: '俯视图' },
                    { key: 'C', value: '左视图' },
                    { key: 'D', value: '任意视图' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：俯视图为圆，整个圆柱面积聚在圆周上。'
            },
            {
                id: 'q3_2_3',
                type: 'single',
                question: '圆锥表面找点不能用积聚法，常用（）',
                options: [
                    { key: 'A', value: '素线法/辅助圆法' },
                    { key: 'B', value: '长对正法' },
                    { key: 'C', value: '重影法' },
                    { key: 'D', value: '宽相等法' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：圆锥面无积聚，素线、辅助圆两种标准作图方法。'
            },
            {
                id: 'q3_2_4',
                type: 'single',
                question: '圆球的三个视图形状为（）',
                options: [
                    { key: 'A', value: '三个矩形' },
                    { key: 'B', value: '三个全等圆' },
                    { key: 'C', value: '两个三角一个圆' },
                    { key: 'D', value: '同心圆' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：球体三视图均直径相同的圆形。'
            },
            {
                id: 'q3_2_5',
                type: 'single',
                question: '圆环可见外表面是（）',
                options: [
                    { key: 'A', value: '后半内环面' },
                    { key: 'B', value: '前半外环面' },
                    { key: 'C', value: '全部内环面' },
                    { key: 'D', value: '下半环面' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：由前向后投影，只有前侧外环面主视图可见。'
            },
            {
                id: 'q3_2_6',
                type: 'single',
                question: '轴线竖直放置的圆锥，主视图轮廓线是（）',
                options: [
                    { key: 'A', value: '最左最右素线' },
                    { key: 'B', value: '最前最后素线' },
                    { key: 'C', value: '水平圆' },
                    { key: 'D', value: '竖直直线' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：主视图等腰三角形两腰是左右转向素线。'
            },
            {
                id: 'q3_2_7',
                type: 'judge',
                question: '圆柱俯视图中，上底面可见，下底面不可见。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：从上向下投射，下底面被柱体遮挡不可见。'
            },
            {
                id: 'q3_2_8',
                type: 'judge',
                question: '圆锥俯视图中圆锥面投影为一个整圆，具有积聚性。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：圆锥面无积聚，只有底面反映实形。'
            },
            {
                id: 'q3_2_9',
                type: 'judge',
                question: '圆球表面求点只能使用辅助圆法。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：球面无素线、无积聚，仅辅助圆可用。'
            },
            {
                id: 'q3_2_10',
                type: 'judge',
                question: '圆环母线圆绕穿过自身圆心的轴线旋转依然形成圆环。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：轴线过圆心回转生成圆球，不是圆环。'
            },

            // ========== 4.1 截交线 ==========
            {
                id: 'q4_1_1',
                type: 'single',
                question: '截交线的几何特征是（）',
                options: [
                    { key: 'A', value: '开放曲线' },
                    { key: 'B', value: '封闭平面图形' },
                    { key: 'C', value: '空间折线' },
                    { key: 'D', value: '任意曲线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：截交线一定是封闭的平面图形。'
            },
            {
                id: 'q4_1_2',
                type: 'single',
                question: '截平面垂直圆柱轴线，圆柱截交线形状为（）',
                options: [
                    { key: 'A', value: '椭圆' },
                    { key: 'B', value: '矩形' },
                    { key: 'C', value: '圆形' },
                    { key: 'D', value: '双曲线' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：截平面垂直圆柱轴线，截交是整圆。'
            },
            {
                id: 'q4_1_3',
                type: 'single',
                question: '截平面平行圆锥轴线，截交线为（）',
                options: [
                    { key: 'A', value: '圆' },
                    { key: 'B', value: '双曲线' },
                    { key: 'C', value: '抛物线' },
                    { key: 'D', value: '椭圆' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：平行轴线切割圆锥，截交线是双曲线。'
            },
            {
                id: 'q4_1_4',
                type: 'single',
                question: '任意平面截切圆球，截交线实际形状是（）',
                options: [
                    { key: 'A', value: '椭圆' },
                    { key: 'B', value: '圆' },
                    { key: 'C', value: '抛物线' },
                    { key: 'D', value: '双曲线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：无论怎么切球体，截交空间形状永远是圆，投影可成椭圆。'
            },
            {
                id: 'q4_1_5',
                type: 'single',
                question: '平面立体截交线的顶点是（）',
                options: [
                    { key: 'A', value: '棱线与截平面交点' },
                    { key: 'B', value: '面中心' },
                    { key: 'C', value: '任意点' },
                    { key: 'D', value: '轴线端点' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：截交线顶点 = 截平面和棱线相交的点。'
            },
            {
                id: 'q4_1_6',
                type: 'single',
                question: '正垂面斜切圆柱，哪个视图上截交线积聚成直线（）',
                options: [
                    { key: 'A', value: '主视图' },
                    { key: 'B', value: '俯视图' },
                    { key: 'C', value: '左视图' },
                    { key: 'D', value: '全部' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：正垂面在主视图积聚，截交线主视投影积聚成直线。'
            },
            {
                id: 'q4_1_7',
                type: 'judge',
                question: '截交线是截平面与立体表面的共有线。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：共有性是截交线核心定义。'
            },
            {
                id: 'q4_1_8',
                type: 'judge',
                question: '截平面平行圆柱轴线时，截交线是椭圆。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：平行轴线截圆柱，截交为矩形。'
            },
            {
                id: 'q4_1_9',
                type: 'judge',
                question: '过锥顶的平面切割圆锥，截交线为三角形。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：切面过锥顶，交两条素线，构成等腰三角形。'
            },
            {
                id: 'q4_1_10',
                type: 'judge',
                question: '圆球被倾斜平面切割，空间截交线是椭圆。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：空间截交永远是圆，投影才是椭圆。'
            },

            // ========== 4.2 相贯线 ==========
            {
                id: 'q4_2_1',
                type: 'single',
                question: '相贯线的形成原因是（）',
                options: [
                    { key: 'A', value: '平面切割立体' },
                    { key: 'B', value: '两立体相互相交' },
                    { key: 'C', value: '立体自身棱线' },
                    { key: 'D', value: '平面与投影面相交' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：平面切割产生截交，两立体穿插产生相贯线。'
            },
            {
                id: 'q4_2_2',
                type: 'single',
                question: '不等径正交圆柱，相贯线向（）轴线凸出',
                options: [
                    { key: 'A', value: '小圆柱' },
                    { key: 'B', value: '大圆柱' },
                    { key: 'C', value: '一样大' },
                    { key: 'D', value: '无固定方向' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：口诀小骑大，相贯弯向大圆柱轴线。'
            },
            {
                id: 'q4_2_3',
                type: 'single',
                question: '绘制相贯线的实质是求两立体表面的（）',
                options: [
                    { key: 'A', value: '最高点' },
                    { key: 'B', value: '最低点' },
                    { key: 'C', value: '共有点' },
                    { key: 'D', value: '重影点' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：相贯由无数共有点依次连接而成。'
            },
            {
                id: 'q4_2_4',
                type: 'single',
                question: '等直径轴线正交两圆柱，相贯线空间形状为（）',
                options: [
                    { key: 'A', value: '空间曲线' },
                    { key: 'B', value: '相交直线' },
                    { key: 'C', value: '圆' },
                    { key: 'D', value: '椭圆' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：等径正交为特殊相贯，相贯变成直线。'
            },
            {
                id: 'q4_2_5',
                type: 'single',
                question: '圆柱轴线垂直水平面，优先采用（）画相贯线',
                options: [
                    { key: 'A', value: '辅助平面法' },
                    { key: 'B', value: '积聚性法' },
                    { key: 'C', value: '徒手绘图' },
                    { key: 'D', value: '辅助球面法' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：圆柱俯视图积聚成圆，适用积聚定点法。'
            },
            {
                id: 'q4_2_6',
                type: 'single',
                question: '选用辅助平面，优先保证截交投影是（）',
                options: [
                    { key: 'A', value: '椭圆' },
                    { key: 'B', value: '直线或圆' },
                    { key: 'C', value: '双曲线' },
                    { key: 'D', value: '任意曲线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：直线、圆绘图最简单，是优选条件。'
            },
            {
                id: 'q4_2_7',
                type: 'judge',
                question: '所有两曲面立体相贯，相贯线都是封闭空间曲线。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：等径正交等特殊情况可变成直线。'
            },
            {
                id: 'q4_2_8',
                type: 'judge',
                question: '只有同时处于两个立体可见面上的相贯线才画粗实线。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：单面不可见位置线段画虚线。'
            },
            {
                id: 'q4_2_9',
                type: 'judge',
                question: '外圆柱和内圆柱孔相交不会产生相贯线。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：内外表面相交同样存在相贯线。'
            },
            {
                id: 'q4_2_10',
                type: 'judge',
                question: '两回转体均无积聚投影时，常用辅助平面法作图。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：无积聚不能用积聚法，选用辅助平面三面共点法。'
            },

            // ========== 5.1 组合体的形体分析 ==========
            {
                id: 'q5_1_1',
                type: 'single',
                question: '拆分复杂机件为若干基本体的方法称为（）',
                options: [
                    { key: 'A', value: '线面分析法' },
                    { key: 'B', value: '形体分析法' },
                    { key: 'C', value: '换面法' },
                    { key: 'D', value: '投影法' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：形体分析法定义就是拆分组合为基本几何体。'    
            },
            {
                id: 'q5_1_2',
                type: 'single',
                question: '两个形体拼接表面平齐共面，结合处（）',
                options: [
                    { key: 'A', value: '画粗实线' },
                    { key: 'B', value: '不画线' },
                    { key: 'C', value: '画虚线' },
                    { key: 'D', value: '任意绘制' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：共面平齐，无分界棱，中间不画线。'
            },
            {
                id: 'q5_1_3',
                type: 'single',
                question: '形体表面相切时，相切位置轮廓线（）',
                options: [
                    { key: 'A', value: '需要画出' },
                    { key: 'B', value: '不用画出' },
                    { key: 'C', value: '画虚线' },
                    { key: 'D', value: '画细点画线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：相切光滑过渡，无棱线，切线省略不画。'
            },
            {
                id: 'q5_1_4',
                type: 'single',
                question: '两立体表面相交，相交位置（）',
                options: [
                    { key: 'A', value: '必须画出交线' },
                    { key: 'B', value: '不画线' },
                    { key: 'C', value: '可画可不画' },
                    { key: 'D', value: '只画虚线' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：相交产生相贯线，必须绘图表达。'      
            },
            {
                id: 'q5_1_5',
                type: 'single',
                question: '阶梯轴类零件大多属于（）组合形式',
                options: [
                    { key: 'A', value: '截切' },
                    { key: 'B', value: '同轴叠加' },
                    { key: 'C', value: '相交' },
                    { key: 'D', value: '开槽' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：阶梯轴多个圆柱共用轴线，同轴叠加成型。'
            },
            {
                id: 'q5_1_6',
                type: 'single',
                question: '方块中间开通槽属于哪种成型方式（）',
                options: [
                    { key: 'A', value: '叠加' },
                    { key: 'B', value: '相交' },
                    { key: 'C', value: '截切' },
                    { key: 'D', value: '相切' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：在完整实体上切除材料，属于截切组合。'
            },
            {
                id: 'q5_1_7',
                type: 'judge',
                question: '组合体只能由单一叠加方式组成。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：多数组合体是叠加、截切、相交混合构成。'
            },
            {
                id: 'q5_1_8',
                type: 'judge',
                question: '两形体表面不平齐，结合位置需要画出分界线。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：表面错位存在棱边，必须画线区分。'
            },
            {
                id: 'q5_1_9',
                type: 'judge',
                question: '曲面与平面相切，相切处要画出切线。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：相切无轮廓，切线省略不画。'
            },
            {
                id: 'q5_1_10',
                type: 'judge',
                question: '两立体相交，相交部位必须画出相贯线。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：相交产生表面交线，制图规范要求画出。'
            },

            // ========== 5.2 组合体的画图方法 ==========
            {
                id: 'q5_2_1',
                type: 'single',
                question: '组合体画图与读图的核心分析方法中，通过分解基本形体来简化问题的方法是（）',
                options: [
                    { key: 'A', value: '线面分析法' },
                    { key: 'B', value: '形体分析法' },
                    { key: 'C', value: '公差分析法' },
                    { key: 'D', value: '基准分析法' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：形体分析法是组合体画图、读图的核心方法，指假想将组合体分解为若干基本形体，确定它们的组合形式与相邻表面的位置关系，再分别绘制投影，实现化繁为简。'
            },
            {
                id: 'q5_2_2',
                type: 'single',
                question: '选择组合体主视图的首要核心原则是（）',
                options: [
                    { key: 'A', value: '虚线数量最多' },
                    { key: 'B', value: '形状特征最显著、信息量最大' },
                    { key: 'C', value: '物体倾斜放置' },
                    { key: 'D', value: '视图数量最少' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：形体特征原则是主视图选择的第一原则，应选取最能反映组合体各部分形状与相对位置、包含信息量最大的投射方向，作为主视图方向。'
            },
            {
                id: 'q5_2_3',
                type: 'single',
                question: '绘制组合体三视图的正确步骤顺序是（）',
                options: [
                    { key: 'A', value: '画基准线→选比例图幅→画外部形状→画内部细节→检查加深' },
                    { key: 'B', value: '选比例图幅→画基准线→画外部形状→画内部细节→检查加深' },
                    { key: 'C', value: '画外部形状→画内部细节→画基准线→选比例图幅→检查加深' },
                    { key: 'D', value: '检查加深→画基准线→选比例图幅→画外部形状→画内部细节' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：组合体标准画图步骤为：①选择画图比例与图幅大小，绘制图框和标题栏；②画出长、宽、高三个方向的作图定位基准线；③绘制各组成部分的外部形状；④绘制内部结构与细节形状；⑤检查、清理并描深图线。'
            },
            {
                id: 'q5_2_4',
                type: 'single',
                question: '线面分析法的核心逻辑中，视图里的封闭线框一般对应（）',
                options: [
                    { key: 'A', value: '物体上一个面的投影' },
                    { key: 'B', value: '物体上一条棱线的投影' },
                    { key: 'C', value: '物体上一个顶点的投影' },
                    { key: 'D', value: '物体上一条曲线的投影' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：线面分析法指出，视图上的一个封闭线框，一般情况下代表一个面的投影；不同线框之间的关系，反映了物体表面的变化。'
            },
            {
                id: 'q5_2_5',
                type: 'single',
                question: '下列关于主视图选择的要求，表述错误的是（）',
                options: [
                    { key: 'A', value: '应使组合体摆正、平稳放置' },
                    { key: 'B', value: '应尽量减少视图中的虚线' },
                    { key: 'C', value: '应优先选择形状特征最显著的方向' },
                    { key: 'D', value: '应尽可能多用虚线表达内部结构' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：主视图选择的三项原则为形状特征原则、虚线尽量少、摆平放稳；绘图时应尽量避免用虚线表达结构，而非多用虚线。'
            },
            {
                id: 'q5_2_6',
                type: 'single',
                question: '以轴承座为例，下列不属于其自身组成结构的是（）',
                options: [
                    { key: 'A', value: '底板' },
                    { key: 'B', value: '肋板' },
                    { key: 'C', value: '空心圆筒' },
                    { key: 'D', value: '螺纹紧固件' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：轴承座这类典型组合体由底板、支撑板、肋板、空心圆筒、凸台等结构组成；螺纹紧固件属于装配零件，不属于轴承座自身的组成部分。'
            },
            {
                id: 'q5_2_7',
                type: 'judge',
                question: '选择主视图时，形状特征越显著的投射方向，越适合作为主视图方向。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：根据主视图选择的形体特征原则，最能反映组合体形状特征、包含信息量最大的视图，最适合作为主视图。'
            },
            {
                id: 'q5_2_8',
                type: 'judge',
                question: '绘制组合体三视图时，应当三个视图同步绘制，保证投影对应关系准确。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：画组合体视图应尽可能做到三个视图同时画，这样可以随时核对"长对正、高平齐、宽相等"的投影规律，避免出现投影错误。'
            },
            {
                id: 'q5_2_9',
                type: 'judge',
                question: '形体分析法仅适用于组合体读图，不能用于指导画图。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：形体分析法是组合体画图与读图通用的核心方法，画图时通过分解形体、逐个绘制的思路，可以大幅降低复杂组合体的绘图难度。'
            },
            {
                id: 'q5_2_10',
                type: 'judge',
                question: '主视图的摆放可以随意倾斜，不需要考虑物体的放置稳定性。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：摆平放稳是主视图选择的基本原则之一，应使组合体处于摆正、平稳放置的状态，符合物体的自然使用与观察习惯。'
            },

            // ========== 5.3 组合体的尺寸标注方法 ==========
            {
                id: 'q5_3_1',
                type: 'single',
                question: '不属于组合尺寸四项要求的是（）',
                options: [
                    { key: 'A', value: '正确' },
                    { key: 'B', value: '完整' },
                    { key: 'C', value: '美观' },
                    { key: 'D', value: '合理' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：四项：正确、完整、清晰、合理，无美观。'
            },
            {
                id: 'q5_3_2',
                type: 'single',
                question: '用来确定几何体大小的尺寸是（）',
                options: [
                    { key: 'A', value: '定形尺寸' },
                    { key: 'B', value: '定位尺寸' },
                    { key: 'C', value: '总体尺寸' },
                    { key: 'D', value: '基准尺寸' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：定形尺寸决定形体自身大小。'
            },
            {
                id: 'q5_3_3',
                type: 'single',
                question: '切割零件不能在（）标注尺寸',
                options: [
                    { key: 'A', value: '基准' },
                    { key: 'B', value: '原始轮廓' },
                    { key: 'C', value: '截交线' },
                    { key: 'D', value: '端面' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：截交线由切割位置自然形成，不许直接标尺寸。'
            },
            {
                id: 'q5_3_4',
                type: 'single',
                question: '两形体相贯，尺寸不能标注在（）',
                options: [
                    { key: 'A', value: '轴线' },
                    { key: 'B', value: '端面' },
                    { key: 'C', value: '相贯线' },
                    { key: 'D', value: '底板边缘' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：相贯线由形体尺寸决定，相贯线上不注尺寸。'
            },
            {
                id: 'q5_3_5',
                type: 'single',
                question: '平行尺寸布置原则（）',
                options: [
                    { key: 'A', value: '小在外大在内' },
                    { key: 'B', value: '小在内大在外' },
                    { key: 'C', value: '随便排布' },
                    { key: 'D', value: '集中在视图中间' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：小尺寸贴近图形，大尺寸往外布置。'
            },
            {
                id: 'q5_3_6',
                type: 'single',
                question: '回转结构的组合体，对应方向不再标注（）',
                options: [
                    { key: 'A', value: '定形' },
                    { key: 'B', value: '定位' },
                    { key: 'C', value: '总体' },
                    { key: 'D', value: '孔径' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：带圆弧回转，省去该方向总体尺寸。'    
            },
            {
                id: 'q5_3_7',
                type: 'judge',
                question: '长宽高三个方向都必须选定尺寸基准。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：三个方向各设一处基准。'
            },
            {
                id: 'q5_3_8',
                type: 'judge',
                question: '同轴圆柱直径优先标注在圆形视图上。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：直径尽量标在非圆视图。'
            },
            {
                id: 'q5_3_9',
                type: 'judge',
                question: '同一零件尺寸尽量集中在特征视图上。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：便于读图查找尺寸。'
            },
            {
                id: 'q5_3_10',
                type: 'judge',
                question: '标注尺寸可以大量标注在虚线上。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：尽量避免虚线标注尺寸。'
            },

            // ========== 5.4 组合体的读图 ==========
            {
                id: 'q5_4_1',
                type: 'single',
                question: '细点画线不能用来绘制（）',
                options: [
                    { key: 'A', value: '中心线' },
                    { key: 'B', value: '轴线' },
                    { key: 'C', value: '对称线' },
                    { key: 'D', value: '回转轮廓线' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：回转轮廓用粗实线，点画线只做轴线、对称线。'   
            },
            {
                id: 'q5_4_2',
                type: 'single',
                question: '视图内线框互相嵌套一般表示（）',
                options: [
                    { key: 'A', value: '表面平齐' },
                    { key: 'B', value: '有孔洞或凹凸' },
                    { key: 'C', value: '两表面共面' },
                    { key: 'D', value: '形体相切' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：套线代表内部开孔或者形体高低凹凸。'
            },
            {
                id: 'q5_4_3',
                type: 'single',
                question: '叠加式组合体读图首选方法（）',
                options: [
                    { key: 'A', value: '线面分析法' },
                    { key: 'B', value: '形体分析法' },
                    { key: 'C', value: '换面法' },
                    { key: 'D', value: '积聚法' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：形体分析法专门用于叠加零件读图。'   
            },
            {
                id: 'q5_4_4',
                type: 'single',
                question: '切割类组合体读图主要用（）',
                options: [
                    { key: 'A', value: '形体分析法' },
                    { key: 'B', value: '线面分析法' },
                    { key: 'C', value: '尺寸分析法' },
                    { key: 'D', value: '目测法' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：切割零件靠线、面投影分析，选用线面分析法。'
            },
            {
                id: 'q5_4_5',
                type: 'single',
                question: '相邻封闭线框代表两表面（）',
                options: [
                    { key: 'A', value: '共面平齐' },
                    { key: 'B', value: '高低错开或相交' },
                    { key: 'C', value: '完全重合' },
                    { key: 'D', value: '相切无棱' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：同平面不会产生分隔线框，相邻必位置错开。'
            },
            {
                id: 'q5_4_6',
                type: 'single',
                question: '读图分析优先选取（）',
                options: [
                    { key: 'A', value: '尺寸最多视图' },
                    { key: 'B', value: '特征视图' },    
                    { key: 'C', value: '左视图' },
                    { key: 'D', value: '俯视图' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：特征视图最能体现零件构造，作为读图突破口。'
            },
            {
                id: 'q5_4_7',
                type: 'judge',
                question: '仅凭一个视图就可以准确确定组合体完整形状。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：单一视图无法确定长宽高，必须三视图配合。'
            },
            {
                id: 'q5_4_8',
                type: 'judge',
                question: '形体相切位置在视图中不用画出切线。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：相切光滑过渡，无轮廓线。'
            },
            {
                id: 'q5_4_9',
                type: 'judge',
                question: '线面分析法依靠实形、积聚、类似性判断表面。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：三大投影特性是线面分析理论依据。'
            },
            {
                id: 'q5_4_10',
                type: 'judge',
                question: '线框相邻代表两个表面完全平齐共面。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：平齐无分界线，不会出现相邻线框。'
            },

            // ========== 6.1 轴测投影的概�?==========
            {
                id: 'q6_1_1',
                type: 'single',
                question: '正轴测图的投射线与轴测投影面关系是（）',
                options: [
                    { key: 'A', value: '垂直' },
                    { key: 'B', value: '倾斜' },
                    { key: 'C', value: '平行' },
                    { key: 'D', value: '任意' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：正轴测投射线垂直投影面，斜轴投射线倾斜投影面。'
            },
            {
                id: 'q6_1_2',
                type: 'single',
                question: '斜轴测形成时，物体摆放状态是（）',
                options: [
                    { key: 'A', value: '三面全倾斜' },
                    { key: 'B', value: '正面平行投影面' },
                    { key: 'C', value: '竖直倾斜' },
                    { key: 'D', value: '任意摆放' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：斜轴物体正放，一个坐标面平行轴测投影面。'
            },
            {
                id: 'q6_1_3',
                type: 'single',
                question: '空间平行线的轴测投影（）',
                options: [
                    { key: 'A', value: '相交' },
                    { key: 'B', value: '依旧平行' },
                    { key: 'C', value: '任意歪斜' },
                    { key: 'D', value: '积聚' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：平行性是轴测固有性质。'
            },
            {
                id: 'q6_1_4',
                type: 'single',
                question: '正等轴测的伸缩系数关系是（）',
                options: [
                    { key: 'A', value: 'p=q=r' },
                    { key: 'B', value: 'p=r≠q' },
                    { key: 'C', value: 'p≠q≠r' },
                    { key: 'D', value: 'p=q≠r' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：正等三轴系数完全相等。'
            },
            {
                id: 'q6_1_5',
                type: 'single',
                question: '轴测图中，能够直接测量长度的线段要求（）',
                options: [
                    { key: 'A', value: '平行坐标轴' },
                    { key: 'B', value: '任意斜线' },
                    { key: 'C', value: '轮廓线' },
                    { key: 'D', value: '任意边线' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：只有平行轴测轴（原坐标轴）才可轴向量尺寸。'
            },
            {
                id: 'q6_1_6',
                type: 'single',
                question: '工程常用斜二轴测系数关系（）',
                options: [
                    { key: 'A', value: 'p=r≠q' },
                    { key: 'B', value: 'p=q=r' },
                    { key: 'C', value: '全不相等' },
                    { key: 'D', value: 'p=q≠r' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：斜二X、Z系数相等，Y不同。'
            },
            {
                id: 'q6_1_7',
                type: 'judge',
                question: '轴测投影属于平行投影。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：轴测统一采用平行投影法绘制。'
            },
            {
                id: 'q6_1_8',
                type: 'judge',
                question: '斜线可以在轴测图上直接丈量实际长度。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：只有平行轴的线段可量，斜线不能直接量取。'
            },
            {
                id: 'q6_1_9',
                type: 'judge',
                question: '正轴测是改变物体方位，投射方向垂直投影面。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：正轴形成条件。'
            },
            {
                id: 'q6_1_10',
                type: 'judge',
                question: '斜轴测需要把物体三个面全部倾斜摆放。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：斜轴物体保持正放，只倾斜投射线。'
            },

            // ========== 6.2 正等轴测图 ==========
            {
                id: 'q6_2_1',
                type: 'single',
                question: '正等轴测三个轴间角度数均为（）',
                options: [
                    { key: 'A', value: '90°' },
                    { key: 'B', value: '120°' },
                    { key: 'C', value: '135°' },
                    { key: 'D', value: '60°' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：正等轴各轴间角统一120°。'
            },
            {
                id: 'q6_2_2',
                type: 'single',
                question: '正等轴测简化轴向伸缩系数是（）',
                options: [
                    { key: 'A', value: '0.82' },
                    { key: 'B', value: '1' },
                    { key: 'C', value: '0.5' },
                    { key: 'D', value: '1.2' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：工程绘图简化系数p=q=r=1。'
            },
            {
                id: 'q6_2_3',
                type: 'single',
                question: '平行坐标轴的线段在简化正等测中（）',
                options: [
                    { key: 'A', value: '缩短' },
                    { key: 'B', value: '放大' },
                    { key: 'C', value: '实长' },
                    { key: 'D', value: '无规律' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：系数取1，直接量取原尺寸。'
            },
            {
                id: 'q6_2_4',
                type: 'single',
                question: '平行H面的圆，正等椭圆长轴垂直（）',
                options: [
                    { key: 'A', value: 'X轴' },
                    { key: 'B', value: 'Y轴' },
                    { key: 'C', value: 'Z轴' },
                    { key: 'D', value: '任意' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：H面椭圆长轴⊥Z轴。'
            },
            {
                id: 'q6_2_5',
                type: 'single',
                question: '绘制棱锥正等测优先选用（）',
                options: [
                    { key: 'A', value: '坐标法' },
                    { key: 'B', value: '切割法' },
                    { key: 'C', value: '叠加法' },
                    { key: 'D', value: '四心法' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：棱锥定点绘图用坐标法。'
            },
            {
                id: 'q6_2_6',
                type: 'single',
                question: '长方体开槽零件正等测常用（）',
                options: [
                    { key: 'A', value: '坐标' },
                    { key: 'B', value: '切割' },
                    { key: 'C', value: '叠加' },
                    { key: 'D', value: '椭圆形' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：整体切块用切割画法。'
            },
            {
                id: 'q6_2_7',
                type: 'judge',
                question: '正等轴测理论伸缩系数为0.82。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：理伸缩系数为0.82，绘图简化取1。'
            },
            {
                id: 'q6_2_8',
                type: 'judge',
                question: '正等测所有圆投影都是椭圆，用四心菱形画法。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：正等轴测图中，平行于坐标面的圆，其投影均为椭圆；绘制该类椭圆常用四心菱形近似画法。'
            },
            {
                id: 'q6_2_9',
                type: 'judge',
                question: '正等测Z轴永远竖直摆放。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：国家标准规定，正等轴测图的Z轴方向竖直向上，OX、OY轴与水平方向各成30°角。'
            },
            {
                id: 'q6_2_10',
                type: 'judge',
                question: '空间斜线可以直接在正等测量取实际尺寸。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：只有平行三轴的线段才能量取实际尺寸。'
            },
            // ========== 6.3 斜二测图的画�?==========
            {
                id: 'q6_3_1',
                type: 'single',
                question: '斜二测中X、Z 轴向伸缩系数为（）',
                options: [
                    { key: 'A', value: 'p=r=1' },
                    { key: 'B', value: 'p=r=0.5' },
                    { key: 'C', value: 'p=1,r=0.82' },
                    { key: 'D', value: 'p=r=1.2' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：斜二测 p=r=1，Y 轴 q=0.5。'
            },
            {
                id: 'q6_3_2',
                type: 'single',
                question: '斜二测中∠XOZ 轴间角为（）',
                options: [
                    { key: 'A', value: '120°' },
                    { key: 'B', value: '90°' },
                    { key: 'C', value: '135°' },
                    { key: 'D', value: '60°' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：X 轴水平，Z 竖直，夹角固定为90°。'
            },
            {
                id: 'q6_3_3',
                type: 'single',
                question: '斜二测中Y轴伸缩系数是（）',
                options: [
                    { key: 'A', value: '1' },
                    { key: 'B', value: '0.5' },
                    { key: 'C', value: '0.82' },
                    { key: 'D', value: '1.5' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：Y 向尺寸取原长一半。'
            },
            {
                id: 'q6_3_4',
                type: 'single',
                question: '平行�?XOZ 面的圆，斜二测绘制为（）',
                options: [
                    { key: 'A', value: '整圆' },
                    { key: 'B', value: '椭圆' },
                    { key: 'C', value: '菱形' },
                    { key: 'D', value: '直线' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：正面图形实形不变，圆仍画圆。'
            },
            {
                id: 'q6_3_5',
                type: 'single',
                question: '适合选用斜二测的零件是（）',
                options: [
                    { key: 'A', value: '三向都带圆孔' },
                    { key: 'B', value: '单面大量圆弧' },
                    { key: 'C', value: '全方体零件' },   
                    { key: 'D', value: '圆球' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：圆弧集中在一个端面优先斜二测。'
            },
            {
                id: 'q6_3_6',
                type: 'single',
                question: '斜二测中OY 轴与 OX 夹角常用（）',
                options: [
                    { key: 'A', value: '90°' },
                    { key: 'B', value: '135°' },
                    { key: 'C', value: '120°' },
                    { key: 'D', value: '45°' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：标准斜二测 Y 轴与 OX 夹角常用135°。'
            },
            {
                id: 'q6_3_7',
                type: 'judge',
                question: '斜二测中Y 方向尺寸画图时取原图一半。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：q=0.5，Y 向减半。'
            },
            {
                id: 'q6_3_8',
                type: 'judge',
                question: '平行 H 面的圆在斜二测中画整圆。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：平行 XOY 的圆斜二测为椭圆。'
            },
            {
                id: 'q6_3_9',
                type: 'judge',
                question: '斜二测正面投影保持实形是其突出优点。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：XOZ 面图形不变形。'
            },
            {
                id: 'q6_3_10',
                type: 'judge',
                question: '三轴系数全部相等的是斜二测。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：p=r≠q，不相等。'
            },

            // ========== 7.1 视图 ==========
            {
                id: 'q7_1_1',
                type: 'single',
                question: '高平齐对应的视图组合是（）',
                options: [
                    { key: 'A', value: '主、左、右、后' },
                    { key: 'B', value: '主、俯、仰、右' },
                    { key: 'C', value: '俯左仰右' },
                    { key: 'D', value: '主俯仰后' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：主、左、右、后视图满足高平齐原则。'
            },
            {
                id: 'q7_1_2',
                type: 'single',
                question: '不按规范摆放的基本视图称为（）',
                options: [
                    { key: 'A', value: '局部视图' },
                    { key: 'B', value: '向视图' },
                    { key: 'C', value: '斜视图' },
                    { key: 'D', value: '基本视图' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：移位视图用向视图标注。'
            },
            {
                id: 'q7_1_3',
                type: 'single',
                question: '局部视图断裂边界常用（）',
                options: [
                    { key: 'A', value: '粗实线' },
                    { key: 'B', value: '细虚线' },
                    { key: 'C', value: '波浪线' },
                    { key: 'D', value: '细点画线' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：局部视图分界为波浪线，封闭结构可省略。'
            },
            {
                id: 'q7_1_4',
                type: 'single',
                question: '机件倾斜表面求实形选用（）',
                options: [
                    { key: 'A', value: '基本视图' },
                    { key: 'B', value: '局部视图' },
                    { key: 'C', value: '斜视图' },
                    { key: 'D', value: '向视图' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：斜视图专门表达倾斜面实形。'
            },
            {
                id: 'q7_1_5',
                type: 'single',
                question: '六个基本视图标准布置时（）标注名称',
                options: [
                    { key: 'A', value: '必须' },
                    { key: 'B', value: '不用' },
                    { key: 'C', value: '随意' },
                    { key: 'D', value: '局部标注' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：规范摆放省略视图标注名称。'
            },
            {
                id: 'q7_1_6',
                type: 'single',
                question: '局部结构外形封闭完整，局部视图（）波浪线',
                options: [
                    { key: 'A', value: '必须画' },
                    { key: 'B', value: '可省略' },
                    { key: 'C', value: '加粗' },
                    { key: 'D', value: '改用虚线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：轮廓闭合不用画断裂波浪线。'
            },
            {
                id: 'q7_1_7',
                type: 'judge',
                question: '主、俯、仰、后四个视图满足长对正。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：根据三视图投影规律，主、俯、仰、后视图在长度方向上尺寸对应，符合长对正原则。'
            },
            {
                id: 'q7_1_8',
                type: 'judge',
                question: '斜视图不可以旋转摆放。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：国标允许旋转，加旋转符号即可。'
            },
            {
                id: 'q7_1_9',
                type: 'judge',
                question: '向视图需要标注投射箭头和字母。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：向视图是移位配置的基本视图，必须标注投射方向箭头和大写字母，以便读图对应。'
            },
            {
                id: 'q7_1_10',
                type: 'judge',
                question: '局部视图需要完整画出整个机件外形。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：只画需要表达的局部结构。'
            },

            // ========== 7.2 剖视图 ==========
            {
                id: 'q7_2_1',
                type: 'single',
                question: '国标规定，金属材料的剖面线一般绘制为与水平线成（）的等距细实线。',
                options: [
                    { key: 'A', value: '30°' },
                    { key: 'B', value: '45°' },
                    { key: 'C', value: '60°' },
                    { key: 'D', value: '90°' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：机械制图国标明确，金属材料剖面线采用45° 等距细实线，倾斜方向左右均可。'
            },
            {
                id: 'q7_2_2',
                type: 'single',
                question: '全剖视图主要适用于下列哪种机件（）',
                options: [
                    { key: 'A', value: '内外结构都复杂的对称机件' },
                    { key: 'B', value: '外形简单、内部复杂的不对称机件' },
                    { key: 'C', value: '仅存在局部小孔的实心零件' },
                    { key: 'D', value: '带有倾斜表面的机件' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：全剖会去除外部轮廓，适合外形简单、内部结构复杂的不对称机件。'
            },
            {
                id: 'q7_2_3',
                type: 'single',
                question: '半剖视图中，外形与剖视部分的分界线是（）',
                options: [
                    { key: 'A', value: '粗实线' },
                    { key: 'B', value: '细虚线' },
                    { key: 'C', value: '细点画线' },
                    { key: 'D', value: '波浪线' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：半剖以机件对称中心线（细点画线）为界，禁止使用轮廓线作为分界线。'
            },
            {
                id: 'q7_2_4',
                type: 'single',
                question: '局部剖视图中，剖切区域与外形区域的分界线是（）',
                options: [
                    { key: 'A', value: '细点画线' },
                    { key: 'B', value: '波浪线' },
                    { key: 'C', value: '粗实线' },
                    { key: 'D', value: '细虚线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：局部剖视图依靠波浪线划分剖切区域与外部外形区域。'
            },
            {
                id: 'q7_2_5',
                type: 'single',
                question: '下列关于局部剖视图波浪线的说法，正确的是（）',
                options: [
                    { key: 'A', value: '可以超出机件轮廓线' },
                    { key: 'B', value: '可以穿过空心孔洞' },
                    { key: 'C', value: '不能与其他图线重合' },
                    { key: 'D', value: '可用轮廓线代替波浪线' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：波浪线仅绘制在机件实体上，不可出轮廓、不可穿空、不可与其他图线重合。'
            },
            {
                id: 'q7_2_6',
                type: 'single',
                question: '剖视图的剖切属于假想操作，因此机件其余视图应（）',
                options: [
                    { key: 'A', value: '同步做剖切处理' },
                    { key: 'B', value: '按完整形体绘制' },
                    { key: 'C', value: '全部省略轮廓线' },
                    { key: 'D', value: '只绘制内部结构' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：剖切仅针对当前剖视图，机件本身完整，其余视图必须按完整形态绘制。'
            },
            {
                id: 'q7_2_7',
                type: 'judge',
                question: '剖视图中已经表达清楚的内部结构，在其他视图上对应的虚线可以省略。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：为简化图样、方便读图，已表达的内部结构无需重复绘制虚线。'
            },
            {
                id: 'q7_2_8',
                type: 'judge',
                question: '半剖视图可以同时表达机件的外部形状和内部结构。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：半剖一半画外形、一半画剖视，是对称机件内外兼顾的最优画法。'
            },
            {
                id: 'q7_2_9',
                type: 'judge',
                question: '当机件轮廓线与对称中心线重合时，依然可以使用半剖视图。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：轮廓线与中心线重合时无法区分分界，禁止使用半剖，改用局部剖视图。'
            },
            {
                id: 'q7_2_10',
                type: 'judge',
                question: '绘制剖视图时，剖切面后方的可见轮廓线可以酌情省略。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：剖视图要求完整画出所有可见轮廓，漏线是典型作图错误。'
            },

            // ========== 7.3 断面图 ==========
            {
                id: 'q7_3_1',
                type: 'single',
                question: '断面图与剖视图的主要区别是断面图（）',
                options: [
                    { key: 'A', value: '画出断面及后方所有结构' },
                    { key: 'B', value: '仅画出剖切后的断面形状' },
                    { key: 'C', value: '全部使用虚线绘制' },
                    { key: 'D', value: '必须标注完整符号' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：断面图只表达切断的截面，不绘制剖切平面后方结构，这是二者最核心的区别。'
            },
            {
                id: 'q7_3_2',
                type: 'single',
                question: '移出断面图的轮廓线采用（）',
                options: [
                    { key: 'A', value: '粗实线' },
                    { key: 'B', value: '细实线' },
                    { key: 'C', value: '细虚线' },
                    { key: 'D', value: '细点画线' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：国标规定，移出断面轮廓统一为粗实线。'
            },
            {
                id: 'q7_3_3',
                type: 'single',
                question: '重合断面图的轮廓线采用（）',
                options: [
                    { key: 'A', value: '粗实线' },
                    { key: 'B', value: '细实线' },
                    { key: 'C', value: '细虚线' },
                    { key: 'D', value: '双点画线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：重合断面与视图重叠，轮廓使用细实线。'
            },
            {
                id: 'q7_3_4',
                type: 'single',
                question: '剖切平面通过回转孔的轴线时，该断面应（）',
                options: [
                    { key: 'A', value: '只画截面轮廓' },
                    { key: 'B', value: '按照剖视图绘制' },
                    { key: 'C', value: '直接省略不画' },
                    { key: 'D', value: '改用重合断面' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：切过圆孔、凹坑轴线时，结构必须按剖视图画法表达。'
            },
            {
                id: 'q7_3_5',
                type: 'single',
                question: '对称的重合断面图，标注要求是（）',
                options: [
                    { key: 'A', value: '全标注剖切符号、箭头、字母' },
                    { key: 'B', value: '只画剖切符号，无需额外标注' },
                    { key: 'C', value: '只标注箭头和字母' },
                    { key: 'D', value: '无需画剖切线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：对称重合断面仅绘制剖切线，不标注箭头、字母。'
            },
            {
                id: 'q7_3_6',
                type: 'single',
                question: '重合断面与原视图轮廓重叠时，原视图轮廓应（）',
                options: [
                    { key: 'A', value: '断开避让断面' },
                    { key: 'B', value: '保持连续完整' },
                    { key: 'C', value: '改为虚线' },
                    { key: 'D', value: '整体删除' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：视图轮廓优先级更高，重叠时必须连续，不能中断。'
            },
            {
                id: 'q7_3_7',
                type: 'judge',
                question: '断面图需要绘制剖切平面后方的所有可见轮廓。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：断面图仅画截面，后方结构不绘制。'
            },
            {
                id: 'q7_3_8',
                type: 'judge',
                question: '配置在剖切线延长线上的对称移出断面，可以省略全部标注。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：符合国标简化标注规则。'
            },
            {
                id: 'q7_3_9',
                type: 'judge',
                question: '两个及以上相交剖切平面剖切得到的移出断面，图形中间一般需要断开。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：这是移出断面的标准绘制要求，特殊情况可不断开。'
            },
            {
                id: 'q7_3_10',
                type: 'judge',
                question: '不对称的重合断面图，需要绘制剖切符号和箭头，省略字母。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：不对称重合断面标注剖切符号与投射箭头，无需标注字母。'
            },

            // ========== 7.4 其它表达方法 ==========
            {
                id: 'q7_4_1',
                type: 'single',
                question: '局部放大图的作用是（）',
                options: [
                    { key: 'A', value: '表达机件整体外形' },
                    { key: 'B', value: '放大机件细小结构，方便绘图与标注' },
                    { key: 'C', value: '专门表达内部结构' },
                    { key: 'D', value: '替代剖视图' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：局部放大图针对机件微小结构，放大后便于看图和标注尺寸。'
            },
            {
                id: 'q7_4_2',
                type: 'single',
                question: '实物直径 5mm，原图比例 1:2，改用 4:1 绘制放大图，图形直径为（）',
                options: [
                    { key: 'A', value: '10mm' },
                    { key: 'B', value: '20mm' },
                    { key: 'C', value: '40mm' },
                    { key: 'D', value: '60mm' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：比例 4:1 代表图形尺寸：实物尺寸 = 4:1 ×4=20？修正：原图 1:2 是图 1 = 实 2，实物 5mm；放大比例 4:1，图形尺寸 = 5×4=20mm，答案为 C。'
            },
            {
                id: 'q7_4_3',
                type: 'single',
                question: '纵向剖切肋板时，正确画法是（）',
                options: [
                    { key: 'A', value: '必须画剖面线' },
                    { key: 'B', value: '不画剖面线，粗实线分界' },
                    { key: 'C', value: '画虚线' },
                    { key: 'D', value: '用点画线填充' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：肋板纵向剖切，省略剖面符号，仅用粗实线区分相邻结构。'
            },
            {
                id: 'q7_4_4',
                type: 'single',
                question: '对称机件简化绘图，需在对称线两端绘制（）',
                options: [
                    { key: 'A', value: '粗实线' },
                    { key: 'B', value: '平行细实线' },
                    { key: 'C', value: '波浪线' },
                    { key: 'D', value: '点画线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：对称图形需在对称中心线两端画两条垂直的平行细实线。'
            },
            {
                id: 'q7_4_5',
                type: 'single',
                question: '较长杆件中间断开绘制时，尺寸标注要求是（）',
                options: [
                    { key: 'A', value: '按断开图形长度标注' },
                    { key: 'B', value: '标注机件实际总长' },
                    { key: 'C', value: '省略不标' },
                    { key: 'D', value: '随意标注' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：长机件断开画法仅简化图形，尺寸依旧标注真实长度。'
            },
            {
                id: 'q7_4_6',
                type: 'single',
                question: '均匀分布的等直径小孔，简化画法正确的是（）',
                options: [
                    { key: 'A', value: '全部画出' },
                    { key: 'B', value: '画几个，其余用细点画线标中心' },
                    { key: 'C', value: '全部省略' },
                    { key: 'D', value: '画虚线表示' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：均布孔无需逐一绘制，仅用细点画线标出中心位置即可。'
            },
            {
                id: 'q7_4_7',
                type: 'judge',
                question: '局部放大图的表达形式必须和原部位保持一致。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：局部放大图可自由选用视图、剖视、断面等形式，不受原图限制。'
            },
            {
                id: 'q7_4_8',
                type: 'judge',
                question: '倾斜角小于等于 30° 的斜面上，圆弧投影可用圆弧代替椭圆。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：符合国标细小结构简化规则。'
            },
            {
                id: 'q7_4_9',
                type: 'judge',
                question: '机件上细小的相贯线，在不影响读图时可以简化绘制。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：微小相贯线允许简化为直线或省略。'
            },
            {
                id: 'q7_4_10',
                type: 'judge',
                question: '滚花结构必须完整画出所有纹路，不能省略。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：滚花可局部示意，也可省略图形，用文字/代号标注要求。'
            },

            // ========== 7.5 表达方法的综合应用和读图 ==========
            {
                id: 'q7_5_1',
                type: 'single',
                question: '设计机件表达方案的第一步是（）',
                options: [
                    { key: 'A', value: '直接绘制剖视图' },
                    { key: 'B', value: '形体分析' },
                    { key: 'C', value: '标注尺寸' },
                    { key: 'D', value: '选择局部放大图' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：综合表达首先要用形体分析法拆解机件结构，再选择视图。' 
            },
            {
                id: 'q7_5_2',
                type: 'single',
                question: '整套图样中起核心作用的视图是（）',
                options: [
                    { key: 'A', value: '俯视图' },
                    { key: 'B', value: '左视图' },
                    { key: 'C', value: '主视图' },
                    { key: 'D', value: '断面图' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：主视图优先反映形体特征，是所有视图的核心。'
            },
            {
                id: 'q7_5_3',
                type: 'single',
                question: '复杂机件读图时，首要工作是（）',
                options: [
                    { key: 'A', value: '只看局部线条' },
                    { key: 'B', value: '概括了解整体结构与表达形状' },
                    { key: 'C', value: '直接数图线数量' },
                    { key: 'D', value: '仅分析剖面线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：读图遵循先整体、后局部的原则，先整体浏览图样，再分析局部细节。'
            },
            {
                id: 'q7_5_4',
                type: 'single',
                question: '对于机件内部复杂结构，优先选用（）表达',
                options: [
                    { key: 'A', value: '基本视图' },
                    { key: 'B', value: '剖视图' },
                    { key: 'C', value: '重合断面' },
                    { key: 'D', value: '局部放大图' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：剖视图专门用来清晰表达机件内部孔、槽、腔体等结构。'
            },
            {
                id: 'q7_5_5',
                type: 'single',
                question: '机件截面形状、板材厚度优先使用（）表示',
                options: [
                    { key: 'A', value: '剖视图' },
                    { key: 'B', value: '断面图' },
                    { key: 'C', value: '斜视图' },
                    { key: 'D', value: '局部放大图' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：断面图简洁直观，适合表达截面形态与厚度。'
            },
            {
                id: 'q7_5_6',
                type: 'single',
                question: '选择机件表达方案的核心要求不包括（）',
                options: [
                    { key: 'A', value: '结构表达完整' },
                    { key: 'B', value: '图样简洁' },
                    { key: 'C', value: '视图数量尽量少' },
                    { key: 'D', value: '视图越多越好' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：表达方案要求在完整的前提下，视图越少、图样越简洁越好。'
            },
            {
                id: 'q7_5_7',
                type: 'judge',
                question: '综合表达机件时，只能单独使用一种图样画法。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：实际绘图需要将视图、剖视、断面等多种方法组合使用。'
            },
            {
                id: 'q7_5_8',
                type: 'judge',
                question: '读图时需要结合剖切符号、字母标注，判断剖切位置和投射方向。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：剖切标注是解读剖视图的重要依据。'
            },
            {
                id: 'q7_5_9',
                type: 'judge',
                question: '外形简单、内部复杂的机件，适合采用全剖视图表达。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：结合之前知识点，该类机件优先选用全剖。'
            },
            {
                id: 'q7_5_10',
                type: 'judge',
                question: '形体分析法是画图和读图都要用到的基础方法。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：拆分基本形体，是分析复杂机件的核心手段。'
            },

            // ========== 8.1 螺纹及螺纹紧固件 ==========
            {
                id: 'q8_1_1',
                type: 'single',
                question: '加工内螺纹的专用工具是（）',
                options: [
                    { key: 'A', value: '板牙' },
                    { key: 'B', value: '丝锥' },
                    { key: 'C', value: '车刀' },
                    { key: 'D', value: '钻头' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：板牙加工外螺纹，丝锥专门用于加工内螺纹。'
            },
            {
                id: 'q8_1_2',
                type: 'single',
                question: '不通内螺纹钻孔后，锥顶角国标规定绘制为（）',
                options: [
                    { key: 'A', value: '90°' },
                    { key: 'B', value: '118°' },
                    { key: 'C', value: '120°' },
                    { key: 'D', value: '135°' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：钻头顶角为 118°，制图中不通螺纹孔统一绘制为 120° 锥角。'
            },
            {
                id: 'q8_1_3',
                type: 'single',
                question: '单线螺纹的螺距 P 和导程 L 的关系是（）',
                options: [
                    { key: 'A', value: 'L＞P' },
                    { key: 'B', value: 'L＜P' },
                    { key: 'C', value: 'L=P' },
                    { key: 'D', value: '无固定关系' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：单线螺纹只有一条螺旋线，导程等于螺距。'
            },
            {
                id: 'q8_1_4',
                type: 'single',
                question: '机械行业使用最多的螺纹旋向是（）',
                options: [
                    { key: 'A', value: '左旋' },
                    { key: 'B', value: '右旋' },
                    { key: 'C', value: '左右均可' },
                    { key: 'D', value: '双向' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：常规螺纹均为右旋，左旋仅特殊场合使用。'
            },
            {
                id: 'q8_1_5',
                type: 'single',
                question: '外螺纹在非圆视图中，大径的线型为（）',
                options: [
                    { key: 'A', value: '粗实线' },
                    { key: 'B', value: '细实线' },
                    { key: 'C', value: '虚线' },
                    { key: 'D', value: '点画线' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：外螺纹大径用粗实线，小径用细实线。'
            },
            {
                id: 'q8_1_6',
                type: 'single',
                question: '普通螺纹标注时，尺寸界线应从（）引出',
                options: [
                    { key: 'A', value: '大径' },
                    { key: 'B', value: '小径' },
                    { key: 'C', value: '中径' },
                    { key: 'D', value: '螺牙' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：国标规定螺纹标注的尺寸界线必须从大径引出。'
            },
            {
                id: 'q8_1_7',
                type: 'judge',
                question: '内外螺纹旋合时，只要直径一致，其余要素可以不同。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：五大要素必须全部相同，螺纹才能正常旋合。'
            },
            {
                id: 'q8_1_8',
                type: 'judge',
                question: '内螺纹的小径用粗实线绘制，大径用细实线绘制。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：符合内螺纹国标画法规则。'
            },
            {
                id: 'q8_1_9',
                type: 'judge',
                question: '螺纹旋合部分按照内螺纹的画法绘制。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：旋合区域统一按照外螺纹画法绘制。'
            },
            {
                id: 'q8_1_10',
                type: 'judge',
                question: '右旋螺纹在标注时，不需要额外标注旋向符号。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：默认螺纹为右旋，仅左旋标注 LH。'
            },
            // ========== 8.2 螺纹紧固件及表示方法 ==========
            {
                id: 'q8_2_1',
                type: 'single',
                question: '螺纹紧固件装配中，零件预制光孔直径一般取螺纹大径的（）',
                options: [
                    { key: 'A', value: '1.0倍' },
                    { key: 'B', value: '1.1倍' },
                    { key: 'C', value: '1.2倍' },
                    { key: 'D', value: '0.85倍' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：国标规定，穿紧固件的光孔直径简化取 1.1d。'
            },
            {
                id: 'q8_2_2',
                type: 'single',
                question: '加工内螺纹的钻孔，底部锥顶角规定绘制为（）',
                options: [
                    { key: 'A', value: '90°' },
                    { key: 'B', value: '118°' },
                    { key: 'C', value: '120°' },
                    { key: 'D', value: '135°' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：钻头顶角实际为 118°，制图统一简化绘制为 120°。'
            },
            {
                id: 'q8_2_3',
                type: 'single',
                question: '被连接件为铸铁时，双头螺柱旋入端长度 bm 一般取（）',
                options: [
                    { key: 'A', value: 'd' },
                    { key: 'B', value: '1.25~1.5d' },
                    { key: 'C', value: '2d' },
                    { key: 'D', value: '0.8d' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：铸铁材质旋入深度为 1.25~1.5 倍螺纹大径。'
            },
            {
                id: 'q8_2_4',
                type: 'single',
                question: '螺栓连接剖切后，螺栓本体的画法为（）',
                options: [
                    { key: 'A', value: '绘制剖面线' },
                    { key: 'B', value: '按不剖绘制' },
                    { key: 'C', value: '画虚线' },
                    { key: 'D', value: '省略不画' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：实心螺纹紧固件剖切时，统一按不剖处理。'
            },
            {
                id: 'q8_2_5',
                type: 'single',
                question: '螺栓连接中，两个被连接件的剖面线要求是（）',
                options: [
                    { key: 'A', value: '方向相同' },
                    { key: 'B', value: '方向相反' },
                    { key: 'C', value: '全部省略' },
                    { key: 'D', value: '粗细不同' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：相邻零件剖面线方向相反，用于区分不同构件。'
            },
            {
                id: 'q8_2_6',
                type: 'single',
                question: '螺栓标记 螺栓 GB5782 M12×80 中，80 代表（）',
                options: [
                    { key: 'A', value: '螺纹大径' },
                    { key: 'B', value: '螺距' },
                    { key: 'C', value: '公称长度' },
                    { key: 'D', value: '旋合长度' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：螺纹规格后数字为紧固件公称长度。'
            },
            {
                id: 'q8_2_7',
                type: 'judge',
                question: '六角螺母绘图时，厚度简化取值为 0.8d（d 为螺纹大径）。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：符合螺母国标简化绘图比例。'
            },
            {
                id: 'q8_2_8',
                type: 'judge',
                question: '双头螺柱旋入端的螺纹终止线需要高出零件结合面。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：旋入端完全拧入螺孔，螺纹终止线与结合面平齐。'
            },
            {
                id: 'q8_2_9',
                type: 'judge',
                question: '紧定螺钉主要用于机件的定位与防松。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：紧定螺钉依靠端部顶紧结构，实现定位、固定作用。'
            },
            {
                id: 'q8_2_10',
                type: 'judge',
                question: '螺钉连接必须搭配螺母和垫圈使用。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：普通螺钉直接旋入螺孔，无需螺母、垫圈。'
            },

            // ========== 8.3 齿轮及表示法 ==========
            {
                id: 'q8_3_1',
                type: 'single',
                question: '我国标准齿轮的分度圆压力角为（）',
                options: [
                    { key: 'A', value: '15°' },
                    { key: 'B', value: '20°' },
                    { key: 'C', value: '25°' },
                    { key: 'D', value: '30°' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：国标规定标准齿轮压力角为20°'
            },
            {
                id: 'q8_3_2',
                type: 'single',
                question: '一对直齿圆柱齿轮正常啮合，必须相同的参数是（）',
                options: [
                    { key: 'A', value: '齿数' },
                    { key: 'B', value: '模数和压力角' },
                    { key: 'C', value: '中心距' },
                    { key: 'D', value: '传动比' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：模数、压力角一致是齿轮啮合的必要条件。'
            },
            {
                id: 'q8_3_3',
                type: 'single',
                question: '模数越大，齿轮轮齿（）',
                options: [
                    { key: 'A', value: '越细小' },
                    { key: 'B', value: '越粗壮' },
                    { key: 'C', value: '无变化' },
                    { key: 'D', value: '变形越大' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：模数与齿距成正比，模数越大，轮齿承载能力越强。'
            },
            {
                id: 'q8_3_4',
                type: 'single',
                question: '标准直齿圆柱齿轮齿顶高计算公式为（）',
                options: [
                    { key: 'A', value: 'ha=m' },
                    { key: 'B', value: 'ha=1.25m' },
                    { key: 'C', value: 'ha=2.25m' },
                    { key: 'D', value: 'ha=πm' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：标准齿轮齿顶高ha=m。'
            },
            {
                id: 'q8_3_5',
                type: 'single',
                question: '单个齿轮视图中，分度圆采用线型为（）',
                options: [
                    { key: 'A', value: '粗实线' },
                    { key: 'B', value: '细实线' },
                    { key: 'C', value: '细点画线' },
                    { key: 'D', value: '虚线' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：分度圆、轴线统一使用细点画线。'
            },
            {
                id: 'q8_3_6',
                type: 'single',
                question: '齿轮剖视图中，轮齿部分（）剖面线',
                options: [
                    { key: 'A', value: '必须画' },
                    { key: 'B', value: '不画' },
                    { key: 'C', value: '可画可不画' },
                    { key: 'D', value: '只画一半' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：国标规定轮齿区域剖切后不绘制剖面线。'
            },
            {
                id: 'q8_3_7',
                type: 'judge',
                question: '圆柱齿轮适用于两平行轴之间的传动。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：圆柱齿轮传动轴线相互平行。'
            },
            {
                id: 'q8_3_8',
                type: 'judge',
                question: '齿轮分度圆直径计算公式d=mz。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：直齿圆柱齿轮基本计算公式d=mz。'
            },
            {
                id: 'q8_3_9',
                type: 'judge',
                question: '齿轮啮合时，两节圆（分度圆）相互分离。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：标准齿轮啮合，分度圆（节圆）相切。'
            },
            {
                id: 'q8_3_10',
                type: 'judge',
                question: '齿轮齿根圆在图样中规定用粗实线绘制。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：齿根圆/齿根线使用细实线。'
            },

            // ========== 8.4 键的表示法 ==========
            {
                id: 'q8_4_1',
                type: 'single',
                question: '键的主要作用是（）',
                options: [
                    { key: 'A', value: '支撑轴体' },
                    { key: 'B', value: '传递扭矩，连接轴与传动件' },
                    { key: 'C', value: '轴向定位' },
                    { key: 'D', value: '密封防漏' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：键用于连接轴和齿轮、带轮等零件，主要功能是传递扭矩。'
            },
            {
                id: 'q8_4_2',
                type: 'single',
                question: '圆头普通平键执行的国家标准代号是（）',
                options: [
                    { key: 'A', value: 'GB/T 1096' },
                    { key: 'B', value: 'GB/T 1099.1' },
                    { key: 'C', value: 'GB/T 1565' },
                    { key: 'D', value: 'GB/T 97' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：普通平键标准为 GB/T 1096，半圆键 GB/T 1099.1，钩头楔键 GB/T 1565。'
            },
            {
                id: 'q8_4_3',
                type: 'single',
                question: '沿键长度方向纵向剖切，键的画法为（）',
                options: [
                    { key: 'A', value: '绘制剖面线' },
                    { key: 'B', value: '不画剖面线' },
                    { key: 'C', value: '改用虚线' },
                    { key: 'D', value: '省略轮廓' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：纵向剖切键属于实心标准件，按不剖处理，不画剖面线。'
            },
            {
                id: 'q8_4_4',
                type: 'single',
                question: '普通平键连接中，键的上表面与轮毂槽顶面状态是（）',
                options: [
                    { key: 'A', value: '紧密接触' },
                    { key: 'B', value: '留有间隙' },
                    { key: 'C', value: '完全重合' },
                    { key: 'D', value: '画一条线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：平键依靠两侧传力，顶面存在间隙，绘图需画出两条线。'
            },
            {
                id: 'q8_4_5',
                type: 'single',
                question: '钩头楔键的工作面是（）',
                options: [
                    { key: 'A', value: '左右两侧面' },
                    { key: 'B', value: '上下表面' },
                    { key: 'C', value: '仅上表面' },
                    { key: 'D', value: '仅下表面' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：楔键依靠上下表面挤压固定，两侧留有间隙。'
            },
            {
                id: 'q8_4_6',
                type: 'single',
                question: '标注轴上键槽深度时，正确标注形式为（）',
                options: [
                    { key: 'A', value: 't' },
                    { key: 'B', value: 'd-t' },
                    { key: 'C', value: 't₁' },
                    { key: 'D', value: 'D+t₁' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：轴上键槽深度标注为轴径 d 减去槽深 t；轮毂键槽标注为 D+t₁。'
            },
            {
                id: 'q8_4_7',
                type: 'judge',
                question: '半圆键适用于锥形轴、轻载连接场合。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：半圆键可自适应槽体斜度，多用于轴端、轻型传动结构。'
            },
            {
                id: 'q8_4_8',
                type: 'judge',
                question: '横向剖切普通平键，需要绘制剖面线。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：垂直键长度剖切时，按剖视要求画出剖面线。'
            },
            {
                id: 'q8_4_9',
                type: 'judge',
                question: '普通平键连接，键的两侧面与键槽必须紧密接触。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：平键依靠两侧挤压传递扭矩，两侧为工作面，无间隙。'
            },
            {
                id: 'q8_4_10',
                type: 'judge',
                question: '钩头楔键连接时，左右两侧面紧密贴合、无间隙。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：楔键上下表面为工作面，两侧留有间隙。'
            },

            // ========== 8.5 销 ==========
            {
                id: 'q8_5_1',
                type: 'single',
                question: '销最主要的作用是（）',
                options: [
                    { key: 'A', value: '传递大扭矩' },
                    { key: 'B', value: '零件定位' },
                    { key: 'C', value: '轴向密封' },
                    { key: 'D', value: '减震缓冲' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：销首要功能是固定零件相对位置，仅可传递较小扭矩。'
            },
            {
                id: 'q8_5_2',
                type: 'single',
                question: '下列不属于常用销类型的是（）',
                options: [
                    { key: 'A', value: '圆柱销' },
                    { key: 'B', value: '圆锥销' },
                    { key: 'C', value: '开口销' },
                    { key: 'D', value: '钩头销' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：常用销为圆柱销、圆锥销、开口销，钩头销属于键类零件。'
            },
            {
                id: 'q8_5_3',
                type: 'single',
                question: '标记 销 GB/T119.1-2000 B10×50 中，数字 10 代表（）',
                options: [
                    { key: 'A', value: '长度' },
                    { key: 'B', value: '公称直径' },
                    { key: 'C', value: '锥度' },
                    { key: 'D', value: '标准代号' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：该标记中 10 为销的公称直径，50 为公称长度。'
            },
            {
                id: 'q8_5_4',
                type: 'single',
                question: '剖切绘制销连接装配图时，销本身（）',
                options: [
                    { key: 'A', value: '画剖面线' },
                    { key: 'B', value: '不画剖面线' },
                    { key: 'C', value: '画虚线' },
                    { key: 'D', value: '省略不画' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：实心销属于标准实心件，剖切时按不剖绘制。'
            },
            {
                id: 'q8_5_5',
                type: 'single',
                question: '开口销的主要用途是（）',
                options: [
                    { key: 'A', value: '精准定位' },
                    { key: 'B', value: '轻型连接' },
                    { key: 'C', value: '防松止动' },
                    { key: 'D', value: '传递扭矩' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：开口销多用于销轴、螺栓处，起到防脱落、防松作用。'
            },
            {
                id: 'q8_5_6',
                type: 'single',
                question: '圆柱销与销孔配合面绘图时（）',
                options: [
                    { key: 'A', value: '画两条线（留间隙）' },
                    { key: 'B', value: '画一条线（紧密配合）' },
                    { key: 'C', value: '画虚线' },
                    { key: 'D', value: '随意绘制' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：销与销孔为配合表面，接触面只画一条轮廓线。'
            },
            {
                id: 'q8_5_7',
                type: 'judge',
                question: '销可以用来连接零件，且能传递较大扭矩。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：销仅适用于传递小扭矩，无法承受重载。'
            },
            {
                id: 'q8_5_8',
                type: 'judge',
                question: '圆锥销带有锥度，拆装方便，重复定位精度较好。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：锥面结构便于安装拆卸，多次使用仍能保证定位精度。'
            },
            {
                id: 'q8_5_9',
                type: 'judge',
                question: '圆柱销、圆锥销、开口销都可用于零件定位。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：圆柱销、圆锥销主打定位，开口销可辅助定位防松。'
            },
            {
                id: 'q8_5_10',
                type: 'judge',
                question: '销连接绘图中，配合表面必须绘制两条轮廓线。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：配合面紧密接触，只绘制一条轮廓线。'
            },
            
            // ========== 8.6 滚动轴承 ==========
            {
                id: 'q8_6_1',
                type: 'single',
                question: '滚动轴承中，随轴转动的部分是（）',
                options: [
                    { key: 'A', value: '外圈' },
                    { key: 'B', value: '内圈' },
                    { key: 'C', value: '保持架' },
                    { key: 'D', value: '滚动体' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：内圈套在轴上，一般跟随轴旋转，外圈固定在机座孔中。'
            },
            {
                id: 'q8_6_2',
                type: 'single',
                question: '主要承受径向载荷的轴承是（）',
                options: [
                    { key: 'A', value: '深沟球轴承' },
                    { key: 'B', value: '推力球轴承' },
                    { key: 'C', value: '圆锥滚子轴承' },
                    { key: 'D', value: '角接触轴承' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：深沟球轴承属于向心轴承，以承受径向力为主。'
            },
            {
                id: 'q8_6_3',
                type: 'single',
                question: '仅能承受轴向载荷的轴承是（）',
                options: [
                    { key: 'A', value: '深沟球轴承' },
                    { key: 'B', value: '推力球轴承' },
                    { key: 'C', value: '圆锥滚子轴承' },
                    { key: 'D', value: '调心轴承' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：推力轴承专门承受沿轴线方向的轴向力。'
            },
            {
                id: 'q8_6_4',
                type: 'single',
                question: '轴承代号 6204，其内径尺寸为（）',
                options: [
                    { key: 'A', value: '10mm' },
                    { key: 'B', value: '17mm' },
                    { key: 'C', value: '20mm' },
                    { key: 'D', value: '40mm' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：后两位 04 为内径代号，04×5=20mm。'
            },
            {
                id: 'q8_6_5',
                type: 'single',
                question: '轴承类型代号 "6" 代表（）',
                options: [
                    { key: 'A', value: '推力球轴承' },
                    { key: 'B', value: '深沟球轴承' },
                    { key: 'C', value: '圆锥滚子轴承' },
                    { key: 'D', value: '调心滚子轴承' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：6 为深沟球轴承类型代号，1 为推力球轴承，3 为圆锥滚子轴承。'
            },
            {
                id: 'q8_6_6',
                type: 'single',
                question: '滚动轴承装配图采用的画法是（）',
                options: [
                    { key: 'A', value: '真实投影画法' },
                    { key: 'B', value: '比例简化画法' },
                    { key: 'C', value: '局部放大画法' },
                    { key: 'D', value: '随意绘制' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：滚动轴承为标准件，装配图统一使用国标比例简化画法。'
            },
            {
                id: 'q8_6_7',
                type: 'judge',
                question: '滚动轴承由内圈、外圈、滚动体、保持架四部分组成。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：这是滚动轴承的标准结构。'
            },
            {
                id: 'q8_6_8',
                type: 'judge',
                question: '代号 51203 中，最后两位数字代表轴承外径。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：轴承后两位是内径代号，并非外径。'
            },
            {
                id: 'q8_6_9',
                type: 'judge',
                question: '内径在 20~480mm 范围内，内径 = 内径代号 ×5。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：符合国标内径换算规则。'
            },
            {
                id: 'q8_6_10',
                type: 'judge',
                question: '圆锥滚子轴承可以同时承受径向和轴向载荷。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：属于向心推力轴承，可承受复合载荷。'
            },

            // ========== 8.7 弹簧 ==========
            {
                id: 'q8_7_1',
                type: 'single',
                question: '弹簧两端并紧磨平、不产生弹性变形的圈是（）',
                options: [
                    { key: 'A', value: '有效圈' },
                    { key: 'B', value: '支承圈' },
                    { key: 'C', value: '总圈' },
                    { key: 'D', value: '节距圈' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：支承圈仅起支撑作用，不参与弹性变形。'
            },
            {
                id: 'q8_7_2',
                type: 'single',
                question: '圆柱螺旋弹簧内径计算公式正确的是（）',
                options: [
                    { key: 'A', value: 'D1=D-2d' },
                    { key: 'B', value: 'D2=D-d' },
                    { key: 'C', value: 'H0=nt' },
                    { key: 'D', value: 'n1=n' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：内径 = 外径 - 2 倍钢丝直径。'
            },
            {
                id: 'q8_7_3',
                type: 'single',
                question: '机械中圆柱螺旋弹簧默认旋向为（）',
                options: [
                    { key: 'A', value: '左旋' },
                    { key: 'B', value: '右旋' },
                    { key: 'C', value: '双向' },
                    { key: 'D', value: '无规定' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：常规弹簧均为右旋，左旋必须标注文字说明。'
            },
            {
                id: 'q8_7_4',
                type: 'single',
                question: '圈数大于 4 圈的弹簧，中间省略部分用（）连接',
                options: [
                    { key: 'A', value: '粗实线' },
                    { key: 'B', value: '细实线' },
                    { key: 'C', value: '细点画线' },
                    { key: 'D', value: '虚线' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：沿弹簧中径用细点画线连接省略部分。'
            },
            {
                id: 'q8_7_5',
                type: 'single',
                question: '弹簧不受外力时的整体高度称为（）',
                options: [
                    { key: 'A', value: '节距' },
                    { key: 'B', value: '自由高度' },
                    { key: 'C', value: '中径' },
                    { key: 'D', value: '总高' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：H0为弹簧自由高度。'
            },
            {
                id: 'q8_7_6',
                type: 'single',
                question: '装配图中，弹簧钢丝直径≤2mm 时，不可采用的画法是（）',
                options: [
                    { key: 'A', value: '涂黑' },
                    { key: 'B', value: '示意画法' },
                    { key: 'C', value: '完整逐圈绘制' },
                    { key: 'D', value: '简化绘制' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：小直径弹簧允许涂黑、示意画法，无需逐圈完整绘制。'
            },
            {
                id: 'q8_7_7',
                type: 'judge',
                question: '有效圈是弹簧工作时产生弹性变形的部分。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：有效圈是弹簧的核心工作结构。'
            },
            {
                id: 'q8_7_8',
                type: 'judge',
                question: '左旋弹簧绘图时可以不做任何标注。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：图纸默认右旋，左旋弹簧必须标注 "左" 字。'
            },
            {
                id: 'q8_7_9',
                type: 'judge',
                question: '弹簧总圈数 = 有效圈数 + 支承圈数。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：符合总圈数定义与公式。'
            },
            {
                id: 'q8_7_10',
                type: 'judge',
                question: '装配图中被弹簧遮挡的零件轮廓必须全部画出。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：被弹簧遮挡的结构一般省略不画。'  
            },

            // ========== 9.1 零件图概述 ==========
            {
                id: 'q9_1_1',
                type: 'single',
                question: '下列零件中属于标准件的是（）',
                options: [
                    { key: 'A', value: '轴承座' },
                    { key: 'B', value: '螺栓' },
                    { key: 'C', value: '泵体' },
                    { key: 'D', value: '支架' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：螺栓属于国家标准件；轴承座、泵体、支架均为非标准件。'
            },
            {
                id: 'q9_1_2',
                type: 'single',
                question: '非标准件不包括以下哪一类（）',
                options: [
                    { key: 'A', value: '轴套类' },
                    { key: 'B', value: '盘盖类' },
                    { key: 'C', value: '箱体类' },
                    { key: 'D', value: '滚动轴承' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：滚动轴承是标准件，不属于四类非标准件范畴。'
            },
            {
                id: 'q9_1_3',
                type: 'single',
                question: '零件图作为生产依据，主要用于（）',
                options: [
                    { key: 'A', value: '装配调试' },
                    { key: 'B', value: '零件制造与检验' },
                    { key: 'C', value: '设备维修' },
                    { key: 'D', value: '方案设计' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：零件图是制造、检验零件的直接技术依据。'
            },
            {
                id: 'q9_1_4',
                type: 'single',
                question: '完整零件图不包含以下哪一项内容（）',
                options: [
                    { key: 'A', value: '一组视图' },
                    { key: 'B', value: '明细栏' },
                    { key: 'C', value: '完整尺寸' },
                    { key: 'D', value: '技术要求' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：明细栏是装配图的组成部分，零件图无此项。'
            },
            {
                id: 'q9_1_5',
                type: 'single',
                question: '用来表达零件内外结构的是（）',
                options: [
                    { key: 'A', value: '标题栏' },
                    { key: 'B', value: '一组视图' },
                    { key: 'C', value: '技术要求' },
                    { key: 'D', value: '尺寸标注' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：视图、剖视、断面等组合而成的一组视图，作用是展示零件结构形状。'
            },
            {
                id: 'q9_1_6',
                type: 'single',
                question: '零件图中表面粗糙度、尺寸公差等内容，统一归为（）',
                options: [
                    { key: 'A', value: '视图' },
                    { key: 'B', value: '尺寸' },
                    { key: 'C', value: '技术要求' },
                    { key: 'D', value: '标题栏' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：表面粗糙度、公差、热处理、铸造要求等都属于技术要求。'
            },
            {
                id: 'q9_1_7',
                type: 'judge',
                question: '油杯、滚动轴承都属于标准件。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：油杯、滚动轴承均为国家通用标准件，无需单独绘图加工。'
            },
            {
                id: 'q9_1_8',
                type: 'judge',
                question: '箱体类零件属于标准件。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：箱体类属于四大非标准件之一，需要单独设计加工。'
            },
            {
                id: 'q9_1_9',
                type: 'judge',
                question: '标题栏需要填写零件名称、材料、比例、制图审核等信息。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：标题栏记录零件基础信息与图纸相关签署内容。'
            },
            {
                id: 'q9_1_10',
                type: 'judge',
                question: '仅有视图和尺寸，没有技术要求的图样，也可以作为正式零件图使用。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：正式零件图必须同时具备视图、尺寸、技术要求、标题栏四大内容。'
            },
            // ========== 9.2 零件图的视图选择及尺寸标注 ==========
            {
                id: 'q9_2_1',
                type: 'single',
                question: '零件图视图的基本要求不包括（）',
                options: [
                    { key: 'A', value: '投影正确' },
                    { key: 'B', value: '结构表达完整' },
                    { key: 'C', value: '图面清晰' },
                    { key: 'D', value: '视图数量越多越好' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：视图选择原则是在表达完整的前提下尽量减少视图数量，并非越多越好。'
            },
            {
                id: 'q9_2_2',
                type: 'single',
                question: '轴类、盘类零件选择主视图主要遵循（）',
                options: [
                    { key: 'A', value: '工作位置原则' },
                    { key: 'B', value: '加工位置原则' },
                    { key: 'C', value: '随意摆放' },
                    { key: 'D', value: '倾斜摆放' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：轴、盘类零件多在车床加工，主视图按加工位置水平放置。'
            },
            {
                id: 'q9_2_3',
                type: 'single',
                question: '叉架、箱体类零件主视图优先采用（）',
                options: [
                    { key: 'A', value: '加工位置' },
                    { key: 'B', value: '工作位置' },
                    { key: 'C', value: '轴线竖直放置' },
                    { key: 'D', value: '任意方向' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：此类零件工序复杂，按实际工作位置放置，便于读图与装配。'
            },
            {
                id: 'q9_2_4',
                type: 'single',
                question: '选择主视图首要遵循的原则是（）',
                options: [
                    { key: 'A', value: '形状特征原则' },
                    { key: 'B', value: '尺寸大小' },
                    { key: 'C', value: '图纸布局' },
                    { key: 'D', value: '线条多少' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：主视图投射方向优先选择最能体现零件结构特征的方向。'
            },
            {
                id: 'q9_2_5',
                type: 'single',
                question: '零件尺寸标注时，影响配合、精度的主要尺寸应当（）',
                options: [
                    { key: 'A', value: '间接标注' },
                    { key: 'B', value: '从基准直接注出' },
                    { key: 'C', value: '省略不标' },
                    { key: 'D', value: '随意标注' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：主要尺寸必须从基准直接标注，保证零件使用精度。'
            },
            {
                id: 'q9_2_6',
                type: 'single',
                question: '尺寸标注中需要严格规避的问题是（）',
                options: [
                    { key: 'A', value: '标注辅助基准' },
                    { key: 'B', value: '出现封闭尺寸链' },
                    { key: 'C', value: '按加工顺序标注' },
                    { key: 'D', value: '方便测量' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：封闭尺寸链会累积加工误差，是尺寸标注的常见错误。'
            },
            {
                id: 'q9_2_7',
                type: 'judge',
                question: '绘制零件视图时，应尽量使用虚线表达可见结构。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：视图选择要求尽量避免用虚线表达可见结构。'
            },
            {
                id: 'q9_2_8',
                type: 'judge',
                question: '零件长、宽、高三个方向都需要设置主要尺寸基准。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：完整的尺寸标注，三个方向均要有主要基准，必要时增设辅助基准。'
            },
            {
                id: 'q9_2_9',
                type: 'judge',
                question: '同一零件可以拟定多种视图方案，择优选用最佳方案。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：视图方案不唯一，需对比检查，选择表达最优、绘图最简的方案。'
            },
            {
                id: 'q9_2_10',
                type: 'judge',
                question: '标注尺寸无需考虑加工顺序和测量是否方便。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：尺寸标注要兼顾设计要求与加工、测量的工艺要求。'  
            },

            // ========== 9.3 常见典型零件分析 ==========
            {
                id: 'q9_3_1',
                type: 'single',
                question: '传动轴、轴套属于哪一类典型零件（）',
                options: [
                    { key: 'A', value: '轴套类' },
                    { key: 'B', value: '轮盘类' },
                    { key: 'C', value: '支架类' },
                    { key: 'D', value: '箱体类' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：传动轴、销轴、轴套、衬套均为轴套类零件。'
            },
            {
                id: 'q9_3_2',
                type: 'single',
                question: '轴套类零件主视图的摆放原则是（）',
                options: [
                    { key: 'A', value: '工作位置' },
                    { key: 'B', value: '加工位置（水平放置）' },
                    { key: 'C', value: '倾斜放置' },
                    { key: 'D', value: '任意摆放' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：轴套类主要在车床加工，主视图按加工位置水平放置。'
            },
            {
                id: 'q9_3_3',
                type: 'single',
                question: '齿轮、端盖、法兰盘属于（）',
                options: [
                    { key: 'A', value: '轴套类' },
                    { key: 'B', value: '轮盘类' },
                    { key: 'C', value: '支架类' },
                    { key: 'D', value: '箱体类' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：齿轮、带轮、端盖、法兰等回转盘状零件为轮盘类零件。'
            },
            {
                id: 'q9_3_4',
                type: 'single',
                question: '表达轮盘类零件内部结构，主视图常采用（）',
                options: [
                    { key: 'A', value: '局部视图' },
                    { key: 'B', value: '全剖视图' },
                    { key: 'C', value: '斜视图' },
                    { key: 'D', value: '断面图' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：轮盘类主视图一般选用全剖视图，清晰表达内部孔、腔结构。'   
            },
            {
                id: 'q9_3_5',
                type: 'single',
                question: '带有倾斜结构的拨叉、支架，优先使用（）表达倾斜部分',
                options: [
                    { key: 'A', value: '全剖视图' },
                    { key: 'B', value: '斜视图/斜剖 ' },
                    { key: 'C', value: '单一外形' },
                    { key: 'D', value: '简化画法' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：支架类零件的倾斜结构，采用斜视图、斜剖视图表达。'   
            },
            {
                id: 'q9_3_6',
                type: 'single',
                question: '泵体、阀体这类起包容支撑作用的零件属于（）',
                options: [
                    { key: 'A', value: '轴套类' },
                    { key: 'B', value: '轮盘类' },
                    { key: 'C', value: '支架类' },
                    { key: 'D', value: '箱体类' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：箱体、阀体、泵体属于箱体类零件，主要用于包容和支撑其他零件。'   
            },
            {
                id: 'q9_3_7',
                type: 'judge',
                question: '套类零件为中空结构，主视图常采用剖视图表达。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：套类内部为空腔，用剖视图可以清晰表达内部形状。'   
            },
            {
                id: 'q9_3_8',
                type: 'judge',
                question: '轮盘类零件只需要一个视图就可以完整表达所有结构。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：轮盘类结构相对复杂，一般需要两个基本视图配合表达。'   
            },
            {
                id: 'q9_3_9',
                type: 'judge',
                question: '支架类零件一般由工作部分、连接支撑部分、安装部分组成。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：这是支架类零件典型的结构划分形式。'   
            },
            {
                id: 'q9_3_10',
                type: 'judge',
                question: '箱体类零件主视图优先按照加工位置摆放。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：箱体类主视图以工作位置 + 形状特征为选择依据，而非加工位置。'   
            },

            // ========== 9.4 零件上常见结构及尺寸标注 ==========
            {
                id: 'q9_4_1',
                type: 'single',
                question: '铸件表面设置铸造圆角的主要目的是（）',
                options: [
                    { key: 'A', value: '美观装饰' },
                    { key: 'B', value: '防止产生缩孔、裂纹，便于起模' },
                    { key: 'C', value: '方便装配' },
                    { key: 'D', value: '减小加工余量' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：铸造圆角可避免铸件冷却出现缩孔、裂纹，同时防止起模时砂型脱落。'
            },
            {
                id: 'q9_4_2',
                type: 'single',
                question: '两曲面相交形成的过渡线，正确画法是（）',
                options: [
                    { key: 'A', value: '与圆角轮廓相接' },
                    { key: 'B', value: '不与圆角轮廓接触' },
                    { key: 'C', value: '画成粗实线圆弧' },
                    { key: 'D', value: '随意绘制' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：受铸造圆角影响，两曲面的过渡线不能和圆角轮廓接触。'
            },
            {
                id: 'q9_4_3',
                type: 'single',
                question: '斜面钻孔时，合理的结构设计是增设（）',
                options: [
                    { key: 'A', value: '退刀槽' },
                    { key: 'B', value: '凸台 / 凹坑' },
                    { key: 'C', value: '倒角' },
                    { key: 'D', value: '拔模斜度' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：斜面钻孔易使钻头偏斜、折断，增设凸台或凹坑，保证钻孔面与钻头垂直。'
            },
            {
                id: 'q9_4_4',
                type: 'single',
                question: '螺纹退刀槽标准标注形式为（）',
                options: [
                    { key: 'A', value: '直径 × 槽宽' },
                    { key: 'B', value: '槽宽 × 直径' },
                    { key: 'C', value: '只标槽深' },
                    { key: 'D', value: '只标角度' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：退刀槽常规标注方式为槽宽 × 直径 或 槽宽 × 槽深。'   
            },
            {
                id: 'q9_4_5',
                type: 'single',
                question: '为减少加工面积、保证接触面贴合，铸件会设计（）',
                options: [
                    { key: 'A', value: '铸造圆角' },
                    { key: 'B', value: '凸台、凹坑' },
                    { key: 'C', value: '拔模斜度' },
                    { key: 'D', value: '120°锥孔' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：凸台、凹坑可以减小接触表面的加工面积，同时保证装配贴合。'   
            },
            {
                id: 'q9_4_6',
                type: 'single',
                question: '普45° 倒角的标注符号（）',
                options: [
                    { key: 'A', value: 'R' },
                    { key: 'B', value: 'C' },
                    { key: 'C', value: 'Φ' },
                    { key: 'D', value: '∠' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：机械制图中45° 倒角使用符号 C 进行标注。'   
            },
            {
                id: 'q9_4_7',
                type: 'judge',
                question: '铸件壁厚可以设计成突然变化的形式。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：铸件壁厚应均匀，厚薄交界处需逐渐过渡，壁厚突变易产生铸造缺陷。'   
            },
            {
                id: 'q9_4_8',
                type: 'judge',
                question: '轴肩处加工圆角（倒圆），能够有效减小应力集中。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：尖角位置易产生应力集中，倒圆可改善这一问题，提升零件强度。'   
            },
            {
                id: 'q9_4_9',
                type: 'judge',
                question: '用钻头加工的盲孔，底部的 120° 锥角绘图时可以省略。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：钻头天然形120° 锥角，属于结构一部分，绘图必须画出。'   
            },
            {
                id: 'q9_4_10',
                type: 'judge',
                question: '拔模斜度较大时需要在图纸中表达，斜度很小时可省略。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：拔模斜度视大小决定是否绘制，小斜度制图中一般省略。'   
            },

            // ========== 9.5 读零件图 ==========
            {
                id: 'q9_5_1',
                type: 'single',
                question: '查看零件名称、材料、比例等基础信息，主要依靠图纸的（）',
                options: [
                    { key: 'A', value: '视图' },
                    { key: 'B', value: '标题栏' },
                    { key: 'C', value: '尺寸标注' },
                    { key: 'D', value: '技术要求' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：标题栏专门记录零件名称、材料、比例、制图审核等基础信息。'   
            },
            {
                id: 'q9_5_2',
                type: 'single',
                question: '读零件图时，首先要找到的核心视图是（）',
                options: [
                    { key: 'A', value: '俯视图' },
                    { key: 'B', value: '左视图' },
                    { key: 'C', value: '主视图' },
                    { key: 'D', value: '局部视图' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：主视图是零件图的核心视图，分析视图需先确定主视图。'   
            },
            {
                id: 'q9_5_3',
                type: 'single',
                question: '分析零件整体形状，优先使用的方法是（）',
                options: [
                    { key: 'A', value: '形体分析法' },
                    { key: 'B', value: '线面分析法' },
                    { key: 'C', value: '估算分析法' },
                    { key: 'D', value: '对比分析法' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：形体分析法用于拆分基本形体，快速判断零件整体结构；线面分析法多用于局部细节。'   
            },
            {
                id: 'q9_5_4',
                type: 'single',
                question: '读零件图分析尺寸时，首先要确定的是（）',
                options: [
                    { key: 'A', value: '所有定形尺寸' },
                    { key: 'B', value: '三个方向的尺寸基准' },
                    { key: 'C', value: '表面粗糙度' },
                    { key: 'D', value: '公差数值' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：尺寸基准是尺寸标注的起点，分析尺寸必须先确定长、宽、高三大基准。'   
            },
            {
                id: 'q9_5_5',
                type: 'single',
                question: '读图时正确的先后顺序是（）',
                options: [
                    { key: 'A', value: '先局部后整体' },
                    { key: 'B', value: '先主要后次要' },
                    { key: 'C', value: '先难懂后易懂' },
                    { key: 'D', value: '先细节后主体' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：规范读图顺序：先整体后局部、先主要后次要、先易懂后难懂。'   
            },
            {
                id: 'q9_5_6',
                type: 'single',
                question: '绘制徒手圆时，首先要确定的是（）',
                options: [
                    { key: 'A', value: '尺寸线' },
                    { key: 'B', value: '中心线与圆心' },
                    { key: 'C', value: '剖面线' },
                    { key: 'D', value: '技术要求' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：画圆需先确定圆心和对称中心线，再截取半径描线。'   
            },
            {
                id: 'q9_5_7',
                type: 'judge',
                question: '零件测绘时，实物上的砂眼、磨损等缺陷需要如实画在图纸上。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：零件缺陷不属于正常结构，绘图时必须省略，不得画出。'   
            },
            {
                id: 'q9_5_8',
                type: 'judge',
                question: '配合类重要尺寸需要精确测量，保证配合精度。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：相配合零件的基本尺寸必须一致，测量与标注都要保证精度。'
            },
            {
                id: 'q9_5_9',
                type: 'judge',
                question: '零件表达方案是固定不变，只能选择一种画法。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：零件表达方案不唯一，可设计多种方案，择优选用。'   
            },
            {
                id: 'q9_5_10',
                type: 'judge',
                question: '绘制徒手线条时，水平线一般按照从左到右的方向绘制。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：徒手绘图常规手法，水平线自左向右、垂直线自上而下绘制。'   
            },

            // ========== 9.6 零件的测量 ==========
            {
                id: 'q9_6_1',
                type: 'single',
                question: '零件测绘的最终成果是（）',
                options: [
                    { key: 'A', value: '零件草图' },
                    { key: 'B', value: '正式零件图' },
                    { key: 'C', value: '装配图' },
                    { key: 'D', value: '示意草图' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：测绘流程为先画草图，整理校对后绘制正式零件图，正式零件图为最终成果。'   
            },
            {
                id: 'q9_6_2',
                type: 'single',
                question: '测量零件内外直径，优先选用的工具组合是（）',
                options: [
                    { key: 'A', value: '直尺 + 量角器' },
                    { key: 'B', value: '卡钳 + 游标卡尺' },
                    { key: 'C', value: '螺纹千分尺 + 圆弧千分尺' },
                    { key: 'D', value: '高度千分尺 + 铅丝' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：内、外卡钳、游标卡尺、千分尺是测量直径的专用工具。'   
            },
            {
                id: 'q9_6_3',
                type: 'single',
                question: '绘制零件草图时，以下说法正确的是（）',
                options: [
                    { key: 'A', value: '必须使用直尺、圆规等仪器' },
                    { key: 'B', value: '徒手绘制，图线清晰、比例匀称即可' },
                    { key: 'C', value: '可以随意潦草绘制' },
                    { key: 'D', value: '不需要标注尺寸' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：草图以徒手绘制为主，要求投影正确、图线工整，严禁潦草，且必须完整标注尺寸。'   
            },
            {
                id: 'q9_6_4',
                type: 'single',
                question: '零件上非配合的小数尺寸，测绘标注时应（）',
                options: [
                    { key: 'A', value: '直接保留小数' },
                    { key: 'B', value: '圆整为整数' },
                    { key: 'C', value: '随意更改' },
                    { key: 'D', value: '放大一倍标注' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：测绘规范要求，非配合的小数尺寸统一圆整为整数标注。'   
            },
            {
                id: 'q9_6_5',
                type: 'single',
                question: '测量零件平面曲线、曲面，不适用的方法是（）',
                options: [
                    { key: 'A', value: '拓印法' },
                    { key: 'B', value: '铅丝模拟法' },
                    { key: 'C', value: '坐标法' },
                    { key: 'D', value: '直接估算' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：曲线、曲面可采用拓印、铅丝、坐标法测量，单纯估算误差过大，不符合测绘要求。'   
            },
            {
                id: 'q9_6_6',
                type: 'single',
                question: '绘制徒手圆时，首先要确定的是（）',
                options: [
                    { key: 'A', value: '尺寸线' },
                    { key: 'B', value: '中心线与圆心' },
                    { key: 'C', value: '剖面线' },
                    { key: 'D', value: '技术要求' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：画圆需先确定圆心和对称中心线，再截取半径描线。'   
            },
            {
                id: 'q9_6_7',
                type: 'judge',
                question: '零件测绘时，实物上的砂眼、磨损等缺陷需要如实画在图纸上。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：零件缺陷不属于正常结构，绘图时必须省略，不得画出。'   
            },
            {
                id: 'q9_6_8',
                type: 'judge',
                question: '配合类重要尺寸需要精确测量，保证配合精度。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：相配合零件的基本尺寸必须一致，测量与标注都要保证精度。'   
            },
            {
                id: 'q9_6_9',
                type: 'judge',
                question: '零件表达方案是固定不变，只能选择一种画法。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：零件表达方案不唯一，可设计多种方案，择优选用。'   
            },
            {
                id: 'q9_6_10',
                type: 'judge',
                question: '绘制徒手线条时，水平线一般按照从左到右的方向绘制。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：徒手绘图常规手法，水平线自左向右、垂直线自上而下绘制。'   
            },

            // ========== 10.1 表面结构 ==========
            {
                id: 'q10_1_1',
                type: 'single',
                question: '衡量零件表面微观峰谷特征、应用最广泛的评定参数是（）',
                options: [
                    { key: 'A', value: 'Ra' },
                    { key: 'B', value: 'Rz' },
                    { key: 'C', value: '波纹度' },
                    { key: 'D', value: '形状轮廓' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：轮廓算术平均偏差 Ra 是机械制图中使用范围最广的表面粗糙度评定参数。'   
            },
            {
                id: 'q10_1_2',
                type: 'single',
                question: '表示零件表面经过车、铣、磨等切削加工获得，应使用（）',
                options: [
                    { key: 'A', value: '基本符号' },
                    { key: 'B', value: '去除材料符号' },
                    { key: 'C', value: '不去除材料符号' },
                    { key: 'D', value: '带圆圈符号' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：去除材料符号对应切削、磨削等切除材料的加工方式。'   
            },
            {
                id: 'q10_1_3',
                type: 'single',
                question: '关于表面粗糙度数值说法正确的是（）',
                options: [
                    { key: 'A', value: '数值越大，表面越光滑' },
                    { key: 'B', value: '数值越小，加工精度越高' },
                    { key: 'C', value: '数值大小与加工成本无关' },
                    { key: 'D', value: '所有零件粗糙度数值必须统一' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：粗糙度参数值越小，表面峰谷差值越小，表面越光滑、加工精度越高，加工费用也越高。'   
            },
            {
                id: 'q10_1_4',
                type: 'single',
                question: '圆柱类零件的表面结构要求，正确标注要求是（）',
                options: [
                    { key: 'A', value: '每个素线都标注' },
                    { key: 'B', value: '整个圆柱面只标注一次' },
                    { key: 'C', value: '必须分上下两部分标注' },
                    { key: 'D', value: '只能用指引线标注' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：圆柱、棱柱等连续回转表面，表面结构要求只需要标注一次。'   
            },
            {
                id: 'q10_1_5',
                type: 'single',
                question: '零件全部表面粗糙度要求一致时，最佳标注方式是（）',
                options: [
                    { key: 'A', value: '每个表面逐一标注' },
                    { key: 'B', value: '在标题栏附近统一标注' },
                    { key: 'C', value: '只标注在主视图' },
                    { key: 'D', value: '省略不标注' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：大部分或全部表面要求相同时，可在标题栏附近统一做简化标注。'
            },
            {
                id: 'q10_1_6',
                type: 'single',
                question: '表面结构符号的正确指向要求是（）',
                options: [
                    { key: 'A', value: '脱离零件轮廓' },
                    { key: 'B', value: '从材料外部指向并接触表面' },
                    { key: 'C', value: '从材料内部向外标注' },
                    { key: 'D', value: '任意方向摆放' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：国标规定，表面结构符号需从材料外侧指向、接触零件表面。'   
            },
            {
                id: 'q10_1_7',
                type: 'judge',
                question: '表面结构基本图形符号单独使用时，具备完整的标注含义。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：基本图形符号单独使用无实际意义，必须搭配补充符号或参数使用。'   
            },
            {
                id: 'q10_1_8',
                type: 'judge',
                question: '表面结构的注写、读取方向，必须和尺寸标注方向保持一致。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：这是图样标注的基本规则，保证读图规范统一。'   
            },
            {
                id: 'q10_1_9',
                type: 'judge',
                question: '铸造、锻造毛坯表面，应选用不去除材料的表面结构符号。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：铸、锻、轧制等不切除材料的加工表面，使用不去除材料符号。'   
            },
            {
                id: 'q10_1_10',
                type: 'judge',
                question: '同一个零件表面，表面结构要求可以重复多次标注。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：规范要求，零件单个表面的表面结构要求一般只标注一次。'   
            },
            // ========== 10.2 极限与配合的基本概念及标注==========
            {
                id: 'q10_2_1',
                type: 'single',
                question: '基准孔的基本偏差代号是（）',
                options: [
                    { key: 'A', value: 'h' },
                    { key: 'B', value: 'H' },
                    { key: 'C', value: 'f' },
                    { key: 'D', value: 'F' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：基准孔基本偏差代号为H（下偏差EI=0），基准轴基本偏差代号为h（上偏差es=0）。'   
            },
            {
                id: 'q10_2_2',
                type: 'single',
                question: '配合标注 Φ<span style="display:inline-block;vertical-align:super;font-size:0.72em;line-height:1.2;margin-left:1px;"><span style="display:inline-block;vertical-align:middle;margin-right:2px;">30</span><span style="display:inline-block;vertical-align:middle;text-align:center;"><span style="display:block;">f7</span><span style="display:block;width:100%;border-top:1px solid #333;margin:1px 0;"></span><span style="display:block;">H8</span></span></span> ​属于（）。',
                options: [
                    { key: 'A', value: '基轴制间隙' },
                    { key: 'B', value: '基孔制间隙' },
                    { key: 'C', value: '基孔制过盈' },
                    { key: 'D', value: '基轴过渡' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：分子H为基准孔，f与H组成间隙配合，属于基孔制间隙配合。'   
            },
            {
                id: 'q10_2_3',
                type: 'single',
                question: '标准公差等级 IT 数字越大，则（）',
                options: [
                    { key: 'A', value: '精度越高，公差越小' },
                    { key: 'B', value: '精度越低，公差越大' },
                    { key: 'C', value: '无变化' },
                    { key: 'D', value: '精度不定' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：IT01精度最高，IT18精度最低，公差等级数字越大，公差值越大、精度越低。'   
            },
            {
                id: 'q10_2_4',
                type: 'single',
                question: '孔的上偏差符号为（）',
                options: [
                    { key: 'A', value: 'es' },
                    { key: 'B', value: 'EI' },
                    { key: 'C', value: 'ES' },
                    { key: 'D', value: 'ei' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：孔的上偏差符号为ES，下偏差为EI；轴的上偏差为es，下偏差为ei。'   
            },
            {
                id: 'q10_2_5',
                type: 'single',
                question: '孔轴公差带相互重叠是（）',
                options: [
                    { key: 'A', value: '间隙配合' },
                    { key: 'B', value: '过渡配合' },
                    { key: 'C', value: '过盈配合' },
                    { key: 'D', value: '任意配合' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：过渡配合的孔与轴公差带相互交叠，装配后可能出现间隙，也可能出现过盈。'   
            },
            {
                id: 'q10_2_6',
                type: 'single',
                question: '国家标准优先选用的配合制度是（）',
                options: [
                    { key: 'A', value: '基轴制' },
                    { key: 'B', value: '基孔制' },
                    { key: 'C', value: '任意制' },
                    { key: 'D', value: '混合制' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：孔加工刀具成本更高、规格更少，生产中优先选用基孔制配合。'   
            },
            {
                id: 'q10_2_7',
                type: 'judge',
                question: '尺寸公差数值可以是正数、零或者负数。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：尺寸公差上偏差−下偏差，代表尺寸允许的变动量，永远为正值。'   
            },
            {
                id: 'q10_2_8',
                type: 'judge',
                question: '基准轴 h 的上偏差 es=0。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：国标规定基准轴的上偏差es=0，是基轴制配合的基准件。'   
            },
            {
                id: 'q10_2_9',
                type: 'judge',
                question: '装配图配合标注，分母是孔公差带代号。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：装配图配合标注规则为分子写孔的公差带代号，分母写轴的公差带代号。'   
            },
            {
                id: 'q10_2_10',
                type: 'judge',
                question: '同尺寸段，IT7 公差大于 IT6。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：公差等级数字越大，对应公差值越大，同尺寸段下IT7的公差大于IT6。'   
            },
            // ========== 10.3 几何公差的基本概念及标注 ==========
            {
                id: 'q10_3_1',
                type: 'single',
                question: '下面属于形状公差且不需要基准的是（）',
                options: [
                    { key: 'A', value: '平行度' },
                    { key: 'B', value: '平面度' },
                    { key: 'C', value: '垂直度' },
                    { key: 'D', value: '同轴度' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：平面度是形状公差，无基准；平行、垂直为方向公差，同轴为位置公差，均带基准。'   
            },
            {
                id: 'q10_3_2',
                type: 'single',
                question: '几何公差框格第一个格子填写内容是（）',
                options: [
                    { key: 'A', value: '公差值' },
                    { key: 'B', value: '基准代号' },
                    { key: 'C', value: '公差项目符号' },
                    { key: 'D', value: '附加符号' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：框格左起第一格为特征符号，第二格为公差值，第三格为基准代号。'  
            },
            {
                id: 'q10_3_3',
                type: 'single',
                question: '标注轴线同轴度时，指引线箭头需要（）',
                options: [
                    { key: 'A', value: '搭在零件轮廓线上' },
                    { key: 'B', value: '与尺寸线对齐重合' },
                    { key: 'C', value: '任意摆放' },
                    { key: 'D', value: '指向空白处' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：管控轴线、中心平面时，指引线与对应尺寸线延长线重合。'   
            },
            {
                id: 'q10_3_4',
                type: 'single',
                question: '基准符号禁用字母不包含（）',
                options: [
                    { key: 'A', value: 'E' },
                    { key: 'B', value: 'A' },
                    { key: 'C', value: 'I' },
                    { key: 'D', value: 'O' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：禁用字母不包含A、E、I、J、M、O、P、L、R、F，A可正常用作基准。'   
            },
            {
                id: 'q10_3_5',
                type: 'single',
                question: '圆跳动属于哪一类几何公差（）',
                options: [
                    { key: 'A', value: '形状公差' },
                    { key: 'B', value: '方向公差' },
                    { key: 'C', value: '位置公差' },
                    { key: 'D', value: '跳动公差' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：跳动公差分为圆跳动、全跳动两类。'   
            },
            {
                id: 'q10_3_6',
                type: 'single',
                question: '图纸未标注几何公差，一般遵循国标（）',
                options: [
                    { key: 'A', value: 'GB/T1184-k' },
                    { key: 'B', value: 'GB/T1804-m' },
                    { key: 'C', value: 'GB700' },
                    { key: 'D', value: 'GB119' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：未注几何公差遵循GB/T1184-k，未注尺寸公差遵循GB/T1804-m。'   
            },
            {
                id: 'q10_3_7',
                type: 'judge',
                question: '垂直度属于方向公差，标注时必须设置基准。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：方向公差均需相对基准进行标注。'   
            },
            {
                id: 'q10_3_8',
                type: 'judge',
                question: '同一零件多个表面公差相同，不能共用一个公差框格。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：多处要素公差一致时，同一框格可引出多条指引线。'   
            },
            {
                id: 'q10_3_9',
                type: 'judge',
                question: '公差框格、指引线全部采用细实线绘制。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：国标规定框格、指引线线型均为细实线。'   
            },
            {
                id: 'q10_3_10',
                type: 'judge',
                question: '圆度标注箭头必须与尺寸线对齐。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：圆度管控外圆表面，箭头画在轮廓线或其延长线上。'   
            },

            // ========== 11.1 装配图的基本概念 ==========
            {
                id: 'q11_1_1',
                type: 'single',
                question: '产品设计绘图顺序正确的是（）',
                options: [
                    { key: 'A', value: '先零件图后装配图' },
                    { key: 'B', value: '先装配图后零件图' },
                    { key: 'C', value: '同时绘制' },
                    { key: 'D', value: '无先后顺序' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：设计时先画装配图，再拆画零件图。'   
            },
            {
                id: 'q11_1_2',
                type: 'single',
                question: '装配图视图主要目的不包含（）',
                options: [
                    { key: 'A', value: '表达装配原理' },
                    { key: 'B', value: '表达零件装配关系' },
                    { key: 'C', value: '标注零件全部加工尺寸' },
                    { key: 'D', value: '表达主要零件结构' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：尺寸标注属于独立板块，视图的核心作用是表达结构，不负责标注尺寸。'   
            },
            {
                id: 'q11_1_3',
                type: 'single',
                question: '装配图一共包含几项组成内容（）',
                options: [
                    { key: 'A', value: '2 项' },
                    { key: 'B', value: '3 项' },
                    { key: 'C', value: '4 项' },
                    { key: 'D', value: '5 项' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：包含一组视图、必要尺寸、技术要求、序号明细、标题栏，共四项。'   
            },
            {
                id: 'q11_1_4',
                type: 'single',
                question: '明细栏主要用来记录（）',
                options: [
                    { key: 'A', value: '图纸比例' },
                    { key: 'B', value: '零件名称、数量、材料' },
                    { key: 'C', value: '装配技术要求' },
                    { key: 'D', value: '部件外形尺寸' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：明细栏统计各个零部件的编号、名称、数量、材料、标准备注。'   
            },
            {
                id: 'q11_1_5',
                type: 'single',
                question: '下列不属于装配图作用的是（）',
                options: [
                    { key: 'A', value: '指导整机装配调试' },
                    { key: 'B', value: '指导设备检验' },
                    { key: 'C', value: '标注单件全部加工公差' },
                    { key: 'D', value: '体现设计思路' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：标注单件加工公差是零件图的作用，不属于装配图的功能范畴。'   
            },
            {
                id: 'q11_1_6',
                type: 'single',
                question: '装配图标注尺寸原则是（）',
                options: [
                    { key: 'A', value: '标注所有零件尺寸' },
                    { key: 'B', value: '只标注必要关键尺寸' },
                    { key: 'C', value: '只标外形尺寸' },
                    { key: 'D', value: '只标安装尺寸' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：装配图仅标注规格、装配、安装等必要尺寸，不标注零件细部尺寸。'   
            },
            {
                id: 'q11_1_7',
                type: 'judge',
                question: '装配图绘图需要完整画出每个零件所有结构细节。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：装配图只表达主要结构，无需画出零件全部细小结构。'   
            },
            {
                id: 'q11_1_8',
                type: 'judge',
                question: '装配图是机器装配、检修、安装的重要技术文件。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：装配图核心用途之一就是指导装配、设备维修与安装。'   
            },
            {
                id: 'q11_1_9',
                type: 'judge',
                question: '技术要求采用文字注明装配、验收、使用相关规定。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：技术要求用于写明装配标准、试验条件与使用规则。'   
            },
            {
                id: 'q11_1_10',
                type: 'judge',
                question: '装配图需要标注全部零件的加工尺寸。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：装配图只标注必要尺寸，零件完整尺寸在零件图中进行标注。'   
            },

            // ========== 11.2 装配图的表达方法 ==========
            {
                id: 'q11_2_1',
                type: 'single',
                question: '两个零件相互配合接触时，接触面轮廓线画法为（）',
                options: [
                    { key: 'A', value: '两条实线' },
                    { key: 'B', value: '一条实线' },
                    { key: 'C', value: '虚线' },
                    { key: 'D', value: '细点画线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：配合、接触面只画一条线，存在间隙时才画两条线。'   
            },
            {
                id: 'q11_2_2',
                type: 'single',
                question: '剖切平面沿螺栓轴线切开，螺栓绘图要求（）',
                options: [
                    { key: 'A', value: '画剖面线' },
                    { key: 'B', value: '不剖、不画剖面线' },
                    { key: 'C', value: '局部涂黑' },
                    { key: 'D', value: '全部剖开' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：轴、螺栓等实心件过轴线剖切时，按不剖绘制。'   
            },
            {
                id: 'q11_2_3',
                type: 'single',
                question: '为了表达被遮挡结构，去掉部分零件绘图的方法是（）',
                options: [
                    { key: 'A', value: '假想画法' },
                    { key: 'B', value: '拆卸画法' },
                    { key: 'C', value: '夸大画法' },
                    { key: 'D', value: '展开画法' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：拆卸画法通过拆除遮挡零件，直观表达内部结构。'   
            },
            {
                id: 'q11_2_4',
                type: 'single',
                question: '运动零件极限位置使用什么线型绘制（）',
                options: [
                    { key: 'A', value: '粗实线' },
                    { key: 'B', value: '细实线' },
                    { key: 'C', value: '细双点画线' },
                    { key: 'D', value: '虚线' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：假想画法采用细双点画线绘制相邻件、极限位置。'   
            },
            {
                id: 'q11_2_5',
                type: 'single',
                question: '厚度小于 2mm 的薄壁零件剖面处理方式（）',
                options: [
                    { key: 'A', value: '画剖面线' },
                    { key: 'B', value: '涂黑' },
                    { key: 'C', value: '省略不画' },
                    { key: 'D', value: '虚线填充' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：窄剖面零件国标规定可直接涂黑代替剖面线。'   
            },
            {
                id: 'q11_2_6',
                type: 'single',
                question: '微小装配间隙、薄垫片采用（）绘制',
                options: [
                    { key: 'A', value: '简化画法' },
                    { key: 'B', value: '夸大画法' },
                    { key: 'C', value: '假想画法' },
                    { key: 'D', value: '拆卸画法' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：尺寸过小无法按比例绘制时，选用夸大画法。' 
            },
            {
                id: 'q11_2_7',
                type: 'judge',
                question: '相邻两个零件的剖面线方向必须完全一致。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：相邻零件剖面线方向相反或间距不同，用以区分。'   
            },
            {
                id: 'q11_2_8',
                type: 'judge',
                question: '沿零件结合面剖切时，结合面位置不需要绘制剖面线。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：沿结合面剖切，结合面不画剖面线，被切断的零件正常画剖面线。'   
            },
            {
                id: 'q11_2_9',
                type: 'judge',
                question: '装配图中全部细小倒角、退刀槽结构必须逐一画出。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：简化画法允许省略细小工艺结构。'   
            },
            {
                id: 'q11_2_10',
                type: 'judge',
                question: '展开画法常用来表达传动件装配结构，视图标注展开字样。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：展开画法多用于传动部件，视图需注明 XX 展开。'   
            },

            // ========== 11.3 画装配图的方法和步骤 ==========
            {
                id: 'q11_3_1',
                type: 'single',
                question: '绘制零件草图时，下列哪类零件一般不需要绘制草图（）',
                options: [
                    { key: 'A', value: '轴承座' },
                    { key: 'B', value: '螺母螺栓等标准件' },
                    { key: 'C', value: '轴瓦' },
                    { key: 'D', value: '轴承盖' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：螺栓、螺母、垫圈等标准件只需标注国标代号，无需绘制零件草图。'   
            },
            {
                id: 'q11_3_2',
                type: 'single',
                question: '装配图主视图摆放遵循（）',
                options: [
                    { key: 'A', value: '任意摆放' },
                    { key: 'B', value: '按工作位置摆放' },
                    { key: 'C', value: '统一水平放置' },
                    { key: 'D', value: '统一竖直放置' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：主视图优先按照部件实际工作位置摆放。'   
            },
            {
                id: 'q11_3_3',
                type: 'single',
                question: '绘制剖视图形式的装配图，画图顺序一般为（）',
                options: [
                    { key: 'A', value: '由外向内' },
                    { key: 'B', value: '由内向外' },
                    { key: 'C', value: '先画细小零件' },
                    { key: 'D', value: '无固定顺序' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：绘制剖视图时，从内部核心零件向外逐层绘制。'   
            },
            {
                id: 'q11_3_4',
                type: 'single',
                question: '绘制装配图剖面线正确做法是（）',
                options: [
                    { key: 'A', value: '所有零件统一一个方向' },
                    { key: 'B', value: '一个零件一次性画完全部剖面线' },
                    { key: 'C', value: '零散随机绘制' },
                    { key: 'D', value: '同视图不同零件同向剖面线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：单个零件的剖面线一次画完，避免不同零件剖面线方向混淆。'   
            },
            {
                id: 'q11_3_5',
                type: 'single',
                question: '轴承座与轴承盖依靠什么零件锁紧固定（）',
                options: [
                    { key: 'A', value: '油杯' },
                    { key: 'B', value: '螺柱螺母垫圈' },
                    { key: 'C', value: '轴瓦' },
                    { key: 'D', value: '销套' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：螺柱、垫圈、螺母共同实现轴承座与轴承盖的连接固定。'   
            },
            {
                id: 'q11_3_6',
                type: 'single',
                question: '制定装配图表达方案，视图需要满足（）',
                options: [
                    { key: 'A', value: '完整、清楚、正确' },
                    { key: 'B', value: '视图越多越好' },
                    { key: 'C', value: '只用一个视图' },
                    { key: 'D', value: '优先外形不剖面' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：视图选择的三大要求：表达完整、看图清晰、画法合规正确。'   
            },
            {
                id: 'q11_3_7',
                type: 'judge',
                question: '有配合关系的零件，对应配合尺寸在各零件草图中标注数值必须一致。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：配套零件的关联尺寸需统一，保证装配后配合无误。'   
            },
            {
                id: 'q11_3_8',
                type: 'judge',
                question: '绘制装配图第一步直接画零件轮廓，不用布置图纸、画基准线。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：先要定图幅、做布局，绘制轴线、中心线等基准线后再画零件。'   
            },
            {
                id: 'q11_3_9',
                type: 'judge',
                question: '装配示意图可以梳理零件装配定位与连接关系。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：拆件后绘制示意图，可记录零件位置与装配关系。'   
            },
            {
                id: 'q11_3_10',
                type: 'judge',
                question: '滑动轴承油孔在零件加工阶段提前全部加工完毕，不用装配后再加工。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：技术要求注明，轴承装配完成后再加工油孔。'   
            },

            // ========== 11.4 装配图的尺寸标注和技术要求 ==========
            {
                id: 'q11_4_1',
                type: 'single',
                question: '用来表达装配体性能规格的尺寸是（）',
                options: [
                    { key: 'A', value: '外形尺寸' },
                    { key: 'B', value: '特征尺寸' },
                    { key: 'C', value: '安装尺寸' },
                    { key: 'D', value: '配合尺寸' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：特征尺寸即规格尺寸，决定部件性能，在设计初期确定。'   
            },
            {
                id: 'q11_4_2',
                type: 'single',
                question: 'Φ14H11/c11 这类带配合代号的尺寸属于（）',
                options: [
                    { key: 'A', value: '安装尺寸' },
                    { key: 'B', value: '配合尺寸' },
                    { key: 'C', value: '总体尺寸' },
                    { key: 'D', value: '规格尺寸' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：配合尺寸用于标注零件配合性质，采用公差配合代号标注。'   
            },
            {
                id: 'q11_4_3',
                type: 'single',
                question: '机器落地固定所需地脚孔尺寸属于（）',
                options: [
                    { key: 'A', value: '装配尺寸' },
                    { key: 'B', value: '安装尺寸' },
                    { key: 'C', value: '特征尺寸' },
                    { key: 'D', value: '其他尺寸' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：安装尺寸用于部件与机架、基础之间的安装固定。'   
            },
            {
                id: 'q11_4_4',
                type: 'single',
                question: '装配体总长、总宽、总高是（）',
                options: [
                    { key: 'A', value: '外形尺寸' },
                    { key: 'B', value: '相对位置尺寸' },
                    { key: 'C', value: '检验尺寸' },
                    { key: 'D', value: '规格尺寸' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：外形尺寸即总体尺寸，用于运输、空间布置参考。'   
            },
            {
                id: 'q11_4_5',
                type: 'single',
                question: '运动零件极限活动范围尺寸归类为（）',
                options: [
                    { key: 'A', value: '安装尺寸' },
                    { key: 'B', value: '其他重要尺寸' },
                    { key: 'C', value: '配合尺寸' },
                    { key: 'D', value: '特征尺寸' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：运动极限尺寸、关键零件结构尺寸统一划为其他重要尺寸。'   
            },
            {
                id: 'q11_4_6',
                type: 'single',
                question: '装配图技术要求不含下面哪一项（）',
                options: [
                    { key: 'A', value: '加工零件表面粗糙度' },
                    { key: 'B', value: '装配要求' },
                    { key: 'C', value: '检验要求' },
                    { key: 'D', value: '使用要求' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：表面粗糙度属于零件图标注内容，装配图技术要求分为装配、检验、使用三类。'   
            },
            {
                id: 'q11_4_7',
                type: 'judge',
                question: '装配图需要标注所有零件的全部细部加工尺寸。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：装配图只标注五类关键尺寸，不标注零件细小结构尺寸。'   
            },
            {
                id: 'q11_4_8',
                type: 'judge',
                question: '零件间重要的位置尺寸属于装配尺寸范畴。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：装配尺寸包含配合尺寸、相对位置尺寸两种。'   
            },
            {
                id: 'q11_4_9',
                type: 'judge',
                question: '技术要求文字一般写在明细栏上方或图纸空白处。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：内容过多可另附文件，图纸仅标注对应文件编号。'   
            },
            {
                id: 'q11_4_10',
                type: 'judge',
                question: '产品外形尺寸属于装配尺寸。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：外形尺寸为单独分类，不属于装配尺寸。'   
            },

            // ========== 11.5 装配图中的序号、明细栏和标题栏 ==========
            {
                id: 'q11_5_1',
                type: 'single',
                question: '装配图中结构、尺寸、材料全部相同的零件，序号标注要求是（）',
                options: [
                    { key: 'A', value: '每个零件单独编号' },
                    { key: 'B', value: '共用同一个序号，只标一次' },
                    { key: 'C', value: '随便编号' },
                    { key: 'D', value: '按数量编多个号' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：同规格零件统一序号，视图中只标注一处，数量写入明细栏。'   
            },
            {
                id: 'q11_5_2',
                type: 'single',
                question: '序号指引线、横线所用线型为（）',
                options: [
                    { key: 'A', value: '粗实线' },
                    { key: 'B', value: '细实线' },
                    { key: 'C', value: '虚线' },
                    { key: 'D', value: '细点画线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：规范要求指引线与横线全部采用细实线绘制。'   
            },
            {
                id: 'q11_5_3',
                type: 'single',
                question: '零件剖面涂黑时，指引线末端使用（）',
                options: [
                    { key: 'A', value: '实心圆点' },
                    { key: 'B', value: '箭头' },
                    { key: 'C', value: '空白圆圈' },
                    { key: 'D', value: '短横线' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：涂黑零件无法绘制圆点，改用箭头指向零件轮廓。'   
            },
            {
                id: 'q11_5_4',
                type: 'single',
                question: '明细栏内零件序号的填写顺序是（）',
                options: [
                    { key: 'A', value: '从上往下' },
                    { key: 'B', value: '自下而上' },
                    { key: 'C', value: '随机填写' },
                    { key: 'D', value: '从中间向两边' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：国标规定明细栏序号自下而上填写。'   
            },
            {
                id: 'q11_5_5',
                type: 'single',
                question: '滚动轴承、电动机这类标准化组件在装配图中编号规则（）',
                options: [
                    { key: 'A', value: '内部零件逐个编号' },
                    { key: 'B', value: '整体只编一个序号' },
                    { key: 'C', value: '不用编号' },
                    { key: 'D', value: '按零件数量编号' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：成套标准部件统一作为一个零件，只标注单个序号。'   
            },
            {
                id: 'q11_5_6',
                type: 'single',
                question: '序号标注的数字大小需要比尺寸数字（）',
                options: [
                    { key: 'A', value: '小一号' },
                    { key: 'B', value: '大一号或两号' },
                    { key: 'C', value: '字号一致' },
                    { key: 'D', value: '大三号以上' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：序号数字字号大于尺寸数字 1～2 号。'   
            },
            {
                id: 'q11_5_7',
                type: 'judge',
                question: '零件指引线绘制时可以和剖面线互相平行。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：规范禁止指引线与剖面线平行布置。'   
            },
            {
                id: 'q11_5_8',
                type: 'judge',
                question: '紧固螺钉组成的零件组，可以共用一条指引线标注序号。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：装配关系明确的零件组，允许共用一条指引线。'   
            },
            {
                id: 'q11_5_9',
                type: 'judge',
                question: '装配图标题栏的格式与零件图标题栏格式相同。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：教材明确装配图与零件图的标题栏格式一致。'   
            },
            {
                id: 'q11_5_10',
                type: 'judge',
                question: '零件序号只能沿着逆时针方向整齐排列。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：序号可按顺时针或逆时针两种顺序排布。'   
            },

            // ========== 11.6 常见装配结构简图 ==========
            {
                id: 'q11_6_1',
                type: 'single',
                question: '零件装配时，同一轴线方向上零件接触面数量要求为（）',
                options: [
                    { key: 'A', value: '两对接触面' },
                    { key: 'B', value: '只能一对接触面' },
                    { key: 'C', value: '越多越好' },
                    { key: 'D', value: '无限制' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：教材规定同一方向仅能设置一对接触面，多面接触难以加工与装配。'   
            },
            {
                id: 'q11_6_2',
                type: 'single',
                question: '两个配合零件转角处，不能同时采用（）',
                options: [
                    { key: 'A', value: '一倒角一圆角' },
                    { key: 'B', value: '同尖角/同圆角' },
                    { key: 'C', value: '一端开退刀槽' },
                    { key: 'D', value: '一端倒角' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：转角同为圆角或尖角会造成端面无法贴合，属于错误结构。'   
            },
            {
                id: 'q11_6_3',
                type: 'single',
                question: '滚动轴承拆装设计，错误做法是（）',
                options: [
                    { key: 'A', value: '轴肩尺寸过高' },
                    { key: 'B', value: '合理高度轴肩' },
                    { key: 'C', value: '箱体孔留拆卸空间' },
                    { key: 'D', value: '控制孔径大小' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：轴肩过高会卡死轴承内圈，导致轴承无法拆卸。'   
            },
            {
                id: 'q11_6_4',
                type: 'single',
                question: '螺钉紧固箱体结构，箱体侧壁与螺钉孔之间需要（）',
                options: [
                    { key: 'A', value: '不留空隙' },
                    { key: 'B', value: '预留扳手操作空间' },
                    { key: 'C', value: '紧密贴合' },
                    { key: 'D', value: '任意尺寸' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：需预留操作空间，保证扳手、工具能正常拧紧螺钉。'   
            },
            {
                id: 'q11_6_5',
                type: 'single',
                question: '销钉定位结构，便于拆装的销孔形式是（）',
                options: [
                    { key: 'A', value: '盲孔' },
                    { key: 'B', value: '通孔' },
                    { key: 'C', value: '半圆孔' },
                    { key: 'D', value: '沉孔' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：通孔可从销子另一端顶出，方便拆卸；盲孔销拆卸难度大。'   
            },
            {
                id: 'q11_6_6',
                type: 'single',
                question: '轴上齿轮采用螺母垫圈锁紧时，垫圈与轴肩之间应当（）',
                options: [
                    { key: 'A', value: '紧密无间隙' },
                    { key: 'B', value: '留有装配间隙' },
                    { key: 'C', value: '过盈压紧' },
                    { key: 'D', value: '点焊固定' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：预留间隙才能依靠螺母压紧齿轮，无间隙则无法实现锁紧。'   
            },
            {
                id: 'q11_6_7',
                type: 'judge',
                question: '设计装配结构时，可在同一方向设置多处同时接触面。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：同一方向只允许一对接触面，多处接触会导致装配不可靠。'   
            },
            {
                id: 'q11_6_8',
                type: 'judge',
                question: '填料配合压盖是常用的轴端密封结构。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：依靠压盖挤压填料实现轴伸部位密封，是教材中的典型密封结构实例。'   
            },
            {
                id: 'q11_6_9',
                type: 'judge',
                question: '为了定位牢固，轴承安装轴肩越高结构越合理。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：轴肩过高会阻碍轴承拆卸，属于不合理结构。'   
            },
            {
                id: 'q11_6_10',
                type: 'judge',
                question: '减小零件有效接触面积可以简化零件加工工艺。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：合理缩减接触面，可减少精加工面积，降低加工难度。'   
            },

            // ========== 11.7 读装配图 ==========
            {
                id: 'q11_7_1',
                type: 'single',
                question: '下列不属于读装配图基本要求的是（）',
                options: [
                    { key: 'A', value: '了解装配体工作原理' },
                    { key: 'B', value: '弄清零件拆装顺序' },
                    { key: 'C', value: '现场加工零部件' },
                    { key: 'D', value: '看懂图纸技术要求' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：读图要求不包含现场加工，其余均为教材规定的读图核心内容。'   
            },
            {
                id: 'q11_7_2',
                type: 'single',
                question: '从装配图（）中可以查询零件名称、数量信息（）',
                options: [
                    { key: 'A', value: '标题栏' },
                    { key: 'B', value: '明细栏' },
                    { key: 'C', value: '技术要求' },
                    { key: 'D', value: '视图' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：明细栏记录零件序号、名称、数量、材料；标题栏记录部件名称、比例、技术要求。'   
            },
            {
                id: 'q11_7_3',
                type: 'single',
                question: '齿轮油泵中泵盖与泵体依靠什么零件定位（）',
                options: [
                    { key: 'A', value: '螺钉' },
                    { key: 'B', value: '销' },
                    { key: 'C', value: '螺塞' },
                    { key: 'D', value: '垫片' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：螺钉起紧固作用，圆柱销实现泵盖与泵体的精确定位。'   
            },
            {
                id: 'q11_7_4',
                type: 'single',
                question: '齿轮轴与泵盖轴孔φ15H7/h7属于（）',
                options: [
                    { key: 'A', value: '过盈配合' },
                    { key: 'B', value: '间隙配合' },
                    { key: 'C', value: '过渡配合' },
                    { key: 'D', value: '螺纹配合' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：该配合为间隙配合，齿轮轴能够在孔内自由旋转。'   
            },
            {
                id: 'q11_7_5',
                type: 'single',
                question: '泵盖与泵体之间的垫片主要作用是（）',
                options: [
                    { key: 'A', value: '固定零件' },
                    { key: 'B', value: '密封防漏油' },
                    { key: 'C', value: '定位' },
                    { key: 'D', value: '调节尺寸' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：垫片属于密封元件，防止油泵结合面渗漏液压油。'   
            },
            {
                id: 'q11_7_6',
                type: 'single',
                question: '读装配图首要步骤是（）',
                options: [
                    { key: 'A', value: '拆分零件结构' },
                    { key: 'B', value: '概括了解全图信息' },
                    { key: 'C', value: '分析配合公差' },
                    { key: 'D', value: '分析密封结构' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：读图第一步为概括了解，从标题栏、明细栏、视图入手。'   
            },
            {
                id: 'q11_7_7',
                type: 'judge',
                question: '分析部件工作原理是阅读装配图的重要环节。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：教材明确，分析工作原理与传动关系是读图的关键步骤。'   
            },
            {
                id: 'q11_7_8',
                type: 'judge',
                question: '齿轮油泵拆卸时，需要优先拆掉圆柱定位销。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：拆装齿轮油泵时，销子一般不需要从泵盖上拆下。'   
            },
            {
                id: 'q11_7_9',
                type: 'judge',
                question: '装配图标题栏可以查看装配体名称和绘图比例。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：概括读图环节，标题栏用于查看部件名称、图纸比例等基础信息。'   
            },
            {
                id: 'q11_7_10',
                type: 'judge',
                question: '填料 + 螺塞用于齿轮油泵齿轮轴伸出端的密封。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：轴端填料、螺塞压紧结构，用于防止轴伸处润滑油外泄。'   
            },

            // ========== 11.8 由装配图拆画零件图  ==========
            {
                id: 'q11_8_1',
                type: 'single',
                question: '由装配图拆画零件图时，标准件的处理方式是（）',
                options: [
                    { key: 'A', value: '必须绘制零件图' },
                    { key: 'B', value: '不需画零件图，只需列出汇总表' },
                    { key: 'C', value: '按借用零件处理' },
                    { key: 'D', value: '自行设计结构画图' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：标准件不画零件图，按明细栏规定标记列出汇总表即可。'   
            },
            {
                id: 'q11_8_2',
                type: 'single',
                question: '拆画轴套类零件时，主视图应按照（）确定',
                options: [
                    { key: 'A', value: '装配图中的摆放位置' },
                    { key: 'B', value: '加工位置原则' },
                    { key: 'C', value: '工作位置原则' },
                    { key: 'D', value: '随意选择' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：轴套类零件主视图按加工位置原则确定，不可照搬装配图位置。'   
            },
            {
                id: 'q11_8_3',
                type: 'single',
                question: '装配图上已标注的零件尺寸，拆画时应（）',
                options: [
                    { key: 'A', value: '重新测量修改' },
                    { key: 'B', value: '直接抄注，不得随意修改' },
                    { key: 'C', value: '根据经验调整' },
                    { key: 'D', value: '四舍五入取整' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：装配图已注出的零件尺寸应直接抄注，不得随意改动。'   
            },
            {
                id: 'q11_8_4',
                type: 'single',
                question: '零件上倒角、退刀槽等标准化结构尺寸，应通过（）确定',
                options: [
                    { key: 'A', value: '直接量取' },
                    { key: 'B', value: '查标准手册' },
                    { key: 'C', value: '凭经验估算' },
                    { key: 'D', value: '计算得出' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：标准化结构尺寸需查阅相关标准手册获取准确数值。'   
            },
            {
                id: 'q11_8_5',
                type: 'single',
                question: '装配图中省略的倒角、圆角等工艺结构，在零件图中应（）',
                options: [
                    { key: 'A', value: '继续省略' },
                    { key: 'B', value: '完整清晰画出' },
                    { key: 'C', value: '简单示出' },
                    { key: 'D', value: '视情况决定' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：装配图可省略细小工艺结构，零件图必须完整清晰画出。'   
            },
            {
                id: 'q11_8_6',
                type: 'single',
                question: '零件的材料应从装配图的（）中获取',
                options: [
                    { key: 'A', value: '标题栏' },
                    { key: 'B', value: '明细栏' },
                    { key: 'C', value: '技术要求' },
                    { key: 'D', value: '尺寸标注' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：零件材料信息在装配图的明细栏中给出。'   
            },
            {
                id: 'q11_8_7',
                type: 'judge',
                question: '借用定型产品的零件，一般不需要重新绘制零件图。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：借用零件已有现成图样，无需重复绘制。'
            },
            {
                id: 'q11_8_8',
                type: 'judge',
                question: '拆画零件图时，可以直接照搬装配图中零件的表达方案。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：不能盲目照抄，应按零件类型重新确定合理的表达方案。'
            },
            {
                id: 'q11_8_9',
                type: 'judge',
                question: '装配图上未标注的一般结构尺寸，可按比例从图中量取并取标准值。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：未注尺寸可按比例量取，取整数或对应标准值。'
            },
            {
                id: 'q11_8_10',
                type: 'judge',
                question: '齿轮的分度圆直径应根据模数、齿数等参数计算确定。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：分度圆直径需通过模数、齿数计算得出，不可直接量取。'
            },
        ],

        // 液压与气压传动测试题
        hydraulic: [
            {
                id: 'q3_3_1',
                type: 'single',
                question: '液压传动中，动力元件的主要作用是什么？',
                options: [
                    { key: 'A', value: '控制液体流量' },
                    { key: 'B', value: '将机械能转换为液压能' },
                    { key: 'C', value: '储存液压油' },
                    { key: 'D', value: '过滤液压油' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：动力元件（如液压泵）的主要作用是将机械能转换为液压能。'   
            },
            {
                id: 'q3_3_2',
                type: 'single',
                question: '下列哪种液压阀用于控制液压系统的压力？',
                options: [
                    { key: 'A', value: '方向控制阀' },
                    { key: 'B', value: '流量控制阀' },
                    { key: 'C', value: '压力控制阀' },
                    { key: 'D', value: '比例控制阀' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：压力控制阀用于控制液压系统的压力，如溢流阀、减压阀等。'   
            },
            {
                id: 'q3_3_3',
                type: 'single',
                question: '液压系统中，执行元件的作用是（　）',
                options: [
                    { key: 'A', value: '提供压力' },
                    { key: 'B', value: '将液压能转换为机械能' },
                    { key: 'C', value: '控制油液流动方向' },
                    { key: 'D', value: '储存压力' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：执行元件（液压缸、液压马达）将液压能转换为机械能，驱动负载运动。'   
            },
            {
                id: 'q3_3_4',
                type: 'judge',
                question: '液压传动具有传动平稳、冲击小、能实现无级调速等优点。（）',
                answer: 'true',
                explanation: '参考答案：√<br>解析：液压传动确实具有这些优点，广泛应用于各种机械设备中。'   
            },
            {
                id: 'q3_3_5',
                type: 'judge',
                question: '气压传动的工作压力一般比液压传动高。（）',
                answer: 'false',
                explanation: '参考答案：×<br>解析：气压传动的工作压力一般较低（通常在0.4-0.8MPa），而液压传动的工作压力较高（通常在几MPa到几十MPa）。'   
            },
        ],

        // 工程训练测试题       
        engineering: [
            // ========== 1.1 工程材料的分类==========
            {
                id: 'q1_1_1',
                type: 'single',
                question: '工程材料按化学成分通常分为哪三大类？',
                options: [
                    { key: 'A', value: '金属材料、非金属材料、复合材料' },
                    { key: 'B', value: '结构材料、功能材料、智能材料' },
                    { key: 'C', value: '黑色金属、有色金属、高分子材料' },
                    { key: 'D', value: '天然材料、合成材料、混合材料' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：工程材料按化学成分主要分为金属材料、非金属材料和复合材料三大类。'   
            },
            {
                id: 'q1_1_2',
                type: 'single',
                question: '下列哪项属于黑色金属？',
                options: [
                    { key: 'A', value: '铜合金' },
                    { key: 'B', value: '铝合金' },
                    { key: 'C', value: '铸铁' },
                    { key: 'D', value: '镁合金' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：黑色金属主要指铁和铁基合金，如钢、铸铁。'   
            },
            {
                id: 'q1_1_3',
                type: 'single',
                question: '以下哪种材料属于有机非金属材料？',
                options: [
                    { key: 'A', value: '氧化铝陶瓷' },
                    { key: 'B', value: '碳化硅' },
                    { key: 'C', value: '聚乙烯塑料' },
                    { key: 'D', value: '玻璃纤维' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：有机非金属材料主要指高分子材料，如塑料、橡胶、纤维等。'   
            },
            {
                id: 'q1_1_4',
                type: 'single',
                question: '复合材料的主要特点是？',
                options: [
                    { key: 'A', value: '只能由两种金属组成' },
                    { key: 'B', value: '各组分材料在宏观上保持独立，性能互补' },
                    { key: 'C', value: '必须含有纤维增强体' },
                    { key: 'D', value: '密度一定比单一材料低' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：复合材料由两种或多种不同性质的材料复合而成，各组分宏观独立，性能互补。'   
            },
            {
                id: 'q1_1_5',
                type: 'single',
                question: '下列材料中，导电性最好的是：',
                options: [
                    { key: 'A', value: '橡胶' },
                    { key: 'B', value: '陶瓷' },
                    { key: 'C', value: '铜' },
                    { key: 'D', value: '塑料' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：铜是典型的金属材料，具有优良的导电性。'   
            },
            {
                id: 'q1_1_6',
                type: 'single',
                question: '工程材料按使用性能可分为：',
                options: [
                    { key: 'A', value: '结构材料和功能材料' },
                    { key: 'B', value: '金属和非金属' },
                    { key: 'C', value: '天然和合成' },
                    { key: 'D', value: '有机和无机' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：按使用性能分为结构材料（以力学性能为主）和功能材料（以电、磁、光、热等功能为主）。'      
            },
            {
                id: 'q1_1_7',
                type: 'single',
                question: '下列哪项属于无机非金属材料？',
                options: [
                    { key: 'A', value: '尼龙' },
                    { key: 'B', value: '金刚石' },
                    { key: 'C', value: '丁腈橡胶' },
                    { key: 'D', value: '聚氯乙烯' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：金刚石是碳的结晶体，属于无机非金属材料（陶瓷类）。'   
            },
            {
                id: 'q1_1_8',
                type: 'single',
                question: '下列材料中，耐高温性能最好的是：',
                options: [
                    { key: 'A', value: '普通碳钢' },
                    { key: 'B', value: '铝合金' },
                    { key: 'C', value: '氧化铝陶瓷' },
                    { key: 'D', value: '聚乙烯' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：氧化铝陶瓷熔点高、耐高温；铝合金和普通碳钢耐温较低。'   
            },
            {
                id: 'q1_1_9',
                type: 'single',
                question: '关于复合材料的说法，错误的是：',
                options: [
                    { key: 'A', value: '玻璃钢是典型的复合材料' },
                    { key: 'B', value: '复合材料只能由两种材料组成' },
                    { key: 'C', value: '复合材料可具有轻质高强的特点' },
                    { key: 'D', value: '复合材料的性能优于单一组成材料' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：复合材料可以由两种或多种材料组成，并非只能两种。'   
            },
            {
                id: 'q1_1_10',
                type: 'single',
                question: '工程中常用的“不锈钢”属于哪类材料：',
                options: [
                    { key: 'A', value: '有机非金属材料' },
                    { key: 'B', value: '复合材料' },
                    { key: 'C', value: '有色金属' },
                    { key: 'D', value: '金属材料' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：不锈钢是铁基合金，属于金属材料中的黑色金属。'   
            },

            // ========== 1.2 金属材料 ==========
            {
                id: 'q1_2_1',
                type: 'single',
                question: '金属材料中，体心立方晶格的典型代表是：',
                options: [
                    { key: 'A', value: '铝' },
                    { key: 'B', value: '铜' },
                    { key: 'C', value: 'α-Fe' },
                    { key: 'D', value: '镁' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：α-Fe（铁素体）在912℃以下具有体心立方晶格。'   
            },
            {
                id: 'q1_2_2',
                type: 'single',
                question: '下列哪种金属的密度最小：',
                options: [
                    { key: 'A', value: '铁' },
                    { key: 'B', value: '铜' },
                    { key: 'C', value: '铝' },
                    { key: 'D', value: '镁' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：镁的密度约1.74g/cm³，是最轻的结构金属之一。'   
            },
            {
                id: 'q1_2_3',
                type: 'single',
                question: '金属材料具有良好的导电性是因为：',
                options: [
                    { key: 'A', value: '原子间金属键的作用' },
                    { key: 'B', value: '自由电子的存在' },
                    { key: 'C', value: '晶格排列整齐' },
                    { key: 'D', value: '无杂质' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：金属中存在大量自由电子，在外电场作用下定向移动形成电流。'   
            },
            {
                id: 'q1_2_4',
                type: 'single',
                question: '下列哪项不是金属材料的力学性能指标：',
                options: [
                    { key: 'A', value: '屈服强度' },
                    { key: 'B', value: '热导率' },
                    { key: 'C', value: '断后伸长率' },
                    { key: 'D', value: '硬度' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：热导率是热物理性能，不是力学性能。'   
            },
            {
                id: 'q1_2_5',
                type: 'single',
                question: '纯铁在室温下的晶体结构是：',
                options: [
                    { key: 'A', value: '面心立方' },
                    { key: 'B', value: '体心立方' },
                    { key: 'C', value: '密排六方' },
                    { key: 'D', value: '正交晶系' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：室温下纯铁为体心立方结构（α-Fe）。'   
            },
            {
                id: 'q1_2_6',
                type: 'single',
                question: '下列金属中，耐腐蚀性最好的是：',
                options: [
                    { key: 'A', value: '碳钢' },
                    { key: 'B', value: '铸铁' },
                    { key: 'C', value: '不锈钢' },
                    { key: 'D', value: '纯铝' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：不锈钢因含铬等元素，表面形成致密氧化膜，耐腐蚀性优异。'   
            },
            {
                id: 'q1_2_7',
                type: 'single',
                question: '金属材料的塑性通常用哪个指标表示？',
                options: [
                    { key: 'A', value: '弹性模量' },
                    { key: 'B', value: '断后伸长率' },
                    { key: 'C', value: '疲劳极限' },
                    { key: 'D', value: '抗拉强度' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：断后伸长率和断面收缩率是衡量塑性的主要指标。'   
            },
            {
                id: 'q1_2_8',
                type: 'single',
                question: '下列哪种金属材料常用于制造导线？',
                options: [
                    { key: 'A', value: '铸铁' },
                    { key: 'B', value: '钨' },
                    { key: 'C', value: '铜' },
                    { key: 'D', value: '铅' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：铜导电性优异且价格适中，是制造电线电缆的首选材料。'   
            },
            {
                id: 'q1_2_9',
                type: 'single',
                question: '金属材料在高温下长期服役会发生：',
                options: [
                    { key: 'A', value: '低温脆性' },
                    { key: 'B', value: '蠕变' },    
                    { key: 'C', value: '氢脆' },
                    { key: 'D', value: '应力腐蚀' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：蠕变是指金属在恒定温度和恒定应力下随时间发生缓慢塑性变形的现象。'   
            },
            {
                id: 'q1_2_10',
                type: 'single',
                question: '下列哪项属于有色金属：',
                options: [
                    { key: 'A', value: '45钢' },
                    { key: 'B', value: 'HT250' },
                    { key: 'C', value: 'ZCuSn10P1' },
                    { key: 'D', value: 'Q235' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：ZCuSn10P1是锡青铜，铜基合金属于有色金属。'   
            },

            // ========== 1.3 非金属材料 ==========
            {
                id: 'q1_3_1',
                type: 'single',
                question: '下列哪项属于热塑性塑料？',
                options: [
                    { key: 'A', value: '酚醛树脂' },
                    { key: 'B', value: '环氧树脂' },
                    { key: 'C', value: '聚乙烯' },
                    { key: 'D', value: '脲醛树脂' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：聚乙烯可反复加热软化、冷却硬化，是热塑性塑料。'   
            },
            {
                id: 'q1_3_2',
                type: 'single',
                question: '普通陶瓷的主要原料不包括：',
                options: [
                    { key: 'A', value: '粘土' },
                    { key: 'B', value: '石英' },
                    { key: 'C', value: '长石' },
                    { key: 'D', value: '石墨' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：普通陶瓷原料主要为粘土、石英、长石；石墨属于碳素材料。'   
            },
            {
                id: 'q1_3_3',
                type: 'single',
                question: '橡胶通常需要经过什么工艺才能具有高弹性？',
                options: [
                    { key: 'A', value: '塑炼' },
                    { key: 'B', value: '硫化' },
                    { key: 'C', value: '混炼' },
                    { key: 'D', value: '压延' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：硫化使线性橡胶分子交联成三维网络结构，从而获得优良的弹性。'   
            },
            {
                id: 'q1_3_4',
                type: 'single',
                question: '下列非金属材料中，耐热性最好的是：',
                options: [
                    { key: 'A', value: '尼龙6' },
                    { key: 'B', value: '聚四氟乙烯' },
                    { key: 'C', value: '氧化铝陶瓷' },
                    { key: 'D', value: '丁苯橡胶' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：氧化铝陶瓷熔点达2000℃，可在高温下使用。'   
            },
            {
                id: 'q1_3_5',
                type: 'single',
                question: '玻璃的主要成分是：',
                options: [
                    { key: 'A', value: '二氧化硅' },
                    { key: 'B', value: '氧化铝' },
                    { key: 'C', value: '碳酸钠' },
                    { key: 'D', value: '氧化钙' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：普通玻璃以二氧化硅（石英）为主。'   
            },
            {
                id: 'q1_3_6',
                type: 'single',
                question: '下列哪种塑料被称为“塑料王”，具有极低的摩擦系数？',
                options: [
                    { key: 'A', value: '聚氯乙烯' },
                    { key: 'B', value: '聚苯乙烯' },
                    { key: 'C', value: '聚四氟乙烯' },
                    { key: 'D', value: '聚丙烯' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：聚四氟乙烯（PTFE）耐腐蚀、自润滑、摩擦系数极低，被称为“塑料王”。'   
            },
            {
                id: 'q1_3_7',
                type: 'single',
                question: '高分子材料的聚合度越大，一般其：',
                options: [
                    { key: 'A', value: '强度越高，熔点越低' },
                    { key: 'B', value: '强度越高，熔点越高' },
                    { key: 'C', value: '强度越低，熔点越高' },
                    { key: 'D', value: '强度越低，熔点越低' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：聚合度增大，分子间作用力增强，强度、硬度和熔点均提高。'   
            },
            {
                id: 'q1_3_8',
                type: 'single',
                question: '下列哪项不属于工程陶瓷的优点？',
                options: [
                    { key: 'A', value: '高硬度' },
                    { key: 'B', value: '耐高温' },
                    { key: 'C', value: '易于加工' },
                    { key: 'D', value: '耐腐蚀' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：陶瓷材料硬度高、脆性大，加工困难。'   
            },
            {
                id: 'q1_3_9',
                type: 'single',
                question: '碳纤维复合材料通常属于：',
                options: [
                    { key: 'A', value: '金属基复合材料' },
                    { key: 'B', value: '聚合物基复合材料' },
                    { key: 'C', value: '陶瓷基复合材料' },
                    { key: 'D', value: '碳基复合材料' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：碳纤维常与环氧树脂等聚合物基体复合。'   
            },
            {
                id: 'q1_3_10',
                type: 'single',
                question: '下列非金属材料中，具有自润滑性的是：',
                options: [
                    { key: 'A', value: '普通玻璃' },
                    { key: 'B', value: '聚四氟乙烯' },
                    { key: 'C', value: '天然橡胶' },
                    { key: 'D', value: '酚醛塑料' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：聚四氟乙烯摩擦系数极低，具有优异的自润滑性。'   
            },

            // ========== 1.4 复合材料 ==========
            {
                id: 'q1_4_1',
                type: 'single',
                question: '复合材料中起主要承载作用的部分是：',
                options: [
                    { key: 'A', value: '基体' },
                    { key: 'B', value: '增强体' },
                    { key: 'C', value: '界面' },
                    { key: 'D', value: '添加剂' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：增强体承担主要载荷，基体起粘结和传递载荷的作用。'   
            },
            {
                id: 'q1_4_2',
                type: 'single',
                question: '玻璃纤维增强塑料的俗称是：',
                options: [
                    { key: 'A', value: '碳纤维' },
                    { key: 'B', value: '玻璃钢' },
                    { key: 'C', value: '凯夫拉' },
                    { key: 'D', value: '铝塑板' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：玻璃钢即玻璃纤维增强塑料（FRP）。'   
            },
            {
                id: 'q1_4_3',
                type: 'single',
                question: '下列哪项属于颗粒增强复合材料？',
                options: [
                    { key: 'A', value: '碳纤维/环氧树脂' },
                    { key: 'B', value: '碳化硅颗粒增强铝基复合材料' },
                    { key: 'C', value: '层压板' },
                    { key: 'D', value: '芳纶纤维/橡胶' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：颗粒增强复合材料以颗粒作为增强相。'   
            },
            {
                id: 'q1_4_4',
                type: 'single',
                question: '复合材料按增强体形态分类不包括：',
                options: [
                    { key: 'A', value: '纤维增强' },
                    { key: 'B', value: '颗粒增强' },
                    { key: 'C', value: '层状增强' },
                    { key: 'D', value: '分子增强' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：复合材料按增强体形态分为纤维增强、颗粒增强和层状增强三类。'   
            },
            {
                id: 'q1_4_5',
                type: 'single',
                question: '碳纤维复合材料的突出优点是：',
                options: [
                    { key: 'A', value: '密度大' },
                    { key: 'B', value: '导电性差' },
                    { key: 'C', value: '比强度和比模量高' },
                    { key: 'D', value: '易于加工' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：碳纤维密度小、强度高、模量高，比强度和比模量远超金属材料。'   
            },
            {
                id: 'q1_4_6',
                type: 'single',
                question: '复合材料中界面结合不良可能导致：',
                options: [
                    { key: 'A', value: '整体强度提高' },
                    { key: 'B', value: '韧性增加' },
                    { key: 'C', value: '脱粘和分层' },
                    { key: 'D', value: '密度降低' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：界面结合不良会导致脱粘或层间分层，降低力学性能。'   
            },
            {
                id: 'q1_4_7',
                type: 'single',
                question: '下列哪种材料是天然复合材料？',
                options: [
                    { key: 'A', value: '钢筋混凝土' },
                    { key: 'B', value: '木材' },
                    { key: 'C', value: '玻璃钢' },
                    { key: 'D', value: '碳/碳复合材料' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：木材由纤维素纤维增强木质素基体组成，是天然形成的复合材料。'   
            },
            {
                id: 'q1_4_8',
                type: 'single',
                question: '金属基复合材料的主要特点是：',
                options: [
                    { key: 'A', value: '使用温度低' },
                    { key: 'B', value: '比刚度高，横向性能好' },
                    { key: 'C', value: '不可焊接' },
                    { key: 'D', value: '只能用颗粒增强' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：金属基复合材料具有高比强度、高比刚度、良好的横向性能和耐高温性能。'   
            },
            {
                id: 'q1_4_9',
                type: 'single',
                question: '下列哪项是复合材料的共同缺点？',
                options: [
                    { key: 'A', value: '密度大' },
                    { key: 'B', value: '成本低' },
                    { key: 'C', value: '各向异性明显' },
                    { key: 'D', value: '耐腐蚀性差' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：多数复合材料因增强体定向排列而具有各向异性。'   
            },
            {
                id: 'q1_4_10',
                type: 'single',
                question:  '“混杂复合材料”是指：',
                options: [
                    { key: 'A', value: '含有两种以上增强相的复合材料' },
                    { key: 'B', value: '含有两种以上基体的复合材料' },
                    { key: 'C', value: '含有金属和陶瓷的复合材料' },
                    { key: 'D', value: '含有纤维和颗粒的复合材料' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：混杂复合材料指采用两种或多种不同增强材料同时增强同一基体。'   
            },

            // ========== 2.1 型砂和芯砂 ==========
            {
                id: 'q2_1_1',
                type: 'single',
                question: '型砂中起粘结作用的主要成分是：',
                options: [
                    { key: 'A', value: '石英砂' },
                    { key: 'B', value: '粘土' },
                    { key: 'C', value: '煤粉' },
                    { key: 'D', value: '水' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：粘土（如膨润土）是型砂的粘结剂，使砂粒粘结在一起形成强度。'   
            },
            {
                id: 'q2_1_2',
                type: 'single',
                question: '下列哪项不是对型砂的基本要求？',
                options: [
                    { key: 'A', value: '透气性' },
                    { key: 'B', value: '耐火性' },
                    { key: 'C', value: '导电性' },
                    { key: 'D', value: '可塑性' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：型砂需要透气性、耐火度、可塑性、强度等，不需要导电性。'   
            },
            {
                id: 'q2_1_3',
                type: 'single',
                question: '芯砂与型砂的主要区别在于芯砂通常需要更高的：',
                options: [
                    { key: 'A', value: '透气性' },
                    { key: 'B', value: '退让性' },
                    { key: 'C', value: '强度' },
                    { key: 'D', value: '耐火度' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：芯砂制成的砂芯在铸件收缩时需有良好的退让性，以防裂纹。'   
            },
            {
                id: 'q2_1_4',
                type: 'single',
                question: '湿型砂中常用的粘土类型是：',
                options: [
                    { key: 'A', value: '高岭土' },
                    { key: 'B', value: '钠基膨润土' },
                    { key: 'C', value: '伊利石' },
                    { key: 'D', value: '叶蜡石' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：钠基膨润土吸水膨胀性好、粘结力强，广泛用于湿型砂。'   
            },
            {
                id: 'q2_1_5',
                type: 'single',
                question: '型砂中加入煤粉的主要作用是：',
                options: [
                    { key: 'A', value: '提高强度' },
                    { key: 'B', value: '防止铸件粘砂' },
                    { key: 'C', value: '降低透气性' },
                    { key: 'D', value: '加快冷却' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：煤粉在浇注时燃烧生成还原性气体和光亮碳膜，防止金属液与砂粒粘结。'   
            },
            {
                id: 'q2_1_6',
                type: 'single',
                question: '芯砂常用的粘结剂不包括：',
                options: [
                    { key: 'A', value: '植物油' },
                    { key: 'B', value: '合成树脂' },
                    { key: 'C', value: '水泥' },
                    { key: 'D', value: '水玻璃' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：芯砂常用有机粘结剂（植物油、树脂）或无机粘结剂（水玻璃、粘土）；水泥一般用于型砂。'   
            },
            {
                id: 'q2_1_7',
                type: 'single',
                question: '型砂的透气性过高可能导致：',
                options: [
                    { key: 'A', value: '铸件产生气孔' },
                    { key: 'B', value: '铸件产生砂眼' },
                    { key: 'C', value: '浇注时金属液渗入砂粒间隙' },
                    { key: 'D', value: '砂型强度下降' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：透气性过高通常意味着砂粒间隙大或粘结剂少，导致砂型强度降低。'   
            },
            {
                id: 'q2_1_8',
                type: 'single',
                question: '测试型砂湿压强度的目的是评估：',
                options: [
                    { key: 'A', value: '耐火度' },
                    { key: 'B', value: '成型后抵抗外力破坏的能力' },
                    { key: 'C', value: '水分含量' },
                    { key: 'D', value: '发气性' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：湿压强度反映型砂在潮湿状态下的承载能力，确保起模、搬运和浇注时不损坏。'   
            },
            {
                id: 'q2_1_9',
                type: 'single',
                question: '下列哪种芯砂固化后需经烘烤才能使用？',
                options: [
                    { key: 'A', value: '自硬树脂砂' },
                    { key: 'B', value: '热芯盒砂' },
                    { key: 'C', value: '油砂' },
                    { key: 'D', value: '冷芯盒砂' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：油砂（桐油砂、合脂砂）需在200~300℃烘烤固化。'   
            },
            {
                id: 'q2_1_10',
                type: 'single',
                question: '型砂中水分过多会导致：',
                options: [
                    { key: 'A', value: '透气性提高' },
                    { key: 'B', value: '强度增加' },
                    { key: 'C', value: '铸件产生气孔' },
                    { key: 'D', value: '耐火度提高' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：水分过多时浇注产生大量水蒸气，若排气不畅则形成侵入性气孔。'   
            },

            // ========== 2.2 常用造型方法 ==========
            {
                id: 'q2_2_1',
                type: 'single',
                question: '手工造型中最基本的造型方法是：',
                options: [
                    { key: 'A', value: '整模造型' },
                    { key: 'B', value: '分模造型' },
                    { key: 'C', value: '挖砂造型' },
                    { key: 'D', value: '活块造型' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：整模造型适用于形状简单、最大截面在一端的铸件，是最基础的手工造型方法。'   
            },
            {
                id: 'q2_2_2',
                type: 'single',
                question: '对于形状复杂、有中空结构的铸件，通常采用：',
                options: [
                    { key: 'A', value: '刮板造型' },
                    { key: 'B', value: '地坑造型' },
                    { key: 'C', value: '芯造型' },
                    { key: 'D', value: '两箱造型' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：芯造型（使用砂芯形成内腔或复杂形状）适用于复杂铸件。'   
            },
            {
                id: 'q2_2_3',
                type: 'single',
                question: '机器造型常用的方法中，高压造型的主要优点是：',
                options: [
                    { key: 'A', value: '设备简单' },
                    { key: 'B', value: '铸件尺寸精度高' },
                    { key: 'C', value: '透气性好' },
                    { key: 'D', value: '适用单件生产' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：高压造型使砂型紧实度高且均匀，铸件尺寸精度高、表面光洁。'   
            },
            {
                id: 'q2_2_4',
                type: 'single',
                question: '挖砂造型主要用于：',
                options: [
                    { key: 'A', value: '单件生产的分模面为曲面时' },
                    { key: 'B', value: '大批量生产的简单铸件' },
                    { key: 'C', value: '大型铸件的地坑造型' },
                    { key: 'D', value: '所有铸件均可' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：当铸件分模面为曲面且无合适的分型面时，采用挖砂造型。'   
            },
            {
                id: 'q2_2_5',
                type: 'single',
                question: '下列哪项不是机器造型相对于手工造型的优势？',
                options: [
                    { key: 'A', value: '生产效率高' },
                    { key: 'B', value: '铸件质量稳定' },
                    { key: 'C', value: '设备投资低' },
                    { key: 'D', value: '劳动强度小' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：机器造型设备投资大，适用于大批量生产；手工造型设备投资低。'   
            },
            {
                id: 'q2_2_6',
                type: 'single',
                question: '地坑造型适用于：',
                options: [
                    { key: 'A', value: '大型单件铸件' },
                    { key: 'B', value: '小型复杂铸件' },
                    { key: 'C', value: '大批量小型铸件' },
                    { key: 'D', value: '所有铸件' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：地坑造型在地面挖坑制型，省去砂箱，适合超大型单件或小批量铸件。'   
            },
            {
                id: 'q2_2_7',
                type: 'single',
                question: '在造型中，分型面选择的基本原则不包括：',
                options: [
                    { key: 'A', value: '尽量平直' },
                    { key: 'B', value: '尽量使铸件全部位于下箱' },
                    { key: 'C', value: '尽量减少分型面数量' },
                    { key: 'D', value: '便于起模' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：通常尽量使重要加工面或主要工作面位于下箱或侧立，但并非必须全部位于下箱。'   
            },
            {
                id: 'q2_2_8',
                type: 'single',
                question: '消失模铸造（实型铸造）的特点是：',
                options: [
                    { key: 'A', value: '需要起模' },
                    { key: 'B', value: '使用泡沫塑料模型，模型不取出直接浇注' },
                    { key: 'C', value: '只能生产铝合金铸件' },
                    { key: 'D', value: '必须用金属型' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：消失模铸造使用泡沫塑料模型，造型后不取出，浇注时模型气化消失。'   
            },
            {
                id: 'q2_2_9',
                type: 'single',
                question: '金属型铸造的缺点是：',
                options: [
                    { key: 'A', value: '铸件精度低' },
                    { key: 'B', value: '型腔寿命短' },
                    { key: 'C', value: '成本高、制造周期长' },
                    { key: 'D', value: '只适用于黑色金属' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：金属型模具制造复杂、成本高、周期长，适用于大批量生产。'   
            },
            {
                id: 'q2_2_10',
                type: 'single',
                question: '下列哪种造型方法最适宜生产大批量小型铸钢件：',
                options: [
                    { key: 'A', value: '手工湿型砂造型' },
                    { key: 'B', value: '壳型造型' },
                    { key: 'C', value: '地坑造型' },
                    { key: 'D', value: '刮板造型' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：壳型造型使用树脂覆膜砂，生产率高、铸件精度高，适用于大批量小型铸钢件。'   
            },

            // ========== 2.3 合金的熔炼 ==========
            {
                id: 'q2_3_1',
                type: 'single',
                question: '铸铁熔炼最常用的设备是：',
                options: [
                    { key: 'A', value: '电弧炉' },
                    { key: 'B', value: '感应炉' },
                    { key: 'C', value: '冲天炉' },
                    { key: 'D', value: '坩埚炉' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：冲天炉是熔炼铸铁的传统常用设备，热效率高、连续生产能力强。'   
            },
            {
                id: 'q2_3_2',
                type: 'single',
                question: '冲天炉熔炼时，焦炭的作用是：',
                options: [
                    { key: 'A', value: '造渣' },
                    { key: 'B', value: '燃料和产生还原性气氛' },
                    { key: 'C', value: '增碳' },
                    { key: 'D', value: '降低熔点' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：焦炭在冲天炉中主要作为燃料提供热量，同时燃烧产生CO还原性气氛。'   
            },
            {
                id: 'q2_3_3',
                type: 'single',
                question: '钢的熔炼中，碱性电弧炉能有效：',
                options: [
                    { key: 'A', value: '提高熔炼速度' },
                    { key: 'B', value: '脱硫脱磷' },
                    { key: 'C', value: '降低能量消耗' },
                    { key: 'D', value: '提高碳含量' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：碱性电弧炉采用碱性炉衬（镁砂），可进行造渣脱磷、脱硫。'   
            },
            {
                id: 'q2_3_4',
                type: 'single',
                question: '铝合金熔炼时，通常使用什么炉型？',
                options: [
                    { key: 'A', value: '冲天炉' },
                    { key: 'B', value: '坩埚炉或反射炉' },
                    { key: 'C', value: '转炉' },
                    { key: 'D', value: '平炉' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：铝熔点低、易氧化，常用坩埚炉或反射炉。'   
            },
            {
                id: 'q2_3_5',
                type: 'single',
                question: '熔炼过程中，加入熔剂（如石灰石）的主要目的是：',
                options: [
                    { key: 'A', value: '降低金属熔化温度' },
                    { key: 'B', value: '形成炉渣，去除杂质' },
                    { key: 'C', value: '增加合金元素' },
                    { key: 'D', value: '提高流动性' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：熔剂与金属中氧化物、硫化物等杂质结合成低熔点炉渣，浮于金属液表面被除去。'   
            },
            {
                id: 'q2_3_6',
                type: 'single',
                question: '球墨铸铁熔炼时，需加入球化剂，常用的球化剂是：',
                options: [
                    { key: 'A', value: '硅铁' },
                    { key: 'B', value: '锰铁' },
                    { key: 'C', value: '镁或稀土合金' },
                    { key: 'D', value: '铬铁' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：镁或稀土（如钇）能使石墨呈球状，显著提高铸铁的强度和韧性。'   
            },
            {
                id: 'q2_3_7',
                type: 'single',
                question: '感应电炉熔炼的优点不包括：',
                options: [
                    { key: 'A', value: '熔炼速度较快' },
                    { key: 'B', value: '成分控制精确' },
                    { key: 'C', value: '对炉料形状要求高' },
                    { key: 'D', value: '环境污染小' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：感应电炉对炉料形状和大小有一定要求（需能装入坩埚），这是一个缺点。'   
            },
            {
                id: 'q2_3_8',
                type: 'single',
                question: '下列哪种合金熔炼时容易产生吸气（氢）问题？',
                options: [
                    { key: 'A', value: '铸铁' },
                    { key: 'B', value: '铸钢' },
                    { key: 'C', value: '铜合金' },
                    { key: 'D', value: '铝合金' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：铝合金液易吸收氢气，导致铸件产生针孔，熔炼时需除气处理。'   
            },
            {
                id: 'q2_3_9',
                type: 'single',
                question: '炉前检验中，三角试块法常用于快速判断：',
                options: [
                    { key: 'A', value: '钢的脱氧程度' },
                    { key: 'B', value: '铸铁的石墨形态和牌号' },
                    { key: 'C', value: '铝合金的含氢量' },
                    { key: 'D', value: '铜合金的流动性' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：三角试块冷却后观察断口颜色、白口深度等，可快速判断灰铸铁、球墨铸铁的牌号。'   
            },
            {
                id: 'q2_3_10',
                type: 'single',
                question: '熔炼过程中，脱氧处理主要针对：',
                options: [
                    { key: 'A', value: '铸铁' },
                    { key: 'B', value: '铸钢' },
                    { key: 'C', value: '铝合金' },
                    { key: 'D', value: '铜合金' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：钢液含氧量高会降低力学性能，常用硅铁、铝等脱氧处理。'   
            },

            // ========== 2.4 铸件的浇注、落砂、清理及缺陷分析 ==========
            {
                id: 'q2_4_1',
                type: 'single',
                question: '浇注时，为避免金属液氧化和吸气，应尽量采用：',
                options: [
                    { key: 'A', value: '高温快速浇注' },
                    { key: 'B', value: '高温慢速浇注' },
                    { key: 'C', value: '低温快速浇注' },
                    { key: 'D', value: '低温慢速浇注' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：高温快速浇注可减少金属液与空气接触时间，降低氧化和吸气倾向。'   
            },
            {
                id: 'q2_4_2',
                type: 'single',
                question: '铸件落砂过早会导致：',
                options: [
                    { key: 'A', value: '铸件裂纹或变形' },
                    { key: 'B', value: '粘砂严重' },
                    { key: 'C', value: '气孔增多' },
                    { key: 'D', value: '硬度降低' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：落砂过早，铸件冷却速度快且不均匀，内应力大，易产生裂纹、变形。'   
            },
            {
                id: 'q2_4_3',
                type: 'single',
                question: '铸件清理工序不包括：',
                options: [
                    { key: 'A', value: '去除浇冒口' },
                    { key: 'B', value: '表面清砂' },
                    { key: 'C', value: '热处理' },
                    { key: 'D', value: '去除飞边毛刺' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：热处理是独立的后续工序；清理包括去除浇冒口、清砂、打磨飞边等。'   
            },
            {
                id: 'q2_4_4',
                type: 'single',
                question: '铸件产生缩孔的主要原因是：',
                options: [
                    { key: 'A', value: '浇注温度过高' },
                    { key: 'B', value: '金属液凝固收缩得不到补充' },
                    { key: 'C', value: '型砂透气性差' },
                    { key: 'D', value: '浇注速度过快' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：缩孔是由于金属液凝固时体积收缩，若冒口补缩不足，则在铸件最后凝固处形成孔洞。'   
            },
            {
                id: 'q2_4_5',
                type: 'single',
                question: '铸件气孔的特征是：',
                options: [
                    { key: 'A', value: '表面光滑的圆形孔洞，颜色与铸件不同' },
                    { key: 'B', value: '形状不规则的孔洞，内壁粗糙' },
                    { key: 'C', value: '贯穿性裂纹' },
                    { key: 'D', value: '表面凹坑' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：气孔内壁光滑，常呈圆形或椭圆形；缩孔内壁粗糙。'   
            },
            {
                id: 'q2_4_6',
                type: 'single',
                question: '铸件产生冷隔的主要原因是：',
                options: [
                    { key: 'A', value: '金属液流动性差或浇注温度低' },
                    { key: 'B', value: '型砂强度不足' },
                    { key: 'C', value: '浇注速度过快' },
                    { key: 'D', value: '冒口尺寸过大' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：冷隔是两股金属液相遇未融合形成缝隙，常因浇温低、速度慢或浇注系统设计不当导致。'   
            },
            {
                id: 'q2_4_7',
                type: 'single',
                question: '防止铸件产生粘砂的措施不包括：',
                options: [
                    { key: 'A', value: '涂刷涂料' },
                    { key: 'B', value: '提高型砂耐火度' },
                    { key: 'C', value: '降低浇注温度' },
                    { key: 'D', value: '增大砂型紧实度' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：增大紧实度可能降低透气性，反而可能加剧粘砂。'   
            },
            {
                id: 'q2_4_8',
                type: 'single',
                question: '下列哪项属于铸件内部缺陷：',
                options: [
                    { key: 'A', value: '砂眼' },
                    { key: 'B', value: '气孔' },
                    { key: 'C', value: '飞边' },
                    { key: 'D', value: '错型' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：气孔位于铸件内部或皮下；砂眼可能表面或内部；飞边、错型是外观缺陷。'   
            },
            {
                id: 'q2_4_9',
                type: 'single',
                question: '对铸件进行无损检测时，检查内部缩松和裂纹最常用的方法是：',
                options: [
                    { key: 'A', value: '磁粉探伤' },
                    { key: 'B', value: '渗透探伤' },
                    { key: 'C', value: '射线探伤（X射线或γ射线）' },
                    { key: 'D', value: '超声波测厚' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：射线探伤可显示内部缩松、气孔、裂纹等缺陷。'   
            },
            {
                id: 'q2_4_10',
                type: 'single',
                question: '铸件出现“偏芯”缺陷（型芯位置偏移）主要是由于：',
                options: [
                    { key: 'A', value: '芯撑不足或定位不牢' },
                    { key: 'B', value: '浇注温度过高' },
                    { key: 'C', value: '型砂水分过多' },
                    { key: 'D', value: '落砂过早' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：芯撑数量不足、位置不当或固定不牢，浇注时浮力使砂芯偏移，导致壁厚不均。'   
            },

            // ========== 3.1 金属加热与锻件冷却==========
            {
                id: 'q3_1_1',
                type: 'single',
                question: '金属锻造前加热的目的是：',
                options: [
                    { key: 'A', value: '提高硬度' },
                    { key: 'B', value: '提高塑性，降低变形抗力' },
                    { key: 'C', value: '细化晶粒' },
                    { key: 'D', value: '去除表面氧化皮' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：加热使金属塑性提高、变形抗力降低，便于锻造成形。'   
            },
            {
                id: 'q3_1_2',
                type: 'single',
                question: '钢的锻造温度范围是指：',
                options: [
                    { key: 'A', value: '室温到再结晶温度' },
                    { key: 'B', value: '始锻温度到终锻温度' },
                    { key: 'C', value: '熔点以下100℃' },
                    { key: 'D', value: '奥氏体化温度以上' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：锻造温度范围是始锻温度（最高允许加热温度）与终锻温度（停止锻造温度）之间的区间。'   
            },
            {
                id: 'q3_1_3',
                type: 'single',
                question: '过烧是指金属加热到：',
                options: [
                    { key: 'A', value: '晶粒急剧粗化但可恢复' },
                    { key: 'B', value: '晶界氧化或熔化，无法修复' },
                    { key: 'C', value: '表面氧化严重' },
                    { key: 'D', value: '产生内应力' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：过烧时晶界发生氧化或局部熔化，锻件报废；过热可经热处理恢复。'   
            },
            {
                id: 'q3_1_4',
                type: 'single',
                question: '高碳钢的始锻温度一般比低碳钢：',
                options: [
                    { key: 'A', value: '高' },
                    { key: 'B', value: '低' },
                    { key: 'C', value: '相同' },
                    { key: 'D', value: '取决于锻造方式' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：高碳钢过热倾向大，始锻温度较低（约1100~1150℃），低碳钢可达1200~1250℃。'   
            },
            {
                id: 'q3_1_5',
                type: 'single',
                question: '锻件冷却方式中，防止白点产生最有效的措施是：',
                options: [
                    { key: 'A', value: '空冷' },
                    { key: 'B', value: '坑冷' },
                    { key: 'C', value: '炉冷（缓慢冷却）' },
                    { key: 'D', value: '喷雾冷却' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：炉冷（随炉缓冷）可减少内应力，防止氢致白点。'   
            },
            {
                id: 'q3_1_6',
                type: 'single',
                question: '金属加热时表面氧化皮的形成主要与什么有关？',
                options: [
                    { key: 'A', value: '加热温度和时间' },
                    { key: 'B', value: '金属种类' },
                    { key: 'C', value: '炉内气氛' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：氧化皮程度取决于温度、时间、钢种以及炉气氧化性。'   
            },
            {
                id: 'q3_1_7',
                type: 'single',
                question: '终锻温度过高会导致：',
                options: [
                    { key: 'A', value: '锻件内应力大' },
                    { key: 'B', value: '晶粒粗大，力学性能下降' },
                    { key: 'C', value: '变形抗力增大' },
                    { key: 'D', value: '易产生裂纹' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：终锻温度过高时停止锻造，晶粒未再结晶细化，得到粗大晶粒。'   
            },
            {
                id: 'q3_1_8',
                type: 'single',
                question: '铝合金锻造加热时，炉气气氛宜采用：',
                options: [
                    { key: 'A', value: '强氧化性' },
                    { key: 'B', value: '中性或微还原性' },
                    { key: 'C', value: '强还原性' },
                    { key: 'D', value: '任意' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：铝易氧化，应采用中性或微还原性气氛，减少氧化烧损。'   
            },
            {
                id: 'q3_1_9',
                type: 'single',
                question: '锻件冷却时，若冷却速度过快，易产生：',
                options: [
                    { key: 'A', value: '氧化皮' },
                    { key: 'B', value: '裂纹或白点' },
                    { key: 'C', value: '硬度降低' },
                    { key: 'D', value: '晶粒长大' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：快冷产生较大热应力和组织应力，可能导致裂纹或白点。'   
            },
            {
                id: 'q3_1_10',
                type: 'single',
                question: '测量锻件加热温度常用的方法是：',
                options: [
                    { key: 'A', value: '热电偶' },
                    { key: 'B', value: '目测火色' },
                    { key: 'C', value: '红外测温' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：现场常用目测火色（经验），也可用热电偶、红外仪精确测量。'   
            },

            // ========== 3.2 自由锻造 ==========
            {
                id: 'q3_2_1',
                type: 'single',
                question: '自由锻造的基本工序中，使截面减小、长度增加的工序是：',
                options: [
                    { key: 'A', value: '镦粗' },
                    { key: 'B', value: '拔长' },
                    { key: 'C', value: '冲孔' },
                    { key: 'D', value: '扩孔' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：拔长通过反复轴向送进和压缩，使坯料截面减小、长度增加。'   
            },
            {
                id: 'q3_2_2',
                type: 'single',
                question: '镦粗的主要目的是：',
                options: [
                    { key: 'A', value: '增加长度' },
                    { key: 'B', value: '减小截面，增大高度' },
                    { key: 'C', value: '改善内部组织，增大端面' },
                    { key: 'D', value: '冲孔' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：镦粗使坯料高度减小、横截面积增大，常用于饼块类锻件，并可击碎铸态组织。'   
            },
            {
                id: 'q3_2_3',
                type: 'single',
                question: '自由锻造中，芯轴拔长主要用于锻造：',
                options: [
                    { key: 'A', value: '实心轴' },
                    { key: 'B', value: '圆环' },
                    { key: 'C', value: '筒类锻件' },
                    { key: 'D', value: '齿轮坯' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：芯轴拔长（又称马杠扩孔）是在芯轴上拔长空心坯料，生产筒形锻件。'   
            },
            {
                id: 'q3_2_4',
                type: 'single',
                question: '下列哪种缺陷是自由锻造容易产生的：',
                options: [
                    { key: 'A', value: '折叠' },
                    { key: 'B', value: '偏心' },
                    { key: 'C', value: '裂纹' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：自由锻造操作不当可产生折叠、裂纹、偏心、端面凹陷等缺陷。'   
            },
            {
                id: 'q3_2_5',
                type: 'single',
                question: '自由锻造时，坯料加热后第一次锤击应：',
                options: [
                    { key: 'A', value: '轻打' },
                    { key: 'B', value: '重打' },
                    { key: 'C', value: '逐渐加重' },
                    { key: 'D', value: '随意' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：开始应轻打，使坯料表面均匀变形，避免裂纹；随后重打以锻透心部。'   
            },
            {
                id: 'q3_2_6',
                type: 'single',
                question: '自由锻造适用于：',
                options: [
                    { key: 'A', value: '大批量生产' },
                    { key: 'B', value: '单件小批量及大型锻件' },
                    { key: 'C', value: '精密成形' },
                    { key: 'D', value: '所有锻件' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：自由锻造灵活性高、工模具简单，适于单件小批、大型及重型锻件。'   
            },
            {
                id: 'q3_2_7',
                type: 'single',
                question: '下列哪个工序不属于自由锻造基本工序？',
                options: [
                    { key: 'A', value: '弯曲' },
                    { key: 'B', value: '扭转' },
                    { key: 'C', value: '模锻' },
                    { key: 'D', value: '切割' }
                ],
                answer: 'C',    
                explanation: '参考答案：C<br>解析：模锻属于模型锻造，不是自由锻造的基本工序。'   
            },
            {
                id: 'q3_2_8',
                type: 'single',
                question: '自由锻造冲孔时，为防止孔偏心，应：',
                options: [
                    { key: 'A', value: '先镦粗后冲孔' },
                    { key: 'B', value: '先拔长后冲孔' },
                    { key: 'C', value: '直接冲孔' },
                    { key: 'D', value: '加热到高温一次冲成' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：先镦粗使坯料端面平整、直径增大，利于冲孔定位，减少偏心。'   
            },
            {
                id: 'q3_2_9',
                type: 'single',
                question: '锻造比是指：',
                options: [
                    { key: 'A', value: '锻件重量与坯料重量之比' },
                    { key: 'B', value: '变形前后截面积比或长度比' },
                    { key: 'C', value: '加热温度与室温之比' },
                    { key: 'D', value: '锤击次数' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：锻造比常用拔长时的锻造比=坯料截面积/锻件截面积，或镦粗时的高度比。'   
            },
            {
                id: 'q3_2_10',
                type: 'single',
                question: '自由锻造中，为防止拔长时产生折叠，应：',
                options: [
                    { key: 'A', value: '每次送进量大于压下量' },
                    { key: 'B', value: '每次送进量小于压下量' },
                    { key: 'C', value: '采用圆角砧' },
                    { key: 'D', value: '增大锤击力' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：送进量大于压下量可避免金属流动形成折叠。'   
            },

            // ========== 3.3 模型锻造 ==========
            {
                id: 'q3_3_1',
                type: 'single',
                question: '模型锻造（模锻）与自由锻造的主要区别是：',
                options: [
                    { key: 'A', value: '使用模具使坯料成形' },
                    { key: 'B', value: '锻件精度低' },
                    { key: 'C', value: '只能生产小型锻件' },
                    { key: 'D', value: '无需加热' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：模锻使用模具约束金属流动，获得接近成品形状的锻件。'   
            },
            {
                id: 'q3_3_2',
                type: 'single',
                question: '锤上模锻常用的设备是：',
                options: [
                    { key: 'A', value: '蒸汽空气锤' },
                    { key: 'B', value: '螺旋压力机' },
                    { key: 'C', value: '曲柄压力机' },
                    { key: 'D', value: '液压机' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：锤上模锻常用蒸汽空气锤，冲击力大。'   
            },
            {
                id: 'q3_3_3',
                type: 'single',
                question: '模锻时设置飞边槽的作用是：',
                options: [
                    { key: 'A', value: '容纳多余金属' },
                    { key: 'B', value: '阻碍金属流出，保证模膛充满' },
                    { key: 'C', value: '减小变形抗力' },
                    { key: 'D', value: '便于取出锻件' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：飞边槽的桥部产生阻力，迫使金属充满模膛；同时容纳多余金属形成飞边。'   
            },
            {
                id: 'q3_3_4',
                type: 'single',
                question: '模锻斜度（拔模斜度）的作用是：',
                options: [
                    { key: 'A', value: '便于锻件从模具中取出' },
                    { key: 'B', value: '提高锻件精度' },
                    { key: 'C', value: '减小模具磨损' },
                    { key: 'D', value: '增加成形压力' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：模锻斜度使锻件侧壁有斜度，便于从模膛中取出，防止卡模。'   
            },
            {
                id: 'q3_3_5',
                type: 'single',
                question: '下列哪项是模锻的优点：',
                options: [
                    { key: 'A', value: '材料利用率高' },
                    { key: 'B', value: '模具成本低' },
                    { key: 'C', value: '适合单件生产' },
                    { key: 'D', value: '锻件内部质量好且尺寸精确' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：模锻尺寸精度高、余量小、内部组织致密；但模具成本高，适于大批量生产。'   
            },
            {
                id: 'q3_3_6',
                type: 'single',
                question: '模锻件上常见的分模面是指：',
                options: [
                    { key: 'A', value: '上下模具的分界面' },
                    { key: 'B', value: '飞边切断位置' },
                    { key: 'C', value: '锻件中心面' },
                    { key: 'D', value: '热处理面' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：分模面是上下模的分界面，锻件在此面产生飞边。'   
            },
            {
                id: 'q3_3_7',
                type: 'single',
                question: '在模锻中，预锻模膛的作用是：',
                options: [
                    { key: 'A', value: '最终成形' },
                    { key: 'B', value: '初步分配金属，减少终锻模膛磨损' },
                    { key: 'C', value: '切断飞边' },
                    { key: 'D', value: '冲孔' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：预锻使金属接近最终形状，减小终锻模膛的变形量，延长模具寿命。'   
            },
            {
                id: 'q3_3_8',
                type: 'single',
                question: '模锻件产生折叠缺陷的主要原因是：',
                options: [
                    { key: 'A', value: '坯料尺寸过大' },
                    { key: 'B', value: '金属流动不合理或模具设计不当' },
                    { key: 'C', value: '加热温度过低' },
                    { key: 'D', value: '锤击次数过多' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：折叠是表层金属汇合而未熔合，多因模具圆角小、坯料形状不当等。'   
            },
            {
                id: 'q3_3_9',
                type: 'single',
                question: '与锤上模锻相比，曲柄压力机模锻的特点是：',
                options: [
                    { key: 'A', value: '打击力可调节' },
                    { key: 'B', value: '滑块行程固定，变形速度较低' },
                    { key: 'C', value: '适合多膛模锻' },
                    { key: 'D', value: '设备简单' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：曲柄压力机滑块行程固定、变形速度较低，静压力特点明显。'   
            },
            {
                id: 'q3_3_10',
                type: 'single',
                question: '模锻后通常需要进行的工序是：',
                options: [
                    { key: 'A', value: '切边、冲孔、热处理' },
                    { key: 'B', value: '酸洗' },
                    { key: 'C', value: '冷校正' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：模锻后通常切边、冲孔、热处理，必要时酸洗去氧化皮、冷校正尺寸。'   
            },

            // ========== 3.4 板料冲压 ==========
            {
                id: 'q3_4_1',
                type: 'single',
                question: '板料冲压通常加工的材料是：',
                options: [
                    { key: 'A', value: '厚钢板' },
                    { key: 'B', value: '薄板（厚度一般小于6mm）' },
                    { key: 'C', value: '棒材' },
                    { key: 'D', value: '管材' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：冲压主要加工薄板（厚度一般≤6mm），如低碳钢、铝合金、铜合金等。'   
            },
            {
                id: 'q3_4_2',
                type: 'single',
                question: '下列哪项属于分离工序：',
                options: [
                    { key: 'A', value: '拉深' },
                    { key: 'B', value: '弯曲' },
                    { key: 'C', value: '冲孔' },
                    { key: 'D', value: '翻边' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：冲孔、落料、切边等是使材料分离的工序；拉深、弯曲、翻边是成形工序。'   
            },
            {
                id: 'q3_4_3',
                type: 'single',
                question: '冲裁时，凸模与凹模之间的间隙过大将导致：',
                options: [
                    { key: 'A', value: '冲裁力增大' },
                    { key: 'B', value: '断面粗糙且有较大毛刺' },
                    { key: 'C', value: '工件尺寸偏小' },
                    { key: 'D', value: '模具寿命降低' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：间隙过大时，材料拉裂而非剪切，断面粗糙、毛刺大。'   
            },
            {
                id: 'q3_4_4',
                type: 'single',
                question: '拉深工序中，防止起皱的措施是采用：',
                options: [
                    { key: 'A', value: '压边圈' },
                    { key: 'B', value: '增大凸模圆角' },
                    { key: 'C', value: '提高润滑' },
                    { key: 'D', value: '减小凹模圆角' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：压边圈施加压边力，防止拉深时凸缘部分失稳起皱。'   
            },
            {
                id: 'q3_4_5',
                type: 'single',
                question: '弯曲工序中，回弹现象的主要原因是：',
                options: [
                    { key: 'A', value: '材料弹性变形恢复' },
                    { key: 'B', value: '塑性变形不足' },
                    { key: 'C', value: '模具间隙过大' },
                    { key: 'D', value: '弯曲速度过快' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：弯曲后弹性变形部分恢复，导致弯曲角增大，即回弹。'   
            },
            {
                id: 'q3_4_6',
                type: 'single',
                question: '下列哪种材料最适合冲压加工：',
                options: [
                    { key: 'A', value: '高碳钢（淬火态）' },
                    { key: 'B', value: '低碳钢（退火态）' },
                    { key: 'C', value: '铸铁' },
                    { key: 'D', value: '高速钢' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：低碳钢塑性好、强度适中，退火态延伸率高，冲压性能优良。'   
            },
            {
                id: 'q3_4_7',
                type: 'single',
                question: '连续模（级进模）的特点是：',
                options: [
                    { key: 'A', value: '一次行程完成一个工序' },
                    { key: 'B', value: '多个工位依次完成多道工序，自动送料' },
                    { key: 'C', value: '只能用于落料' },
                    { key: 'D', value: '结构简单' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：连续模在压力机一次行程中，于不同工位同时完成多道工序，效率高。'   
            },
            {
                id: 'q3_4_8',
                type: 'single',
                question: '冲压时，冲裁件断面包括塌角、光亮带、断裂带和毛刺。光亮带是：',
                options: [
                    { key: 'A', value: '塑性剪切形成的平滑区域' },
                    { key: 'B', value: '撕裂形成的粗糙区域' },
                    { key: 'C', value: '圆角边缘' },
                    { key: 'D', value: '凸起毛刺' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：光亮带是凸模压入材料发生塑性剪切形成的平滑、光亮的区域。'   
            },
            {
                id: 'q3_4_9',
                type: 'single',
                question: '拉深系数m =（d/D）越小，表示：',
                options: [
                    { key: 'A', value: '拉深变形程度越大' },
                    { key: 'B', value: '越容易拉深' },
                    { key: 'C', value: '工件直径越大' },
                    { key: 'D', value: '材料厚度越大' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：拉深系数小说明拉深后直径小，变形程度大，易产生破裂。'   
            },
            {
                id: 'q3_4_10',
                type: 'single',
                question: '在冲压生产中，为保证安全，通常采用的措施不包括：',
                options: [
                    { key: 'A', value: '双手操作按钮' },
                    { key: 'B', value: '光电保护装置' },
                    { key: 'C', value: '戴手套操作' },
                    { key: 'D', value: '模具防护罩' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：冲压操作严禁戴手套（容易被模具卷入），应使用双手按钮、光幕等。'   
            },

            // ========== 4.1 焊条电弧焊 ==========
            {
                id: 'q4_1_1',
                type: 'single',
                question: '焊条电弧焊时，电弧温度可达：',
                options: [
                    { key: 'A', value: '1000~2000℃' },
                    { key: 'B', value: '3000~4000℃' },
                    { key: 'C', value: '5000~6000℃' },
                    { key: 'D', value: '7000~8000℃' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：电弧中心温度约5000~6000℃，可熔化金属和药皮。'   
            },
            {
                id: 'q4_1_2',
                type: 'single',
                question: '焊条药皮的主要作用不包括：',
                options: [
                    { key: 'A', value: '稳弧' },
                    { key: 'B', value: '造气保护' },
                    { key: 'C', value: '导电' },
                    { key: 'D', value: '脱氧、掺合金' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：导电由焊芯完成，药皮起稳弧、保护、冶金等作用。'   
            },
            {
                id: 'q4_1_3',
                type: 'single',
                question: '碱性焊条（低氢型）的突出优点是：',
                options: [
                    { key: 'A', value: '焊接工艺性好' },
                    { key: 'B', value: '抗裂性好，焊缝含氢量低' },
                    { key: 'C', value: '适用于交流焊机' },
                    { key: 'D', value: '焊渣覆盖差' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：碱性焊条含氢量低，抗冷裂性好，但工艺性稍差。'   
            },
            {
                id: 'q4_1_4',
                type: 'single',
                question: '焊接电流过大可能导致：',
                options: [
                    { key: 'A', value: '未焊透' },
                    { key: 'B', value: '咬边、烧穿' },
                    { key: 'C', value: '夹渣' },
                    { key: 'D', value: '气孔' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：电流过大易造成咬边、烧穿、飞溅增大。'    
            },
            {
                id: 'q4_1_5',
                type: 'single',
                question: '焊条电弧焊中，电弧长度一般应控制在：',
                options: [
                    { key: 'A', value: '与焊芯直径相近' },
                    { key: 'B', value: '越短越好' },
                    { key: 'C', value: '约等于焊条直径' },
                    { key: 'D', value: '任意' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：正常电弧长度约等于焊芯直径，过长则飞溅大、保护差。'   
            },
            {
                id: 'q4_1_6',
                type: 'single',
                question: '下列哪种运条方式适用于窄间隙平对接焊？',
                options: [
                    { key: 'A', value: '直线形' },
                    { key: 'B', value: '锯齿形' },
                    { key: 'C', value: '月牙形' },
                    { key: 'D', value: '三角形' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：直线形运条用于窄间隙薄板平对接，不做横向摆动。'   
            },
            {
                id: 'q4_1_7',
                type: 'single',
                question: '焊条牌号J422中的“J”表示：',
                options: [
                    { key: 'A', value: '结构钢焊条' },
                    { key: 'B', value: '不锈钢焊条' },
                    { key: 'C', value: '铸铁焊条' },
                    { key: 'D', value: '铜焊条' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：国标中“J”代表结构钢焊条（结）。'   
            },
            {
                id: 'q4_1_8',
                type: 'single',
                question: '焊条电弧焊时，焊机空载电压一般为：',
                options: [
                    { key: 'A', value: '20~30V' },
                    { key: 'B', value: '30~40V' },
                    { key: 'C', value: '55~80V' },
                    { key: 'D', value: '100~120V' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：空载电压约55~80V，利于引弧；电弧燃烧时工作电压约20~30V。'   
            },
            {
                id: 'q4_1_9',
                type: 'single',
                question: '为防止焊接变形，可采用的方法不包括：',
                options: [
                    { key: 'A', value: '反变形法' },
                    { key: 'B', value: '刚性固定法' },
                    { key: 'C', value: '增大焊接电流' },
                    { key: 'D', value: '合理的焊接顺序' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：增大焊接电流会增大热输入，加剧变形。'   
            },
            {
                id: 'q4_1_10',
                type: 'single',
                question: '焊条电弧焊操作中，引弧常用的方法是：',
                options: [
                    { key: 'A', value: '划擦法' },
                    { key: 'B', value: '垂直撞击法' },
                    { key: 'C', value: '短路法' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：引弧常用划擦法和直击法，均属短路法原理。'   
            },

            // ========== 4.2 气焊与气割 =============
            {
                id: 'q4_2_1',
                type: 'single',
                question: '气焊常用的可燃气体是：',
                options: [
                    { key: 'A', value: '甲烷' },
                    { key: 'B', value: '乙炔' },
                    { key: 'C', value: '氢气' },
                    { key: 'D', value: '丙烷' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：气焊最常用乙炔（氧-乙炔焰），温度可达3100℃。'   
            },
            {
                id: 'q4_2_2',
                type: 'single',
                question: '氧气瓶和乙炔瓶的安全距离应至少为：',
                options: [
                    { key: 'A', value: '1米' },
                    { key: 'B', value: '3米' },
                    { key: 'C', value: '5米' },
                    { key: 'D', value: '10米' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：气割作业时，氧气瓶与乙炔瓶间距不小5米，且远离明火。'   
            },
            {
                id: 'q4_2_3',
                type: 'single',
                question: '碳化焰（乙炔过剩）的特点是：',
                options: [
                    { key: 'A', value: '火焰温度最高' },
                    { key: 'B', value: '具有还原性，渗碳作用' },
                    { key: 'C', value: '氧化性强' },
                    { key: 'D', value: '适用于切割' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：碳化焰乙炔过剩，焰心长，还原性，适用于高碳钢、铸铁焊接。'   
            },
            {
                id: 'q4_2_4',
                type: 'single',
                question: '气割时，预热火焰的作用是：',
                options: [
                    { key: 'A', value: '熔化金属' },
                    { key: 'B', value: '将金属加热到燃点，然后切割氧流燃烧' },
                    { key: 'C', value: '仅用于去除氧化皮' },
                    { key: 'D', value: '产生压力' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：预热火焰将钢材加热至燃点（约1200~1300℃），然后切割氧使铁燃烧成FeO被吹走。'   
            },
            {
                id: 'q4_2_5',
                type: 'single',
                question: '下列哪种材料不能使用普通氧气切割？',
                options: [
                    { key: 'A', value: '低碳钢' },
                    { key: 'B', value: '中碳钢' },
                    { key: 'C', value: '不锈钢' },
                    { key: 'D', value: '低合金钢' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：不锈钢、铸铁、铜、铝等熔点高或氧化层致密，普通氧切割困难。'   
            },
            {
                id: 'q4_2_6',
                type: 'single',
                question: '气焊时，左焊法（左向焊）适用于：',
                options: [
                    { key: 'A', value: '厚板' },
                    { key: 'B', value: '薄板' },
                    { key: 'C', value: '铸铁' },
                    { key: 'D', value: '铝合金' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：左焊法（焊炬从左向右，焊丝在前）适用于薄板，热影响区小。'   
            },
            {
                id: 'q4_2_7',
                type: 'single',
                question: '回火是指：',
                options: [
                    { key: 'A', value: '火焰倒流回焊炬或乙炔管内' },
                    { key: 'B', value: '火焰熄灭' },
                    { key: 'C', value: '气体爆炸' },
                    { key: 'D', value: '火焰温度降低' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：回火是火焰返回燃烧器内部，可能引起爆炸，需立即关闭阀门。'   
            },
            {
                id: 'q4_2_8',
                type: 'single',
                question: '气割过程中，后拖量过大（切割氧流滞后）的原因可能是：',
                options: [
                    { key: 'A', value: '切割速度过快' },
                    { key: 'B', value: '切割氧压力过高' },
                    { key: 'C', value: '预热火焰过强' },
                    { key: 'D', value: '工件厚度小' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：切割速度过快时，切口底部跟不上，产生后拖量。'   
            },
            {
                id: 'q4_2_9',
                type: 'single',
                question: '气焊所用的焊丝与母材成分一般：',
                options: [
                    { key: 'A', value: '完全相同' },
                    { key: 'B', value: '相近或匹配' },
                    { key: 'C', value: '必须不同' },
                    { key: 'D', value: '无要求' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：焊丝成分应与母材相近，确保焊缝性能匹配。'   
            },
            {
                id: 'q4_2_10',
                type: 'single',
                question: '氧气瓶瓶身颜色为：',
                options: [
                    { key: 'A', value: '天蓝色' },
                    { key: 'B', value: '白色' },
                    { key: 'C', value: '红色' },
                    { key: 'D', value: '黑色' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：国标规定氧气瓶为天蓝色，乙炔瓶为白色。'   
            },

            // ========== 4.3 其他焊接方法 ==========
            {
                id: 'q4_3_1',
                type: 'single',
                question: '氩弧焊（TIG）采用氩气作为保护气体的主要原因是：',
                options: [
                    { key: 'A', value: '氩气导热性好' },
                    { key: 'B', value: '氩气化学惰性，保护效果好' },
                    { key: 'C', value: '氩气便宜' },
                    { key: 'D', value: '氩气能提高熔深' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：氩气是惰性气体，不参与反应，能有效保护钨极、电弧和熔池。'   
            },
            {
                id: 'q4_3_2',
                type: 'single',
                question: 'CO₂气体保护焊的优点不包括：',
                options: [
                    { key: 'A', value: '成本低' },
                    { key: 'B', value: '生产率高' },
                    { key: 'C', value: '飞溅小' },
                    { key: 'D', value: '可全位置焊接' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：CO₂焊飞溅较大，是其缺点。'   
            },
            {
                id: 'q4_3_3',
                type: 'single',
                question: '埋弧焊的主要特点是：',
                options: [
                    { key: 'A', value: '需要手工操作' },
                    { key: 'B', value: '焊接效率高，无弧光辐射' },
                    { key: 'C', value: '只能焊接薄板' },
                    { key: 'D', value: '只适用于平焊位置' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：埋弧焊焊剂覆盖，无弧光，自动化程度高，生产率高，但通常限于平焊。'   
            },
            {
                id: 'q4_3_4',
                type: 'single',
                question: '等离子弧焊与钨极氩弧焊相比，其特点是：',
                options: [
                    { key: 'A', value: '电弧温度低' },
                    { key: 'B', value: '能量密度高，穿透力强' },
                    { key: 'C', value: '只能焊接有色金属' },
                    { key: 'D', value: '设备简单' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：等离子弧能量集中、温度高，可形成小孔效应，一次焊透厚板。'    
            },
            {
                id: 'q4_3_5',
                type: 'single',
                question: '电阻焊中，点焊适用于：',
                options: [
                    { key: 'A', value: '管材对接' },
                    { key: 'B', value: '薄板搭接' },
                    { key: 'C', value: '厚板对接' },
                    { key: 'D', value: '异种金属' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：点焊用于薄板搭接，形成焊点，如汽车车身。'   
            },
            {
                id: 'q4_3_6',
                type: 'single',
                question: '摩擦焊属于：',
                options: [
                    { key: 'A', value: '熔化焊' },
                    { key: 'B', value: '压力焊' },
                    { key: 'C', value: '钎焊' },
                    { key: 'D', value: '气焊' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：摩擦焊利用相对旋转摩擦生热，加压焊接，属于固相压力焊。'   
            },
            {
                id: 'q4_3_7',
                type: 'single',
                question: '钎焊与熔化焊的主要区别是：',
                options: [
                    { key: 'A', value: '钎焊需要更高温度' },
                    { key: 'B', value: '母材不熔化，仅钎料熔化' },
                    { key: 'C', value: '只能焊接同种金属' },
                    { key: 'D', value: '强度一定低' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：钎焊时母材不熔化，液态钎料填充间隙，依靠润湿和毛细作用连接。'   
            },
            {
                id: 'q4_3_8',
                type: 'single',
                question: '电子束焊的突出优点是：',
                options: [
                    { key: 'A', value: '设备便宜' },
                    { key: 'B', value: '可在真空下焊接，焊缝纯净' },
                    { key: 'C', value: '操作简单' },
                    { key: 'D', value: '适合厚板大焊缝' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：电子束焊在真空中进行，焊缝纯净、深宽比大。'   
            },
            {
                id: 'q4_3_9',
                type: 'single',
                question: '激光焊的特点不包括：',
                options: [
                    { key: 'A', value: '热影响区小' },
                    { key: 'B', value: '可焊接难熔材料' },
                    { key: 'C', value: '不适用于薄板' },
                    { key: 'D', value: '焊接速度快' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：激光焊也适用于薄板、精密焊接，热输入小。'   
            },
            {
                id: 'q4_3_10',
                type: 'single',
                question: '下列哪种焊接方法常用于管道焊接和维修：',
                options: [
                    { key: 'A', value: '电渣焊' },
                    { key: 'B', value: '手工电弧焊' },
                    { key: 'C', value: '螺柱焊' },
                    { key: 'D', value: '堆焊' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：手工电弧焊设备简单灵活，广泛用于管道焊接、现场维修。'   
            },

            // ========== 4.4 常见焊接缺陷及其检验方法 ==========
            {
                id: 'q4_4_1',
                type: 'single',
                question: '焊接裂纹中，冷裂纹通常发生在：',
                options: [
                    { key: 'A', value: '焊接过程中' },
                    { key: 'B', value: '焊后冷却至室温或之后一段时期' },
                    { key: 'C', value: '焊缝凝固时' },
                    { key: 'D', value: '预热阶段' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：冷裂纹（延迟裂纹）在焊后马氏体转变或扩散氢作用下产生，可延迟数小时甚至几天。' 
            },
            {
                id: 'q4_4_2',
                type: 'single',
                question: '未焊透的主要原因是：',
                options: [
                    { key: 'A', value: '焊接电流过大' },
                    { key: 'B', value: '坡口角度太小或钝边太大' },
                    { key: 'C', value: '焊接速度过慢' },
                    { key: 'D', value: '焊条药皮受潮' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：未焊透是接头根部未熔合，常因坡口太小、钝边太大、间隙小或电流小。' 
            },
            {
                id: 'q4_4_3',
                type: 'single',
                question: '下列哪种无损检测方法适用于表面开口缺陷？',
                options: [
                    { key: 'A', value: '射线探伤' },
                    { key: 'B', value: '超声波探伤' },
                    { key: 'C', value: '渗透探伤' },
                    { key: 'D', value: '磁粉探伤（对铁磁性材料）' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：渗透探伤（着色或荧光）可检测表面开口缺陷（裂纹、气孔等）。'   
            },
            {
                id: 'q4_4_4',
                type: 'single',
                question: '焊缝中的气孔缺陷对哪种载荷最敏感？',
                options: [
                    { key: 'A', value: '静拉伸' },
                    { key: 'B', value: '疲劳' },
                    { key: 'C', value: '冲击' },
                    { key: 'D', value: '硬度' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：气孔对应力集中敏感，显著降低疲劳强度。'   
            },
            {
                id: 'q4_4_5',
                type: 'single',
                question: '咬边缺陷通常出现在：',
                options: [
                    { key: 'A', value: '焊缝表面与母材交界处' },
                    { key: 'B', value: '焊缝内部' },
                    { key: 'C', value: '热影响区' },
                    { key: 'D', value: '焊根' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：咬边是沿焊趾的凹陷沟槽，由电流过大或运条不当造成。'   
            },
            {
                id: 'q4_4_6',
                type: 'single',
                question: '防止焊接热裂纹的措施是：',
                options: [
                    { key: 'A', value: '增大焊接速度' },
                    { key: 'B', value: '降低焊缝中的S、P含量' },
                    { key: 'C', value: '提高冷却速度' },
                    { key: 'D', value: '增大焊接电流' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：热裂纹与低熔点共晶（FeS、FeP）有关，控制S、P可减少热裂纹。'   
            },
            {
                id: 'q4_4_7',
                type: 'single',
                question: '超声波探伤对哪种缺陷检出率较高？',
                options: [
                    { key: 'A', value: '表面细小裂纹' },
                    { key: 'B', value: '内部气孔、夹渣、裂纹' },
                    { key: 'C', value: '近表面缺陷' },
                    { key: 'D', value: '仅能检测厚度' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：超声波对内部面积型缺陷（裂纹、未熔合）及体积型缺陷（气孔、夹渣）敏感。'   
            },
            {
                id: 'q4_4_8',
                type: 'single',
                question: '磁粉探伤不能检测：',
                options: [
                    { key: 'A', value: '铁磁性材料表面裂纹' },
                    { key: 'B', value: '近表面裂纹' },
                    { key: 'C', value: '奥氏体不锈钢焊缝' },
                    { key: 'D', value: '淬火裂纹' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：磁粉探伤仅适用于铁磁性材料（钢、铁），奥氏体不锈钢无磁性。'   
            },
            {
                id: 'q4_4_9',
                type: 'single',
                question: '焊接变形中，角变形常发生在：',
                options: [
                    { key: 'A', value: 'T型接头' },
                    { key: 'B', value: 'V形坡口对接' },
                    { key: 'C', value: '搭接接头' },
                    { key: 'D', value: '角接接头' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：V形坡口单面焊时，焊缝横向收缩不均匀导致两侧翘起，产生角变形。'   
            },
            {
                id: 'q4_4_10',
                type: 'single',
                question: '射线探伤底片上，夹渣显示的特征是：',
                options: [
                    { key: 'A', value: '圆形或椭圆形黑点' },
                    { key: 'B', value: '不规则形状、边缘模糊的黑区' },
                    { key: 'C', value: '直线形黑色条纹' },
                    { key: 'D', value: '亮白色斑点' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：夹渣（非金属夹杂）在底片上呈不规则、边缘模糊的暗色区域。'   
            },

            // ========== 5.1 钢的热处理工艺 ==========
            {
                id: 'q5_1_1',
                type: 'single',
                question: '钢的热处理工艺由以下哪三个要素组成？',
                options: [
                    { key: 'A', value: '加热、保温、冷却' },
                    { key: 'B', value: '加热、淬火、回火' },
                    { key: 'C', value: '退火、正火、淬火' },
                    { key: 'D', value: '奥氏体化、马氏体转变、回火' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：任何热处理都包括加热、保温和冷却三个阶段。'   
            },
            {
                id: 'q5_1_2',
                type: 'single',
                question: '退火的主要目的是：',
                options: [
                    { key: 'A', value: '提高硬度和耐磨性' },
                    { key: 'B', value: '降低硬度，改善切削加工性' },
                    { key: 'C', value: '提高弹性极限' },
                    { key: 'D', value: '细化晶粒' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：退火使钢软化，消除内应力，改善切削加工性。'   
            },
            {
                id: 'q5_1_3',
                type: 'single',
                question: '正火与退火的主要区别是：',
                options: [
                    { key: 'A', value: '正火冷却速度更快，组织更细' },
                    { key: 'B', value: '正火加热温度更高' },
                    { key: 'C', value: '退火用于亚共析钢，正火用于过共析钢' },
                    { key: 'D', value: '正火不能消除应力' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：正火在空气中冷却，速度大于退火（炉冷），得到珠光体更细。'   
            },
            {
                id: 'q5_1_4',
                type: 'single',
                question: '淬火后钢的组织通常是：',
                options: [
                    { key: 'A', value: '珠光体' },
                    { key: 'B', value: '铁素体' },
                    { key: 'C', value: '马氏体' },
                    { key: 'D', value: '奥氏体' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：淬火获得马氏体（或贝氏体），是硬而脆的组织。'   
            },
            {
                id: 'q5_1_5',
                type: 'single',
                question: '回火的目的是：',
                options: [
                    { key: 'A', value: '消除淬火应力，调整力学性能' },
                    { key: 'B', value: '提高淬透性' },
                    { key: 'C', value: '增加碳含量' },
                    { key: 'D', value: '细化晶粒' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：回火降低脆性，消除内应力，获得所需强度、韧性配合。'   
            },
            {
                id: 'q5_1_6',
                type: 'single',
                question: '高温回火（500~650℃）得到的组织是：',
                options: [
                    { key: 'A', value: '回火马氏体' },
                    { key: 'B', value: '回火托氏体' },
                    { key: 'C', value: '回火索氏体' },
                    { key: 'D', value: '回火贝氏体' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：高温回火得到回火索氏体，综合力学性能好，称调质处理。'   
            },
            {
                id: 'q5_1_7',
                type: 'single',
                question: '钢的淬透性是指：',
                options: [
                    { key: 'A', value: '钢获得马氏体的能力' },
                    { key: 'B', value: '钢的硬度高低' },
                    { key: 'C', value: '钢的碳含量' },
                    { key: 'D', value: '钢的淬硬层深度' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：淬透性是指钢在淬火时获得马氏体层深度的能力。'   
            },
            {
                id: 'q5_1_8',
                type: 'single',
                question: '下列哪种热处理工艺用于消除加工硬化，恢复塑性？',
                options: [
                    { key: 'A', value: '再结晶退火' },
                    { key: 'B', value: '去应力退火' },
                    { key: 'C', value: '球化退火' },
                    { key: 'D', value: '完全退火' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：再结晶退火（500℃以下）可消除冷变形引起的加工硬化。'   
            },
            {
                id: 'q5_1_9',
                type: 'single',
                question: '表面淬火适用于：',
                options: [
                    { key: 'A', value: '所有钢材' },
                    { key: 'B', value: '低碳钢' },
                    { key: 'C', value: '中碳钢或中碳合金钢' },
                    { key: 'D', value: '高碳钢' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：表面淬火要求含碳量0.4~0.5%以上，中碳钢（如45钢）效果最好。'   
            },
            {
                id: 'q5_1_10',
                type: 'single',
                question: '化学热处理（如渗碳）改变的是：',
                options: [
                    { key: 'A', value: '表面成分和组织' },
                    { key: 'B', value: '整体成分' },
                    { key: 'C', value: '仅表面硬度' },
                    { key: 'D', value: '心部组织' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：渗碳、氮化等使表面渗入活性原子，改变表面成分，进而改变性能。'   
            },

            // ========== 5.2 常用热处理设备 ==========
            {
                id: 'q5_2_1',
                type: 'single',
                question: '箱式电阻炉主要用于：',
                options: [
                    { key: 'A', value: '大量生产' },
                    { key: 'B', value: '单件小批量及实验' },
                    { key: 'C', value: '连续生产' },
                    { key: 'D', value: '表面淬火' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：箱式电阻炉灵活方便，适用于单件小批量或实验室热处理。'   
            },
            {
                id: 'q5_2_2',
                type: 'single',
                question: '下列哪种设备常用于大批量生产的小型零件淬火加热？',
                options: [
                    { key: 'A', value: '盐浴炉' },
                    { key: 'B', value: '真空炉' },
                    { key: 'C', value: '网带炉' },
                    { key: 'D', value: '井式炉' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：网带炉可连续生产，适用于标准件、轴承等大批量零件。'   
            },
            {
                id: 'q5_2_3',
                type: 'single',
                question: '盐浴炉加热的特点是：',
                options: [
                    { key: 'A', value: '加热速度慢' },
                    { key: 'B', value: '氧化脱碳严重' },
                    { key: 'C', value: '加热均匀，速度快' },
                    { key: 'D', value: '只能加热小型零件' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：盐浴炉加热快、均匀、氧化脱碳轻，适用于精密零件。'   
            },
            {
                id: 'q5_2_4',
                type: 'single',
                question: '真空热处理炉的主要优点是：',
                options: [
                    { key: 'A', value: '设备简单' },
                    { key: 'B', value: '无氧化、无脱碳' },
                    { key: 'C', value: '成本低' },
                    { key: 'D', value: '加热速度慢' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：真空炉在真空下加热，零件表面光亮，无氧化脱碳。'   
            },
            {
                id: 'q5_2_5',
                type: 'single',
                question: '感应加热表面淬火所用设备是：',
                options: [
                    { key: 'A', value: '中频或高频电源' },
                    { key: 'B', value: '电阻炉' },
                    { key: 'C', value: '火焰加热装置' },
                    { key: 'D', value: '激光器' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：感应加热利用交变电磁场产生涡流，常用中频或高频电源。'   
            },
            {
                id: 'q5_2_6',
                type: 'single',
                question: '井式炉常用于：',
                options: [
                    { key: 'A', value: '大型轴类零件的垂直加热' },
                    { key: 'B', value: '薄板加热' },
                    { key: 'C', value: '表面淬火' },
                    { key: 'D', value: '渗碳、氮化' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：井式炉深而垂直，适合长轴、长杆加热，防止弯曲变形。'   
            },
            {
                id: 'q5_2_7',
                type: 'single',
                question: '下列哪种冷却介质淬火冷却速度最快？',
                options: [
                    { key: 'A', value: '水' },
                    { key: 'B', value: '油' },
                    { key: 'C', value: '盐水' },
                    { key: 'D', value: '聚合物淬火剂' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：盐水（10%NaCl）冷却速度最快，高温区比纯水快。'   
            },
            {
                id: 'q5_2_8',
                type: 'single',
                question: '渗碳炉通常为：',
                options: [
                    { key: 'A', value: '箱式炉' },
                    { key: 'B', value: '密封井式炉或连续渗碳炉' },
                    { key: 'C', value: '盐浴炉' },
                    { key: 'D', value: '真空炉' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：渗碳需控制碳势，常用密封井式炉（滴注式）或连续渗碳生产线。'
            },
            {
                id: 'q5_2_9',
                type: 'single',
                question: '火焰表面淬火的优点是：',
                options: [
                    { key: 'A', value: '设备投资低、灵活' },
                    { key: 'B', value: '淬硬层均匀' },
                    { key: 'C', value: '自动化程度高' },
                    { key: 'D', value: '适合复杂形状' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：火焰淬火设备简单、成本低，适于大型单件或修补。'   
            },
            {
                id: 'q5_2_10',
                type: 'single',
                question: '高频感应加热的淬硬层深度一般为：',
                options: [
                    { key: 'A', value: '0.2~0.5mm' },
                    { key: 'B', value: '1~2mm' },
                    { key: 'C', value: '3~5mm' },
                    { key: 'D', value: '大于5mm' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：高频（>10kHz）硬化层浅，约1~2mm；中频可达3~5mm。'   
            },

            // ========== 5.3 热处理常见缺陷 ==========
            {
                id: 'q5_3_1',
                type: 'single',
                question: '淬火裂纹的主要特征是：',
                options: [
                    { key: 'A', value: '细小、呈网状或沿晶分布' },
                    { key: 'B', value: '粗大直线' },
                    { key: 'C', value: '圆形孔洞' },
                    { key: 'D', value: '表面凹坑' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：淬火裂纹多为细小、曲折、沿晶界分布。'   
            },
            {
                id: 'q5_3_2',
                type: 'single',
                question: '过热（晶粒粗大）的热处理缺陷可通过什么方法补救？',
                options: [
                    { key: 'A', value: '重新退火或正火' },
                    { key: 'B', value: '再次淬火' },
                    { key: 'C', value: '回火' },
                    { key: 'D', value: '无法补救' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：过热可重新正火或退火细化晶粒；过烧则报废。'   
            },
            {
                id: 'q5_3_3',
                type: 'single',
                question: '淬火后硬度不足的可能原因是：',
                options: [
                    { key: 'A', value: '加热温度过低或冷却速度不够' },
                    { key: 'B', value: '回火温度过低' },
                    { key: 'C', value: '原始组织细小' },
                    { key: 'D', value: '淬火介质温度低' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：未奥氏体化或未得到马氏体，导致硬度不足。'   
            },
            {
                id: 'q5_3_4',
                type: 'single',
                question: '回火脆性（第一类回火脆性）通常发生在：',
                options: [
                    { key: 'A', value: '200~350℃回火' },
                    { key: 'B', value: '400~500℃回火' },
                    { key: 'C', value: '500~650℃回火' },
                    { key: 'D', value: '低温回火' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：第一类回火脆性（不可逆）在约250~400℃出现。'   
            },
            {
                id: 'q5_3_5',
                type: 'single',
                question: '零件淬火后变形的主要原因是什么？',
                options: [
                    { key: 'A', value: '热应力和组织应力共同作用' },
                    { key: 'B', value: '仅热应力' },
                    { key: 'C', value: '仅组织应力' },
                    { key: 'D', value: '材料成分不均匀' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：淬火变形源于热应力和相变组织应力的综合作用。'   
            },
            {
                id: 'q5_3_6',
                type: 'single',
                question: '防止脱碳的措施是：',
                options: [
                    { key: 'A', value: '采用保护气氛加热' },
                    { key: 'B', value: '提高加热温度' },
                    { key: 'C', value: '延长保温时间' },
                    { key: 'D', value: '增大冷却速度' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：保护气氛（如氮气、甲醇裂解气）可防止表面碳原子烧损。'   
            },
            {
                id: 'q5_3_7',
                type: 'single',
                question: '钢件淬火后出现软点，原因可能是：',
                options: [
                    { key: 'A', value: '表面有氧化皮' },
                    { key: 'B', value: '淬火介质搅拌不足' },
                    { key: 'C', value: '加热不均匀' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：软点由表面不洁净、介质气泡、加热不均等造成。'   
            },
            {
                id: 'q5_3_8',
                type: 'single',
                question: '渗碳零件常见的缺陷是：',
                options: [
                    { key: 'A', value: '渗碳层深度不够' },
                    { key: 'B', value: '表面网状碳化物' },
                    { key: 'C', value: '心部硬度低' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：渗碳缺陷包括层深不足、浓度梯度不当、网状碳化物、心部铁素体等。'   
            },
            {
                id: 'q5_3_9',
                type: 'single',
                question: '氮化处理的主要缺陷是：',
                options: [
                    { key: 'A', value: '氮化层剥落' },
                    { key: 'B', value: '硬度不足' },
                    { key: 'C', value: '变形大' },
                    { key: 'D', value: '周期长、成本高' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：氮化周期长（数十小时），工艺成本高；但变形小、硬度高。'   
            },
            {
                id: 'q5_3_10',
                type: 'single',
                question: '采用分级淬火（马氏体分级淬火）可减少变形和裂纹，原因是：',
                options: [
                    { key: 'A', value: '减小了热应力' },
                    { key: 'B', value: '减小了组织应力' },
                    { key: 'C', value: '同时减小热应力和组织应力' },
                    { key: 'D', value: '增加了淬透性' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：分级淬火在Ms点附近等温，使内外温差减小，同时马氏体转变缓慢，应力减小。'   
            },

            // ========== 5.4 洛氏硬度测试 ==========
            {
                id: 'q5_4_1',
                type: 'single',
                question: '洛氏硬度测试常用的压头类型有：',
                options: [
                    { key: 'A', value: '金刚石圆锥和钢球' },
                    { key: 'B', value: '只有金刚石圆锥' },
                    { key: 'C', value: '只有钢球' },
                    { key: 'D', value: '布氏球  ' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：洛氏硬度采用金刚石圆锥（HRC、HRA）或硬质合金/钢球（HRB等）。'   
            },
            {
                id: 'q5_4_2',
                type: 'single',
                question: 'HRC标尺适用的硬度范围大约是：',
                options: [
                    { key: 'A', value: '20~70 HRC' },
                    { key: 'B', value: '0~100 HRB' },
                    { key: 'C', value: '80~100 HRA' },
                    { key: 'D', value: '200~300 HB' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：HRC常用于淬火钢，范围是20~70 HRC。'   
            },
            {
                id: 'q5_4_3',
                type: 'single',
                question: '洛氏硬度值无单位，其计算公式基于：',
                options: [
                    { key: 'A', value: '压痕深度' },
                    { key: 'B', value: '压痕直径' },
                    { key: 'C', value: '压痕面积' },
                    { key: 'D', value: '压入力' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：洛氏硬度以压痕残余深度差计算。'   
            },
            {
                id: 'q5_4_4',
                type: 'single',
                question: '测量薄板或表面硬化层时，应选用：',
                options: [
                    { key: 'A', value: 'HRC' },
                    { key: 'B', value: 'HRA' },
                    { key: 'C', value: 'HRB' },
                    { key: 'D', value: 'HB' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：HRA使用金刚石圆锥且总载荷为100N，压痕浅，适于薄层。'   
            },
            {
                id: 'q5_4_5',
                type: 'single',
                question: '洛氏硬度试验的预载荷为：',
                options: [
                    { key: 'A', value: '10 kgf (98N)' },
                    { key: 'B', value: '60 kgf (588N)' },
                    { key: 'C', value: '100 kgf (980N)' },
                    { key: 'D', value: '150 kgf (1471N)' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：预载荷10kgf，主载荷有60、100、150kgf。'   
            },
            {
                id: 'q5_4_6',
                type: 'single',
                question: '下列哪种硬度测量方法压痕最大？',
                options: [
                    { key: 'A', value: 'HRA' },
                    { key: 'B', value: 'HRC' },
                    { key: 'C', value: 'HRB' },
                    { key: 'D', value: 'HB（布氏）' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：布氏硬度压痕直径几毫米，洛氏压痕小。'   
            },
            {
                id: 'q5_4_7',
                type: 'single',
                question: '用HRC测试高硬度材料时，若硬度高于67HRC，可能：',
                options: [
                    { key: 'A', value: '压头损坏' },
                    { key: 'B', value: '读数不准确' },
                    { key: 'C', value: '材料开裂' },
                    { key: 'D', value: '测试仍正常' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：超67HRC，金刚石压头易损坏，应改用HRA或维氏。'   
            },
            {
                id: 'q5_4_8',
                type: 'single',
                question: '洛氏硬度试验的标尺选择依据是：',
                options: [
                    { key: 'A', value: '材料类型和硬度范围' },
                    { key: 'B', value: '试件厚度' },
                    { key: 'C', value: '试验要求' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：选择标尺需综合考虑材料种类、硬度、厚度及规范要求。'   
            },
            {
                id: 'q5_4_9',
                type: 'single',
                question: 'HRB标尺使用1.588mm钢球，主载荷为：',
                options: [
                    { key: 'A', value: '60kgf' },
                    { key: 'B', value: '100kgf' },
                    { key: 'C', value: '150kgf' },
                    { key: 'D', value: '30kgf' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：HRB主载荷为100kgf，适用于软钢、铜合金等。'   
            },
            {
                id: 'q5_4_10',
                type: 'single',
                question: '洛氏硬度计操作中，加主载荷后应：',
                options: [
                    { key: 'A', value: '立即卸荷读数' },
                    { key: 'B', value: '保持数秒后卸荷' },
                    { key: 'C', value: '保持30秒以上' },
                    { key: 'D', value: '无要求' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：需保持主载荷8秒（标准规定），使变形稳定。'   
            },

            // ========== 6.1 切削加工的基本概念 ==========
            {
                id: 'q6_1_1',
                type: 'single',
                question: '切削加工中，主运动是指：',
                options: [
                    { key: 'A', value: '速度最快、消耗功率最大的运动' },
                    { key: 'B', value: '进给运动' },
                    { key: 'C', value: '刀具的旋转运动' },
                    { key: 'D', value: '工件的直线运动' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：主运动是切削速度最快的运动，消耗大部分功率。'   
            },
            {
                id: 'q6_1_2',
                type: 'single',
                question: '切削用量三要素包括：',
                options: [
                    { key: 'A', value: '切削速度、进给量、背吃刀量' },
                    { key: 'B', value: '主轴转速、进给速度、切削深度' },
                    { key: 'C', value: '线速度、每转进给、加工余量' },
                    { key: 'D', value: '切削力、切削热、刀具寿命' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：切削用量三要素为切削速度v_c、进给量f、背吃刀量a_p。'   
            },
            {
                id: 'q6_1_3',
                type: 'single',
                question: '在车削外圆时，背吃刀量（切削深度）是指：',
                options: [
                    { key: 'A', value: '待加工表面与已加工表面的垂直距离' },
                    { key: 'B', value: '刀具每转轴向移动距离' },
                    { key: 'C', value: '工件旋转线速度' },
                    { key: 'D', value: '切屑厚度' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：背吃刀量a_p = (dw - dm)/2。'   
            },
            {
                id: 'q6_1_4',
                type: 'single',
                question: '切削层参数中，切削厚度h_D与进给量f和主偏角κ_r的关系是：',
                options: [
                    { key: 'A', value: 'h_D = f / sinκ_r' },
                    { key: 'B', value: 'h_D = f × sinκ_r' },
                    { key: 'C', value: 'h_D = f × cosκ_r' },
                    { key: 'D', value: 'h_D = f / cosκ_r' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：切削厚度h_D = f·sinκ_r。'   
            },
            {
                id: 'q6_1_5',
                type: 'single',
                question: '积屑瘤对切削加工的影响，错误的是：',
                options: [
                    { key: 'A', value: '可保护刀具' },
                    { key: 'B', value: '增大已加工表面粗糙度' },
                    { key: 'C', value: '减小切削力' },
                    { key: 'D', value: '使加工尺寸稳定' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：积屑瘤不稳定，导致尺寸波动。'   
            },
            {
                id: 'q6_1_6',
                type: 'single',
                question: '切削加工中，切削热的主要来源是：',
                options: [
                    { key: 'A', value: '切屑变形功和前刀面摩擦' },
                    { key: 'B', value: '后刀面摩擦' },
                    { key: 'C', value: '工件散热' },
                    { key: 'D', value: '环境温度' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：切削热主要来自切屑的塑性变形和前刀面摩擦。'   
            },
            {
                id: 'q6_1_7',
                type: 'single',
                question: '下列哪种材料切削加工性较好？',
                options: [
                    { key: 'A', value: '高碳钢' },
                    { key: 'B', value: '奥氏体不锈钢' },
                    { key: 'C', value: '低碳钢（退火）' },
                    { key: 'D', value: '钛合金' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：低碳钢硬度低、塑性适中，切削加工性良好。'   
            },
            {
                id: 'q6_1_8',
                type: 'single',
                question: '切削液的主要作用不包括：',
                options: [
                    { key: 'A', value: '冷却' },
                    { key: 'B', value: '润滑' },
                    { key: 'C', value: '清洗' },
                    { key: 'D', value: '增加切削力' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：切削液应减小切削力。'   
            },
            {
                id: 'q6_1_9',
                type: 'single',
                question: '刀具前角增大，一般会使：',
                options: [
                    { key: 'A', value: '切削力增大' },
                    { key: 'B', value: '切削力减小' },
                    { key: 'C', value: '刀具强度提高' },
                    { key: 'D', value: '表面粗糙度变差' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：前角增大，切屑变形减小，切削力降低。'   
            },
            {
                id: 'q6_1_10',
                type: 'single',
                question: '切削速度对刀具寿命影响的经验公式（泰勒公式）中，v_c与T的关系是：',
                options: [
                    { key: 'A', value: 'v_c × T^n = C' },
                    { key: 'B', value: 'v_c^2 × T = C' },
                    { key: 'C', value: 'v_c × T = C' },
                    { key: 'D', value: 'v_c + T = C' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：泰勒公式v_c × T^n = C。'   
            },

            // ========== 6.2 切削加工质量 ==========
            {
                id: 'q6_2_1',
                type: 'single',
                question: '加工精度包括：',
                options: [
                    { key: 'A', value: '尺寸精度、形状精度、位置精度' },
                    { key: 'B', value: '表面粗糙度、波纹度' },
                    { key: 'C', value: '硬度、强度' },
                    { key: 'D', value: '尺寸公差、形位公差' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：加工精度包括尺寸精度、形状精度、位置精度。'   
            },
            {
                id: 'q6_2_2',
                type: 'single',
                question: '表面粗糙度常用的评定参数是：',
                options: [
                    { key: 'A', value: 'Ra' },
                    { key: 'B', value: 'Rz' },
                    { key: 'C', value: 'Ry' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：Ra、Rz、Ry均为常用参数。'   
            },
            {
                id: 'q6_2_3',
                type: 'single',
                question: '下列哪种加工方法获得的表面粗糙度最小（最光洁）？',
                options: [
                    { key: 'A', value: '粗车' },
                    { key: 'B', value: '精磨' },
                    { key: 'C', value: '研磨' },
                    { key: 'D', value: '铣削' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：研磨可获得Ra 0.01~0.1μm，精度高。'   
            },
            {
                id: 'q6_2_4',
                type: 'single',
                question: '加工硬化现象会导致：',
                options: [
                    { key: 'A', value: '表面硬度降低' },
                    { key: 'B', value: '后续加工困难' },
                    { key: 'C', value: '表面粗糙度改善' },
                    { key: 'D', value: '切削力减小' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：加工硬化使表层硬度升高、塑性降低，影响后续加工。'   
            },
            {
                id: 'q6_2_5',
                type: 'single',
                question: '残余拉应力对零件疲劳强度的影响是：',
                options: [
                    { key: 'A', value: '提高疲劳强度' },
                    { key: 'B', value: '降低疲劳强度' },
                    { key: 'C', value: '无影响' },
                    { key: 'D', value: '有时提高有时降低' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：残余拉应力促进裂纹扩展，降低疲劳寿命。'   
            },
            {
                id: 'q6_2_6',
                type: 'single',
                question: '提高切削速度，表面粗糙度一般会：',
                options: [
                    { key: 'A', value: '先改善后恶化' },
                    { key: 'B', value: '一直恶化' },
                    { key: 'C', value: '一直改善' },
                    { key: 'D', value: '无变化' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：低速易产生积屑瘤，中速改善，高速振动可能变差。'   
            },
            {
                id: 'q6_2_7',
                type: 'single',
                question: '工艺系统刚度不足主要导致：',
                options: [
                    { key: 'A', value: '尺寸精度超差' },
                    { key: 'B', value: '形状误差（如圆柱度）' },
                    { key: 'C', value: '表面烧伤' },
                    { key: 'D', value: '刀具磨损快' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：刚度不足引起变形，产生鼓形、鞍形等形状误差。'   
            },
            {
                id: 'q6_2_8',
                type: 'single',
                question: '下列哪种误差属于系统性误差？',
                options: [
                    { key: 'A', value: '机床几何精度误差' },
                    { key: 'B', value: '工件材料硬度不均' },
                    { key: 'C', value: '加工余量变化' },
                    { key: 'D', value: '刀具随机磨损' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：机床几何误差规律且可预测，属系统误差。'   
            },
            {
                id: 'q6_2_9',
                type: 'single',
                question: '冷作硬化深度与哪些因素有关？',
                options: [
                    { key: 'A', value: '刀具钝圆半径' },
                    { key: 'B', value: '进给量' },
                    { key: 'C', value: '切削速度' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：刀具钝圆半径、进给量、切削速度均影响塑性变形层深度。'   
            },
            {
                id: 'q6_2_10',
                type: 'single',
                question: '为防止已加工表面烧伤，应：',
                options: [
                    { key: 'A', value: '使用切削液' },
                    { key: 'B', value: '提高切削速度' },
                    { key: 'C', value: '增大背吃刀量' },
                    { key: 'D', value: '减小前角' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：切削液可冷却润滑，降低温度，防止烧伤。'   
            },

            // ========== 6.3 金属切削机床基本知识 ==========
            {
                id: 'q6_3_1',
                type: 'single',
                question: '机床型号CA6140中，“C”表示：',
                options: [
                    { key: 'A', value: '车床' },
                    { key: 'B', value: '铣床' },
                    { key: 'C', value: '钻床' },
                    { key: 'D', value: '磨床' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：C代表车床（类代号）。'   
            },
            {
                id: 'q6_3_2',
                type: 'single',
                question: '机床的主运动传动链通常从动力源到：',
                options: [
                    { key: 'A', value: '执行件（主轴或刀具）' },
                    { key: 'B', value: '进给机构' },
                    { key: 'C', value: '工作台' },
                    { key: 'D', value: '冷却泵' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：主运动传动链将动力传输至主轴等执行件。'   
            },
            {
                id: 'q6_3_3',
                type: 'single',
                question: '下列哪种机床适合加工平面和沟槽？',
                options: [
                    { key: 'A', value: '车床' },
                    { key: 'B', value: '铣床' },
                    { key: 'C', value: '钻床' },
                    { key: 'D', value: '镗床' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：铣床用铣刀加工平面、沟槽等。'   
            },
            {
                id: 'q6_3_4',
                type: 'single',
                question: '机床的精度包括：',
                options: [
                    { key: 'A', value: '几何精度、运动精度、传动精度' },
                    { key: 'B', value: '定位精度、重复定位精度' },
                    { key: 'C', value: '加工精度' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：机床精度是多方面的综合。'   
            },
            {
                id: 'q6_3_5',
                type: 'single',
                question: '数控机床与普通机床的主要区别是：',
                options: [
                    { key: 'A', value: '数控机床有伺服驱动和数控系统' },
                    { key: 'B', value: '数控机床速度更快' },
                    { key: 'C', value: '数控机床只能加工简单零件' },
                    { key: 'D', value: '数控机床不需要刀具' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：数控机床由数控系统控制伺服电机驱动。'   
            },
            {
                id: 'q6_3_6',
                type: 'single',
                question: '机床主轴的转速级数通常由什么实现？',
                options: [
                    { key: 'A', value: '变速箱或变频调速' },
                    { key: 'B', value: '皮带传动' },
                    { key: 'C', value: '电机直接驱动' },
                    { key: 'D', value: '液压系统' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：传统机床用齿轮变速箱，现代数控多用变频或伺服主轴。'   
            },
            {
                id: 'q6_3_7',
                type: 'single',
                question: '进给传动链中，常采用滚珠丝杠副的目的是：',
                options: [
                    { key: 'A', value: '减小摩擦、提高传动效率' },
                    { key: 'B', value: '增加强度' },
                    { key: 'C', value: '降低成本' },
                    { key: 'D', value: '提高转速' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：滚珠丝杠摩擦小、效率高、无爬行。'   
            },
            {
                id: 'q6_3_8',
                type: 'single',
                question: '机床型号中，主参数通常用：',
                options: [
                    { key: 'A', value: '加工直径或工作台宽度' },
                    { key: 'B', value: '主轴转速' },
                    { key: 'C', value: '电机功率' },
                    { key: 'D', value: '机床重量' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：车床主参数为最大加工直径，铣床为工作台宽度。'   
            },
            {
                id: 'q6_3_9',
                type: 'single',
                question: '下列机床中，属于直线运动型的是：',
                options: [
                    { key: 'A', value: '车床' },
                    { key: 'B', value: '钻床' },
                    { key: 'C', value: '刨床' },
                    { key: 'D', value: '铣床' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：刨床主运动是工作台（或滑枕）的直线往复运动。'   
            },
            {
                id: 'q6_3_10',
                type: 'single',
                question: '机床的静刚度是指:',
                options: [
                    { key: 'A', value: '抵抗恒定载荷变形的能力' },
                    { key: 'B', value: '抵抗振动的能力' },
                    { key: 'C', value: '运动精度' },
                    { key: 'D', value: '热稳定性' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：静刚度是机床部件在静载荷下抵抗变形的能力。'   
            },

            // ========== 6.4 常用量具 ==========
            {
                id: 'q6_4_1',
                type: 'single',
                question: '游标卡尺的读数原理是利用：',
                options: [
                    { key: 'A', value: '游标与尺身刻线差' },
                    { key: 'B', value: '螺旋副原理' },
                    { key: 'C', value: '杠杆放大' },
                    { key: 'D', value: '光栅' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：游标卡尺通过游标刻度与主尺刻度对齐的差值读出小数。'   
            },
            {
                id: 'q6_4_2',
                type: 'single',
                question: '分度值为0.02mm的游标卡尺，游标上刻线格数为：',
                options: [
                    { key: 'A', value: '20格' },
                    { key: 'B', value: '50格' },
                    { key: 'C', value: '10格' },
                    { key: 'D', value: '100格' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：0.02mm分度值通常对应50格游标。'   
            },
            {
                id: 'q6_4_3',
                type: 'single',
                question: '千分尺的测量精度一般为：',
                options: [
                    { key: 'A', value: '0.1mm' },
                    { key: 'B', value: '0.02mm' },
                    { key: 'C', value: '0.01mm' },
                    { key: 'D', value: '0.001mm' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：外径千分尺分度为0.01mm。'   
            },
            {
                id: 'q6_4_4',
                type: 'single',
                question: '百分表的测量杆移动1mm，大指针转动：',
                options: [
                    { key: 'A', value: '1圈' },
                    { key: 'B', value: '10圈' },
                    { key: 'C', value: '100圈' },
                    { key: 'D', value: '0.1圈' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：百分表测量1mm对应指针一圈（分度0.01mm，一圈100格）。'   
            },
            {
                id: 'q6_4_5',
                type: 'single',
                question: '测量内孔直径时，应优先选用：',
                options: [
                    { key: 'A', value: '游标卡尺' },
                    { key: 'B', value: '内径千分尺' },
                    { key: 'C', value: '塞规' },
                    { key: 'D', value: '深度尺' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：内径千分尺精度高，适合内孔测量。'   
            },
            {
                id: 'q6_4_6',
                type: 'single',
                question: '量块（块规）的作用是：',
                options: [
                    { key: 'A', value: '作为长度基准进行尺寸传递' },
                    { key: 'B', value: '直接测量工件' },
                    { key: 'C', value: '测粗糙度' },
                    { key: 'D', value: '测角度' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：量块用于校准量仪和测量尺寸，是长度计量基准。'   
            },
            {
                id: 'q6_4_7',
                type: 'single',
                question: '测量表面粗糙度常用的仪器是：',
                options: [
                    { key: 'A', value: '千分尺' },
                    { key: 'B', value: '表面粗糙度轮廓仪' },
                    { key: 'C', value: '游标卡尺' },
                    { key: 'D', value: '塞尺' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：轮廓仪通过触针扫描评定Ra、Rz等参数。'   
            },
            {
                id: 'q6_4_8',
                type: 'single',
                question: '使用千分尺测量时，应转动棘轮（测力装置）而不是直接转动微分筒，目的是：',
                options: [
                    { key: 'A', value: '避免测量力过大' },
                    { key: 'B', value: '提高读数精度' },
                    { key: 'C', value: '防止损坏螺纹' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：棘轮控制恒定测力，保护千分尺并保证重复性。'   
            },
            {
                id: 'q6_4_9',
                type: 'single',
                question: '下列量具中，属于角度测量的是：',
                options: [
                    { key: 'A', value: '万能角度尺' },
                    { key: 'B', value: '水平仪' },
                    { key: 'C', value: '正弦规' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：万能角度尺、水平仪、正弦规均可测角度。'   
            },
            {
                id: 'q6_4_10',
                type: 'single',
                question: '塞规用于检验：',
                options: [
                    { key: 'A', value: '孔径是否合格' },
                    { key: 'B', value: '长度尺寸' },
                    { key: 'C', value: '粗糙度' },
                    { key: 'D', value: '硬度' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：塞规通端过、止端不过则孔径合格。'   
            },

            // ========== 7.1 车床 ==========
            {
                id: 'q7_1_1',
                type: 'single',
                question: '普通卧式车床的主运动是：',
                options: [
                    { key: 'A', value: '工件的旋转运动' },
                    { key: 'B', value: '刀具的直线运动' },
                    { key: 'C', value: '尾座移动' },
                    { key: 'D', value: '溜板箱移动' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：车削时工件旋转为主运动。'   
            },
            {
                id: 'q7_1_2',
                type: 'single',
                question: 'CA6140车床的最大加工直径是：',
                options: [
                    { key: 'A', value: '40mm' },
                    { key: 'B', value: '140mm' },
                    { key: 'C', value: '400mm' },
                    { key: 'D', value: '6140mm' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：型号中“140”表示床身上最大加工直径为400mm。'   
            },
            {
                id: 'q7_1_3',
                type: 'single',
                question: '车床上用于安装钻头、铰刀等孔加工刀具的部件是：',
                options: [
                    { key: 'A', value: '尾座' },
                    { key: 'B', value: '刀架' },
                    { key: 'C', value: '主轴锥孔' },
                    { key: 'D', value: '中滑板' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：尾座套筒锥孔可安装钻头等。'   
            },
            {
                id: 'q7_1_4',
                type: 'single',
                question: '车床的进给箱（走刀箱）的作用是：',
                options: [
                    { key: 'A', value: '将主轴转动传递给光杠或丝杠' },
                    { key: 'B', value: '改变主轴转速' },
                    { key: 'C', value: '控制冷却液' },
                    { key: 'D', value: '操纵刀架运动' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：进给箱将主轴运动经变速传递给光杠或丝杠。'   
            },
            {
                id: 'q7_1_5',
                type: 'single',
                question: '车床上车削螺纹时，必须合上：',
                options: [
                    { key: 'A', value: '丝杠和开合螺母' },
                    { key: 'B', value: '光杠' },
                    { key: 'C', value: '离合器' },
                    { key: 'D', value: '摩擦片' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：车螺纹时，丝杠带动溜板箱，开合螺母闭合。'   
            },
            {
                id: 'q7_1_6',
                type: 'single',
                question: '车床的溜板箱（拖板箱）上安装有：',
                options: [
                    { key: 'A', value: '开合螺母、纵向横向手轮' },
                    { key: 'B', value: '交换齿轮' },
                    { key: 'C', value: '主轴' },
                    { key: 'D', value: '尾座' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：溜板箱实现手动或机动进给，并控制开合螺母。'   
            },
            {
                id: 'q7_1_7',
                type: 'single',
                question: '下列哪种加工不能在普通车床上完成：',
                options: [
                    { key: 'A', value: '车外圆' },
                    { key: 'B', value: '铣键槽' },
                    { key: 'C', value: '钻孔' },
                    { key: 'D', value: '车螺纹' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：铣键槽需要铣床。'   
            },
            {
                id: 'q7_1_8',
                type: 'single',
                question: '车床中滑板（横刀架）的移动方向是：',
                options: [
                    { key: 'A', value: '垂直于主轴轴线' },
                    { key: 'B', value: '平行于主轴轴线' },
                    { key: 'C', value: '倾斜45°' },
                    { key: 'D', value: '任意方向' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：中滑板控制横向进给，垂直于主轴轴线。'   
            },
            {
                id: 'q7_1_9',
                type: 'single',
                question: '车床主轴箱的作用是：',
                options: [
                    { key: 'A', value: '变换主轴转速和传递扭矩' },
                    { key: 'B', value: '安装刀具' },
                    { key: 'C', value: '夹持工件' },
                    { key: 'D', value: '进给运动' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：主轴箱内有变速机构。'   
            },
            {
                id: 'q7_1_10',
                type: 'single',
                question: '普通车床的精度检验项目中，主轴锥孔轴线的径向跳动影响：',
                options: [
                    { key: 'A', value: '加工圆度' },
                    { key: 'B', value: '端面平面度' },
                    { key: 'C', value: '螺纹螺距' },
                    { key: 'D', value: '表面粗糙度' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：主轴径向跳动使工件产生圆度误差。'   
            },

            // ========== 7.2 车刀的基本知识 ==========
            {
                id: 'q7_2_1',
                type: 'single',
                question: '车刀切削部分中，前刀面是指：',
                options: [
                    { key: 'A', value: '切屑流过的表面' },
                    { key: 'B', value: '与已加工表面相对的表面' },
                    { key: 'C', value: '主后刀面' },
                    { key: 'D', value: '副后刀面' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：前刀面是切屑流出时接触的表面。'   
            },
            {
                id: 'q7_2_2',
                type: 'single',
                question: '车刀的前角主要影响：',
                options: [
                    { key: 'A', value: '切屑变形和切削力' },
                    { key: 'B', value: '刀具强度' },
                    { key: 'C', value: '加工表面质量' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：前角影响变形、切削力、刀具强度及表面质量。'   
            },
            {
                id: 'q7_2_3',
                type: 'single',
                question: '主偏角增大，对切削加工的影响是：',
                options: [
                    { key: 'A', value: '切削厚度增大，切削宽度减小' },
                    { key: 'B', value: '切削厚度减小，切削宽度增大' },
                    { key: 'C', value: '切削力增大' },
                    { key: 'D', value: '刀具寿命提高' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：主偏角κ_r增大，切削厚度增大，切削宽度减小。'   
            },
            {
                id: 'q7_2_4',
                type: 'single',
                question: '车刀的刃倾角λ_s为负值时，切屑流向：',
                options: [
                    { key: 'A', value: '待加工表面' },
                    { key: 'B', value: '已加工表面' },
                    { key: 'C', value: '刀尖上方' },
                    { key: 'D', value: '任意方向' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：负刃倾角使切屑流向待加工表面。'   
            },
            {
                id: 'q7_2_5',
                type: 'single',
                question: '车刀上最易磨损的部位通常是：',
                options: [
                    { key: 'A', value: '前刀面月牙洼' },
                    { key: 'B', value: '后刀面' },
                    { key: 'C', value: '刀尖' },
                    { key: 'D', value: '副后刀面' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：刀尖处应力、温度最高，磨损最快。'   
            },
            {
                id: 'q7_2_6',
                type: 'single',
                question: '硬质合金车刀与高速钢车刀相比，其特点是：',
                options: [
                    { key: 'A', value: '耐热性高，可承受更高切削速度' },
                    { key: 'B', value: '韧性好，不易崩刃' },
                    { key: 'C', value: '可磨性好' },
                    { key: 'D', value: '价格低廉' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：硬质合金红硬性好，但韧性较差。'   
            },
            {
                id: 'q7_2_7',
                type: 'single',
                question: '在车刀几何角度中，后角的主要作用是：',
                options: [
                    { key: 'A', value: '减少后刀面与工件的摩擦' },
                    { key: 'B', value: '控制切屑流向' },
                    { key: 'C', value: '增强刀尖强度' },
                    { key: 'D', value: '增大切削厚度' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：后角减小摩擦。'   
            },
            {
                id: 'q7_2_8',
                type: 'single',
                question: '车刀的副偏角过小会导致：',
                options: [
                    { key: 'A', value: '副后刀面与已加工表面摩擦增大' },
                    { key: 'B', value: '切削力增大' },
                    { key: 'C', value: '刀具寿命下降' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：副偏角小，副切削刃参与切削长度增加，摩擦、切削力增大。'   
            },
            {
                id: 'q7_2_9',
                type: 'single',
                question: '车刀的标注角度参考系是：',
                options: [
                    { key: 'A', value: '静态（不考虑进给运动）' },
                    { key: 'B', value: '实际切削运动' },
                    { key: 'C', value: '刀具安装后' },
                    { key: 'D', value: '切削液滴入' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：标注角度在静态参考系中定义。'   
            },
            {
                id: 'q7_2_10',
                type: 'single',
                question: '涂层硬质合金车刀的主要优点是：',
                options: [
                    { key: 'A', value: '既有高硬度涂层，又有韧性基体' },
                    { key: 'B', value: '可多次重磨' },
                    { key: 'C', value: '价格极低' },
                    { key: 'D', value: '只能加工铸铁' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：涂层提高耐磨性，基体保持韧性。'   
            },
            
            // ========== 7.3 车床的夹具及工件安装 ==========
            {
                id: 'q7_3_1',
                type: 'single',
                question: '三爪自定心卡盘的特点是：',
                options: [
                    { key: 'A', value: '自动定心，但夹持力较小' },
                    { key: 'B', value: '定心精度高，适合所有工件' },
                    { key: 'C', value: '只能夹持圆形工件' },
                    { key: 'D', value: '需用扳手逐个夹紧' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：三爪卡盘自动定心，但夹持力不如四爪卡盘。'   
            },
            {
                id: 'q7_3_2',
                type: 'single',
                question: '四爪单动卡盘主要用于：',
                options: [
                    { key: 'A', value: '夹持形状不规则或偏心工件' },
                    { key: 'B', value: '快速夹持圆形棒料' },
                    { key: 'C', value: '自动定心' },
                    { key: 'D', value: '夹持薄壁件' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：四爪卡盘每个爪独立移动，可夹持异形件。'   
            },
            {
                id: 'q7_3_3',
                type: 'single',
                question: '车床上使用顶尖装夹时，工件两端需：',
                options: [
                    { key: 'A', value: '打中心孔' },
                    { key: 'B', value: '倒角' },
                    { key: 'C', value: '铣扁' },
                    { key: 'D', value: '攻螺纹' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：顶尖顶住中心孔。'   
            },
            {
                id: 'q7_3_4',
                type: 'single',
                question: '鸡心夹头（卡箍）与顶尖配合使用时，其作用是：',
                options: [
                    { key: 'A', value: '传递扭矩' },
                    { key: 'B', value: '定心' },
                    { key: 'C', value: '提高刚度' },
                    { key: 'D', value: '防止振动' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：鸡心夹头传递扭矩。'   
            },
            {
                id: 'q7_3_5',
                type: 'single',
                question: '车削细长轴时，为减小变形，常使用：',
                options: [
                    { key: 'A', value: '跟刀架' },
                    { key: 'B', value: '中心架' },
                    { key: 'C', value: '双顶尖' },
                    { key: 'D', value: '四爪卡盘' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：跟刀架随刀架移动，支撑在切削点附近。'   
            },
            {
                id: 'q7_3_6',
                type: 'single',
                question: '中心架（固定支架）通常安装在：',
                options: [
                    { key: 'A', value: '床身导轨上' },
                    { key: 'B', value: '主轴箱上' },
                    { key: 'C', value: '尾座上' },
                    { key: 'D', value: '刀架上' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：中心架固定在床身导轨上。'   
            },
            {
                id: 'q7_3_7',
                type: 'single',
                question: '在车床上用花盘装夹不规则工件时，需加：',
                options: [
                    { key: 'A', value: '平衡块' },
                    { key: 'B', value: '顶尖' },
                    { key: 'C', value: '弹簧套筒' },
                    { key: 'D', value: '磁力吸盘' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：不规则工件偏心，需加平衡块防止振动。'   
            },
            {
                id: 'q7_3_8',
                type: 'single',
                question: '弹簧夹头（弹性筒夹）适用于：',
                options: [
                    { key: 'A', value: '精密棒料夹持' },
                    { key: 'B', value: '大型铸件' },
                    { key: 'C', value: '薄壁套筒' },
                    { key: 'D', value: '淬硬工件' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：弹簧夹头夹持精度高，常用于棒料。'   
            },
            {
                id: 'q7_3_9',
                type: 'single',
                question: '工件装夹时，应遵循的原则是：',
                options: [
                    { key: 'A', value: '定位基准与设计基准重合' },
                    { key: 'B', value: '夹紧力尽可能大' },
                    { key: 'C', value: '定位点越少越好' },
                    { key: 'D', value: '允许工件有微小位移' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：基准重合可减少定位误差。'   
            },
            {
                id: 'q7_3_10',
                type: 'single',
                question: '车削时，若工件伸出卡盘过长，应：',
                options: [
                    { key: 'A', value: '使用中心架或顶尖支撑' },
                    { key: 'B', value: '降低转速' },
                    { key: 'C', value: '增大进给量' },
                    { key: 'D', value: '换用更大卡盘' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：伸出过长刚性不足，需增加辅助支撑。'   
            },

            // ========== 7.4 车削基本工作 ==========
            {
                id: 'q7_4_1',
                type: 'single',
                question: '车削外圆时，若工件出现锥度，可能原因是：',
                options: [
                    { key: 'A', value: '尾座偏移' },
                    { key: 'B', value: '主轴转速不稳' },
                    { key: 'C', value: '刀具磨损' },
                    { key: 'D', value: '进给量太大' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：尾座偏移导致顶尖与主轴轴线不平行。'   
            },
            {
                id: 'q7_4_2',
                type: 'single',
                question: '车端面时，若端面出现凸凹不平，通常原因是：',
                options: [
                    { key: 'A', value: '刀架移动与主轴轴线不垂直' },
                    { key: 'B', value: '切削速度过高' },
                    { key: 'C', value: '背吃刀量太小' },
                    { key: 'D', value: '刀具前角太大' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：中滑板导轨与主轴轴线不垂直。'   
            },
            {
                id: 'q7_4_3',
                type: 'single',
                question: '车削台阶面时，为保证台阶面与圆柱面垂直，可使用：',
                options: [
                    { key: 'A', value: '偏刀' },
                    { key: 'B', value: '切断刀' },
                    { key: 'C', value: '圆头刀' },
                    { key: 'D', value: '螺纹刀' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：0°偏刀适用于车台阶端面。'   
            },
            {
                id: 'q7_4_4',
                type: 'single',
                question: '车削沟槽（退刀槽）应使用的刀具是：',
                options: [
                    { key: 'A', value: '切断刀（切槽刀）' },
                    { key: 'B', value: '外圆车刀' },
                    { key: 'C', value: '螺纹车刀' },
                    { key: 'D', value: '镗刀' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：切槽刀用于车沟槽和切断。'   
            },
            {
                id: 'q7_4_5',
                type: 'single',
                question: '车孔（镗孔）时，为使排屑顺畅，通孔镗刀应选用：',
                options: [
                    { key: 'A', value: '主偏角较小' },
                    { key: 'B', value: '主偏角接近90°' },
                    { key: 'C', value: '负前角' },
                    { key: 'D', value: '圆弧刀刃' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：主偏角大，切屑流向待加工面，便于排出。'   
            },
            {
                id: 'q7_4_6',
                type: 'single',
                question: '在车床上钻孔，钻头安装在：',
                options: [
                    { key: 'A', value: '尾座套筒锥孔内' },
                    { key: 'B', value: '主轴锥孔内' },
                    { key: 'C', value: '刀架' },
                    { key: 'D', value: '中滑板' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：钻头通过锥柄或钻夹头安装在尾座中。'   
            },
            {
                id: 'q7_4_7',
                type: 'single',
                question: '车削圆锥面时，采用偏移尾座法适用于：',
                options: [
                    { key: 'A', value: '长锥度不大的外圆锥' },
                    { key: 'B', value: '内圆锥' },
                    { key: 'C', value: '短锥' },
                    { key: 'D', value: '所有锥度' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：偏移尾座法适于锥度小、长度较长的外圆锥。'   
            },
            {
                id: 'q7_4_8',
                type: 'single',
                question: '车削时，切削液应主要浇注在：',
                options: [
                    { key: 'A', value: '切削区域（刀与工件接触处）' },
                    { key: 'B', value: '工件表面' },
                    { key: 'C', value: '刀具后刀面' },
                    { key: 'D', value: '切屑上' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：浇注在切削区可有效冷却、润滑。'   
            },
            {
                id: 'q7_4_9',
                type: 'single',
                question: '车削细长轴时，为防止弯曲，应使用：',
                options: [
                    { key: 'A', value: '跟刀架和大走刀车削' },
                    { key: 'B', value: '反向进给' },
                    { key: 'C', value: '减小背吃刀量' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：多种措施：跟刀架、反向车削、小切深。'   
            },
            {
                id: 'q7_4_10',
                type: 'single',
                question: '车削过程中，切屑呈带状缠绕工件，应采取的措施是：',
                options: [
                    { key: 'A', value: '断屑槽或改变切削用量' },
                    { key: 'B', value: '降低切削速度' },
                    { key: 'C', value: '使用大前角刀' },
                    { key: 'D', value: '减小进给量' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：设计断屑槽或调整进给量使切屑折断。'   
            },

            // ========== 7.5 车削回转成形面及螺纹 ==========
            {
                id: 'q7_5_1',
                type: 'single',
                question: '车削螺纹时，主轴与丝杠之间的传动链必须保证：',
                options: [
                    { key: 'A', value: '工件每转一圈，刀具移动一个螺距' },
                    { key: 'B', value: '刀具每转一圈，工件移动一个螺距' },
                    { key: 'C', value: '主轴转速与进给量成正比' },
                    { key: 'D', value: '丝杠与光杠同步' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：工件转1转，刀具移1个导程。'   
            },
            {
                id: 'q7_5_2',
                type: 'single',
                question: '车削三角形螺纹（公制）时，通常采用：',
                options: [
                    { key: 'A', value: '直进法' },
                    { key: 'B', value: '斜进法' },
                    { key: 'C', value: '左右切削法' },
                    { key: 'D', value: '以上都可用' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：小螺距直进法；中等螺距斜进法；大螺距左右切削法。'   
            },
            {
                id: 'q7_5_3',
                type: 'single',
                question: '车削螺纹时产生乱牙的主要原因是：',
                options: [
                    { key: 'A', value: '开合螺母闭合时主轴位置不对应' },
                    { key: 'B', value: '切削速度过高' },
                    { key: 'C', value: '刀具角度错误' },
                    { key: 'D', value: '螺纹长度太长' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：乱牙是第二次走刀时刀尖未进入原螺旋槽。'   
            },
            {
                id: 'q7_5_4',
                type: 'single',
                question: '车削蜗杆（轴向模数）时，刀具形状应为：',
                options: [
                    { key: 'A', value: '牙型角为40°，刀头宽度等于齿根宽' },
                    { key: 'B', value: '牙型角为30°，刀具形状与齿形相同' },
                    { key: 'C', value: '牙型角为20°，刀头圆弧' },
                    { key: 'D', value: '牙型角为55°' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：蜗杆轴向牙型角通常为40°（ZA蜗杆），刀具刃形需精确。'   
            },
            {
                id: 'q7_5_5',
                type: 'single',
                question: '车削成形面（如球面、圆弧面）时，常用的方法是：',
                options: [
                    { key: 'A', value: '双手控制法' },
                    { key: 'B', value: '靠模法' },
                    { key: 'C', value: '成形刀法' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：小批量用双手联动，批量用靠模，简单圆弧用成形刀。'   
            },
            {
                id: 'q7_5_6',
                type: 'single',
                question: '车削多线螺纹时，分线方法可采用：',
                options: [
                    { key: 'A', value: '小滑板刻度分线' },
                    { key: 'B', value: '挂轮齿数分线' },
                    { key: 'C', value: '卡盘分线' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：常用方法有：小滑板移动、交换齿轮齿数、卡盘分度等。'   
            },
            {
                id: 'q7_5_7',
                type: 'single',
                question: '车削螺纹时，若中滑板刻度盘读数值应与实际进刀量相符，但可能出现：',
                options: [
                    { key: 'A', value: '由于丝杠间隙，实际进刀偏小' },
                    { key: 'B', value: '由于刀具磨损，牙型角变大' },
                    { key: 'C', value: '螺纹中径超差' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：丝杠间隙导致空行程，需消除间隙再进刀。'   
            },
            {
                id: 'q7_5_8',
                type: 'single',
                question: '车削梯形螺纹时，通常采用：',
                options: [
                    { key: 'A', value: '直进法' },
                    { key: 'B', value: '左右切削法' },
                    { key: 'C', value: '斜进法' },
                    { key: 'D', value: '高速切削' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：梯形螺纹螺距较大，左右切削法可减小切削力。'   
            },
            {
                id: 'q7_5_9',
                type: 'single',
                question: '车床上加工回转成形面（圆球手柄）时，为使球面光滑，应：',
                options: [
                    { key: 'A', value: '使用圆头车刀，双手缓慢联动' },
                    { key: 'B', value: '使用尖刀高速车削' },
                    { key: 'C', value: '一刀车出' },
                    { key: 'D', value: '使用成形钻头' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：手动联动纵横向手柄，使刀尖轨迹为圆弧。'   
            },
            {
                id: 'q7_5_10',
                type: 'single',
                question: '车削细牙螺纹时，防止螺纹表面毛刺的方法是：',
                options: [
                    { key: 'A', value: '提高切削速度，使用切削液' },
                    { key: 'B', value: '降低切削速度' },
                    { key: 'C', value: '增大背吃刀量' },
                    { key: 'D', value: '换用粗牙螺纹' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：高速切削配合切削液可减少积屑瘤。'   
            },

            // ========== 8.1 铣削加工 ==========
            {
                id: 'q8_1_1',
                type: 'single',
                question: '铣削加工的主运动是：',
                options: [
                    { key: 'A', value: '工件的旋转' },
                    { key: 'B', value: '铣刀的旋转' },
                    { key: 'C', value: '工作台的移动' },
                    { key: 'D', value: '铣刀的进给' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：铣削时铣刀旋转为主运动。'   
            },
            {
                id: 'q8_1_2',
                type: 'single',
                question: '下列哪种铣床应用最广泛：',
                options: [
                    { key: 'A', value: '卧式升降台铣床' },
                    { key: 'B', value: '龙门铣床' },
                    { key: 'C', value: '立式铣床' },
                    { key: 'D', value: '工具铣床' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：卧式升降台铣床（如X6132）应用最广。'   
            },
            {
                id: 'q8_1_3',
                type: 'single',
                question: '逆铣与顺铣的主要区别是：',
                options: [
                    { key: 'A', value: '铣刀旋转方向与工件进给方向的关系' },
                    { key: 'B', value: '铣刀转速不同' },
                    { key: 'C', value: '切削深度不同' },
                    { key: 'D', value: '铣刀类型不同' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：逆铣时铣刀旋转方向与进给方向相反，顺铣时相同。'   
            },
            {
                id: 'q8_1_4',
                type: 'single',
                question: '顺铣的优点不包括：',
                options: [
                    { key: 'A', value: '切削厚度由厚变薄，刀具寿命高' },
                    { key: 'B', value: '表面质量好' },
                    { key: 'C', value: '不会出现爬行现象' },
                    { key: 'D', value: '对丝杠螺母间隙要求低' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：顺铣要求进给丝杠无间隙。'   
            },
            {
                id: 'q8_1_5',
                type: 'single',
                question: '铣削平面时，粗铣应选用：',
                options: [
                    { key: 'A', value: '端铣刀' },
                    { key: 'B', value: '圆柱铣刀' },
                    { key: 'C', value: '立铣刀' },
                    { key: 'D', value: '成形铣刀' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：端铣刀刚性好，效率高。'   
            },
            {
                id: 'q8_1_6',
                type: 'single',
                question: '铣削键槽时，常用的刀具是：',
                options: [
                    { key: 'A', value: '三面刃铣刀' },
                    { key: 'B', value: '立铣刀或键槽铣刀' },
                    { key: 'C', value: '锯片铣刀' },
                    { key: 'D', value: '角度铣刀' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：立铣刀或键槽铣刀用于加工键槽。'   
            },
            {
                id: 'q8_1_7',
                type: 'single',
                question: '分度头的作用是：',
                options: [
                    { key: 'A', value: '等分圆周加工多边形、齿轮等' },
                    { key: 'B', value: '夹持工件' },
                    { key: 'C', value: '提高转速' },
                    { key: 'D', value: '减小振动' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：分度头可进行任意等分加工。'   
            },
            {
                id: 'q8_1_8',
                type: 'single',
                question: '铣削时产生振动的主要原因可能是：',
                options: [
                    { key: 'A', value: '铣刀钝化' },
                    { key: 'B', value: '工件刚性差' },
                    { key: 'C', value: '切削用量过大' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：刀具磨损、工件悬伸、切削参数不当均可引起振动。'   
            },
            {
                id: 'q8_1_9',
                type: 'single',
                question: '数控铣床与普通铣床相比，最大的优势是：',
                options: [
                    { key: 'A', value: '可加工复杂曲面' },
                    { key: 'B', value: '主轴转速高' },
                    { key: 'C', value: '进给速度快' },
                    { key: 'D', value: '价格低' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：数控铣床可实现三轴或五轴联动。'   
            },
            {
                id: 'q8_1_10',
                type: 'single',
                question: '在铣床上钻孔，通常使用：',
                options: [
                    { key: 'A', value: '主轴莫氏锥孔安装钻头' },
                    { key: 'B', value: '尾座安装钻头' },
                    { key: 'C', value: '平口钳夹持' },
                    { key: 'D', value: '分度头夹持' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：铣床主轴锥孔可直接或通过变径套安装钻头进行钻孔加工。'   
            },

            // ========== 8.2 刨削加工 ==========
            {
                id: 'q8_2_1',
                type: 'single',
                question: '刨削的主运动是：',
                options: [
                    { key: 'A', value: '工件的往复直线运动' },
                    { key: 'B', value: '刀具的往复直线运动' },
                    { key: 'C', value: '工件的旋转' },
                    { key: 'D', value: '刀具的旋转' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：牛头刨床的主运动是刨刀随滑枕做往复直线运动。'   
            },
            {
                id: 'q8_2_2',
                type: 'single',
                question: '牛头刨床的名称来源于：',
                options: [
                    { key: 'A', value: '滑枕像牛头一样来回摆动' },
                    { key: 'B', value: '外形像牛' },
                    { key: 'C', value: '创始人名字' },
                    { key: 'D', value: '产地' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：滑枕往复运动，形似牛头摆动。'   
            },
            {
                id: 'q8_2_3',
                type: 'single',
                question: '刨削加工中，工作行程速度慢，回程速度快，这是通过什么机构实现的：',
                options: [
                    { key: 'A', value: '棘轮机构' },
                    { key: 'B', value: '摆杆机构（急回特性）' },
                    { key: 'C', value: '凸轮机构' },
                    { key: 'D', value: '齿轮机构' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：牛头刨床的摆杆机构具有急回特性，缩短回程时间，提高生产效率。'   
            },
            {
                id: 'q8_2_4',
                type: 'single',
                question: '刨削的加工精度一般可达：',
                options: [
                    { key: 'A', value: 'IT5~IT6' },
                    { key: 'B', value: 'IT8~IT9' },
                    { key: 'C', value: 'IT12~IT13' },
                    { key: 'D', value: 'IT14~IT15' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：刨削加工精度中等，一般可达IT8~IT9级，表面粗糙度Ra值适中。'   
            },
            {
                id: 'q8_2_5',
                type: 'single',
                question: '下列哪种加工更适合采用刨削而不是铣削？',
                options: [
                    { key: 'A', value: '大型平面' },
                    { key: 'B', value: '窄长槽' },
                    { key: 'C', value: '齿轮齿形' },
                    { key: 'D', value: '复杂曲面' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：刨削尤其是龙门刨，适合加工大型工件的平面、导轨面等长直表面。'   
            },
            {
                id: 'q8_2_6',
                type: 'single',
                question: '刨削时，刨刀的主偏角通常为：',
                options: [
                    { key: 'A', value: '45°' },
                    { key: 'B', value: '60°~75°' },
                    { key: 'C', value: '90°' },
                    { key: 'D', value: '30°' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：刨刀主偏角常为60°~75°，可减小切深抗力，避免刀具崩损。'   
            },
            {
                id: 'q8_2_7',
                type: 'single',
                question: '龙门刨床主要用于加工：',
                options: [
                    { key: 'A', value: '小型工件' },
                    { key: 'B', value: '大型或重型工件' },
                    { key: 'C', value: '齿轮加工' },
                    { key: 'D', value: '孔加工' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：龙门刨床工作台宽大、行程长，主要用于大型、重型工件的平面加工。'   
            },
            {
                id: 'q8_2_8',
                type: 'single',
                question: '刨削垂直面或台阶时，常使用：',
                options: [
                    { key: 'A', value: '偏刀' },
                    { key: 'B', value: '切断刀' },
                    { key: 'C', value: '成型刀' },
                    { key: 'D', value: '弯头刨刀' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：偏刀适合刨垂直面。'   
            },
            {
                id: 'q8_2_9',
                type: 'single',
                question: '刨削时，为避免刨刀切入工件造成崩刃，通常：',
                options: [
                    { key: 'A', value: '工作行程前手动让刀' },
                    { key: 'B', value: '提高切削速度' },
                    { key: 'C', value: '增大进给量' },
                    { key: 'D', value: '使用切削液' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：刨床回程时刀架会自动抬起让刀，避免后刀面与工件摩擦。'   
            },
            {
                id: 'q8_2_10',
                type: 'single',
                question: '刨削加工的生产率通常比铣削：',
                options: [
                    { key: 'A', value: '高' },
                    { key: 'B', value: '低' },
                    { key: 'C', value: '相近' },
                    { key: 'D', value: '视材料而定' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：刨削有空回程，且切削速度较低，整体生产率普遍低于铣削。'   
            },

            // ========== 8.3 磨削加工 ==========
            {
                id: 'q8_3_1',
                type: 'single',
                question: '磨削的主运动是：',
                options: [
                    { key: 'A', value: '工件的旋转' },
                    { key: 'B', value: '砂轮的旋转' },
                    { key: 'C', value: '工作台的往复' },
                    { key: 'D', value: '砂轮的进给' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：磨削加工的主运动是砂轮的高速旋转运动。'   
            },
            {
                id: 'q8_3_2',
                type: 'single',
                question: '下列哪种磨床用于加工内孔：',
                options: [
                    { key: 'A', value: '外圆磨床' },
                    { key: 'B', value: '内圆磨床' },
                    { key: 'C', value: '平面磨床' },
                    { key: 'D', value: '工具磨床' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：内圆磨床专门用于磨削工件的内圆柱孔、内圆锥孔等内表面。'   
            },
            {
                id: 'q8_3_3',
                type: 'single',
                question: '磨削过程中，砂轮的自锐性是指：',
                options: [
                    { key: 'A', value: '磨粒钝化后破碎或脱落，露出新磨粒' },
                    { key: 'B', value: '砂轮自动修整' },
                    { key: 'C', value: '磨削液自动冷却' },
                    { key: 'D', value: '砂轮转速自动调节' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：砂轮的自锐性是磨削的重要特性，钝化磨粒破碎脱落，露出锋利新刃口。'   
            },
            {
                id: 'q8_3_4',
                type: 'single',
                question: '下列哪种材料不适合用普通刚玉砂轮磨削？',
                options: [
                    { key: 'A', value: '45钢' },
                    { key: 'B', value: '高速钢' },
                    { key: 'C', value: '硬质合金' },
                    { key: 'D', value: '铸铁' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：硬质合金硬度极高，需用绿色碳化硅或金刚石砂轮磨削。'   
            },
            {
                id: 'q8_3_5',
                type: 'single',
                question: '磨削时，为减少烧伤和裂纹，应采取：',
                options: [
                    { key: 'A', value: '使用充足的切削液' },
                    { key: 'B', value: '提高砂轮线速度' },
                    { key: 'C', value: '增大磨削深度' },
                    { key: 'D', value: '减小工件转速' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：充足的切削液可有效带走磨削热，防止工件表面烧伤和产生裂纹。'   
            },
            {
                id: 'q8_3_6',
                type: 'single',
                question: '砂轮的硬度是指：',
                options: [
                    { key: 'A', value: '磨粒的硬度' },
                    { key: 'B', value: '结合剂对磨粒的固结强度' },
                    { key: 'C', value: '砂轮的整体强度' },
                    { key: 'D', value: '砂轮的抗拉强度' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：砂轮硬度指磨粒受力后从砂轮上脱落的难易程度，即结合剂的固结强度。'   
            },
            {
                id: 'q8_3_7',
                type: 'single',
                question: '砂轮的粒度号越大，表示：',
                options: [
                    { key: 'A', value: '磨粒越粗' },
                    { key: 'B', value: '磨粒越细' },
                    { key: 'C', value: '砂轮越硬' },
                    { key: 'D', value: '砂轮转速越高' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：砂轮粒度号越大，代表磨粒尺寸越小、磨料越细。'   
            },
            {
                id: 'q8_3_8',
                type: 'single',
                question: '无心磨床的特点是：',
                options: [
                    { key: 'A', value: '工件无中心孔，靠导轮和托板支撑' },
                    { key: 'B', value: '必须有顶尖' },
                    { key: 'C', value: '只能磨外圆' },
                    { key: 'D', value: '精度低' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：无心磨削无需打中心孔，工件由托板和导轮支撑，适合大批量小型轴类。'   
            },
            {
                id: 'q8_3_9',
                type: 'single',
                question: '磨削细长轴时，为防止弯曲，常采用：',
                options: [
                    { key: 'A', value: '纵向磨削法' },
                    { key: 'B', value: '切入磨削法' },
                    { key: 'C', value: '分段磨削' },
                    { key: 'D', value: '加冷却液' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：纵向磨削法磨削力小，工件受热变形和受力变形小，适合细长轴。'   
            },
            {
                id: 'q8_3_10',
                type: 'single',
                question: '砂轮安装后必须进行：',
                options: [
                    { key: 'A', value: '静平衡' },
                    { key: 'B', value: '动平衡' },
                    { key: 'C', value: '修整' },
                    { key: 'D', value: '清洗' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：新砂轮安装后必须做静平衡，防止高速旋转时因偏心产生剧烈振动。'   
            },

            // ========== 9.1 划线 ==========
            {
                id: 'q9_1_1',
                type: 'single',
                question: '划线的作用是：',
                options: [
                    { key: 'A', value: '确定工件加工界限和基准' },
                    { key: 'B', value: '直接加工出形体' },
                    { key: 'C', value: '代替测量' },
                    { key: 'D', value: '提高硬度' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：划线是在毛坯或工件表面划出加工界线、找正基准，作为加工依据。'   
            },
            {
                id: 'q9_1_2',
                type: 'single',
                question: '划线基准一般优先选用：',
                options: [
                    { key: 'A', value: '设计基准' },
                    { key: 'B', value: '毛坯最大面' },
                    { key: 'C', value: '任意面' },
                    { key: 'D', value: '加工余量最小的面' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：划线基准应尽量与设计基准重合，减少基准不重合误差。'   
            },
            {
                id: 'q9_1_3',
                type: 'single',
                question: '下列工具中，用于划圆线和圆弧的是：',
                options: [
                    { key: 'A', value: '划针' },
                    { key: 'B', value: '划规（圆规）' },
                    { key: 'C', value: '高度尺' },
                    { key: 'D', value: '样冲' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：划规又称划圆规，用于在工件上划圆、圆弧和量取尺寸。'   
            },
            {
                id: 'q9_1_4',
                type: 'single',
                question: '划线前工件表面应涂什么？',
                options: [
                    { key: 'A', value: '石灰水或蓝油' },
                    { key: 'B', value: '机油' },
                    { key: 'C', value: '油漆' },
                    { key: 'D', value: '水' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：划线前涂涂色剂（石灰水、蓝油等），使划出的线条清晰可见。'   
            },
            {
                id: 'q9_1_5',
                type: 'single',
                question: '平面划线至少需要几个基准？',
                options: [
                    { key: 'A', value: '1个' },
                    { key: 'B', value: '2条互相垂直' },
                    { key: 'C', value: '3个' },
                    { key: 'D', value: '4个' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：平面划线需要两个互相垂直的方向基准，确定平面内所有尺寸。'   
            },
            {
                id: 'q9_1_6',
                type: 'single',
                question: '立体划线时，通常需要将工件放置在：',
                options: [
                    { key: 'A', value: '划线平台上' },
                    { key: 'B', value: 'V形铁上' },
                    { key: 'C', value: '千斤顶上' },
                    { key: 'D', value: '平口钳上' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：立体划线常用三个千斤顶支撑工件，调整高度和水平位置。'   
            },
            {
                id: 'q9_1_7',
                type: 'single',
                question: '样冲的作用是：',
                options: [
                    { key: 'A', value: '在划线上打小孔，防止模糊' },
                    { key: 'B', value: '划直线' },
                    { key: 'C', value: '测量角度' },
                    { key: 'D', value: '冲掉多余金属' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：样冲在划线上打出小冲眼，防止线条磨损后失去加工依据。'   
            },
            {
                id: 'q9_1_8',
                type: 'single',
                question: '划线时，应使加工余量：',
                options: [
                    { key: 'A', value: '尽量均匀分布' },
                    { key: 'B', value: '集中在一处' },
                    { key: 'C', value: '越多越好' },
                    { key: 'D', value: '越少越好' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：划线时合理分配加工余量，保证各面余量均匀，避免单边余量不足。'   
            },
            {
                id: 'q9_1_9',
                type: 'single',
                question: '方箱在划线中的作用是：',
                options: [
                    { key: 'A', value: '支撑并垂直转换划线面' },
                    { key: 'B', value: '夹紧工件' },
                    { key: 'C', value: '测量角度' },
                    { key: 'D', value: '划圆' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：方箱各面互相垂直，翻转工件即可划出互相垂直的线条。'   
            },
            {
                id: 'q9_1_10',
                type: 'single',
                question: '毛坯划线时发现余量不足，应如何处理？',
                options: [
                    { key: 'A', value: '按实际余量重新分配，通知工艺' },
                    { key: 'B', value: '强行按图纸划线' },
                    { key: 'C', value: '报废' },
                    { key: 'D', value: '加大划线尺寸' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：余量不足时应通过借料法重新分配，无法补救则及时上报工艺部门。'   
            },

            // ========== 9.2 锯削与锉削 ==========
            {
                id: 'q9_2_1',
                type: 'single',
                question: '手锯锯条的正确安装方向是：',
                options: [
                    { key: 'A', value: '齿尖朝前（推锯时切削）' },
                    { key: 'B', value: '齿尖朝后' },
                    { key: 'C', value: '任意方向' },
                    { key: 'D', value: '向内弯曲' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：手锯推锯时为工作行程，齿尖朝前才能有效切削材料。'   
            },
            {
                id: 'q9_2_2',
                type: 'single',
                question: '锯削薄壁管时，应选用：',
                options: [
                    { key: 'A', value: '粗齿锯条' },
                    { key: 'B', value: '细齿锯条' },
                    { key: 'C', value: '任意齿' },
                    { key: 'D', value: '无要求' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：薄壁管材、薄板料应选用细齿锯条，防止锯齿被管壁勾住崩齿。'   
            },
            {
                id: 'q9_2_3',
                type: 'single',
                question: '锯削硬材料时，锯条应选择：',
                options: [
                    { key: 'A', value: '粗齿' },
                    { key: 'B', value: '细齿' },
                    { key: 'C', value: '大前角' },
                    { key: 'D', value: '大后角' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：硬材料切削困难，细齿锯条同时参与切削的齿数多，每齿负荷小。'   
            },
            {
                id: 'q9_2_4',
                type: 'single',
                question: '锉削时，锉刀按齿纹粗细分为：',
                options: [
                    { key: 'A', value: '粗齿、中齿、细齿、油光齿' },
                    { key: 'B', value: '单齿、双齿' },
                    { key: 'C', value: '平齿、斜齿' },
                    { key: 'D', value: '大齿、小齿' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：锉刀按齿纹粗细分为粗锉、中锉、细锉和油光锉，对应不同加工阶段。'   
            },
            {
                id: 'q9_2_5',
                type: 'single',
                question: '下列哪种锉刀适用于锉削内孔、凹槽？',
                options: [
                    { key: 'A', value: '平锉' },
                    { key: 'B', value: '方锉' },
                    { key: 'C', value: '圆锉' },
                    { key: 'D', value: '三角锉' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：圆锉横截面为圆形，适合锉削圆孔、弧形凹槽等内曲面。'   
            },
            {
                id: 'q9_2_6',
                type: 'single',
                question: '锉削时，两手的用力应：',
                options: [
                    { key: 'A', value: '前手压力逐渐减小，后手压力逐渐增大' },
                    { key: 'B', value: '前后手压力始终相等' },
                    { key: 'C', value: '前手压力大，后手压力小' },
                    { key: 'D', value: '仅用手腕力' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：锉削推进过程中随重心后移，前后手压力动态变化，保持锉刀水平。'
            },
            {
                id: 'q9_2_7',
                type: 'single',
                question: '新锉刀使用时，应：',
                options: [
                    { key: 'A', value: '先用钢丝刷顺齿纹清除防锈油' },
                    { key: 'B', value: '直接使用' },
                    { key: 'C', value: '用水清洗' },
                    { key: 'D', value: '用油石打磨' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：新锉刀表面有防锈油，顺齿纹刷除后再用，避免切屑粘嵌。'   
            },
            {
                id: 'q9_2_8',
                type: 'single',
                question: '锉刀堵塞后，应用：',
                options: [
                    { key: 'A', value: '钢丝刷沿齿纹方向清除' },
                    { key: 'B', value: '铁刷横向刷' },
                    { key: 'C', value: '敲打' },
                    { key: 'D', value: '水洗' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：用钢丝刷顺着齿纹方向刷除切屑，禁止反向刷或硬物敲击。'   
            },
            {
                id: 'q9_2_9',
                type: 'single',
                question: '锯削时，起锯角度一般为：',
                options: [
                    { key: 'A', value: '15°~20°' },
                    { key: 'B', value: '30°~40°' },
                    { key: 'C', value: '45°~60°' },
                    { key: 'D', value: '90°' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：起锯角度约15°，角度过大易崩齿，过小则不易切入。'   
            },
            {
                id: 'q9_2_10',
                type: 'single',
                question: '锉削平面时，若出现中间凸起，原因是：',
                options: [
                    { key: 'A', value: '锉刀未保持水平' },
                    { key: 'B', value: '用力不均' },
                    { key: 'C', value: '锉齿磨损' },
                    { key: 'D', value: '工件未夹紧' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：锉削时锉刀上下摆动，会造成中间高、两边低的鼓形面。'   
            },

            // ========== 9.3 攻螺纹和套螺纹 ==========
            {
                id: 'q9_3_1',
                type: 'single',
                question: '攻螺纹是用丝锥加工：',
                options: [
                    { key: 'A', value: '内螺纹' },
                    { key: 'B', value: '外螺纹' },
                    { key: 'C', value: '矩形螺纹' },
                    { key: 'D', value: '梯形螺纹' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：攻螺纹是使用丝锥在预制底孔上加工出内螺纹。'   
            },
            {
                id: 'q9_3_2',
                type: 'single',
                question: '攻螺纹前底孔直径应：',
                options: [
                    { key: 'A', value: '等于螺纹大径' },
                    { key: 'B', value: '等于螺纹中径' },
                    { key: 'C', value: '略大于螺纹小径' },
                    { key: 'D', value: '略小于螺纹小径' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：底孔直径略大于螺纹小径，为攻丝时材料变形留出空间。'   
            },
            {
                id: 'q9_3_3',
                type: 'single',
                question: '丝锥一般由几支组成一套？',
                options: [
                    { key: 'A', value: '1支' },
                    { key: 'B', value: '2支（头锥、二锥）' },
                    { key: 'C', value: '3支（头锥、二锥、三锥）' },
                    { key: 'D', value: '4支' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：手用丝锥通常三支一套，分头锥、二锥、三锥，依次切削分担负荷。'   
            },
            {
                id: 'q9_3_4',
                type: 'single',
                question: '攻螺纹时，应：',
                options: [
                    { key: 'A', value: '每转半圈后退1/4圈' },
                    { key: 'B', value: '连续正转' },
                    { key: 'C', value: '高速旋转' },
                    { key: 'D', value: '加机油或乳化液' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：攻丝时常反转断屑，防止切屑堵塞造成丝锥折断。'   
            },
            {
                id: 'q9_3_5',
                type: 'single',
                question: '套螺纹是用板牙加工：',
                options: [
                    { key: 'A', value: '内螺纹' },
                    { key: 'B', value: '外螺纹' },
                    { key: 'C', value: '锥螺纹' },
                    { key: 'D', value: '管螺纹' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：套螺纹是用板牙在圆杆上切削出外螺纹。'   
            },
            {
                id: 'q9_3_6',
                type: 'single',
                question: '套螺纹前，圆杆直径应：',
                options: [
                    { key: 'A', value: '等于螺纹大径' },
                    { key: 'B', value: '略小于螺纹大径' },
                    { key: 'C', value: '略大于螺纹大径' },
                    { key: 'D', value: '等于螺纹中径' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：套丝时材料会挤压胀大，圆杆直径应略小于螺纹大径。'   
            },
            {
                id: 'q9_3_7',
                type: 'single',
                question: '板牙由什么组成？',
                options: [
                    { key: 'A', value: '板牙体、调节螺钉、导向部分' },
                    { key: 'B', value: '丝锥、铰杠' },
                    { key: 'C', value: '钻头、丝锥' },
                    { key: 'D', value: '冲头、模具' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：圆板牙带有调节螺钉，可微量调节螺纹尺寸。'   
            },
            {
                id: 'q9_3_8',
                type: 'single',
                question: '攻螺纹时，若丝锥折断，常用取出方法不包括：',
                options: [
                    { key: 'A', value: '专用取出器' },
                    { key: 'B', value: '电火花' },
                    { key: 'C', value: '敲碎' },
                    { key: 'D', value: '火烧' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：火烧会改变工件材料性能，不是常规取出方法。'   
            },
            {
                id: 'q9_3_9',
                type: 'single',
                question: '在软材料上攻螺纹，底孔直径应：',
                options: [
                    { key: 'A', value: '取偏小值' },
                    { key: 'B', value: '取偏大值' },
                    { key: 'C', value: '按公式计算' },
                    { key: 'D', value: '无要求' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：软材料塑性变形大，底孔适当取大，避免螺纹牙型胀死。'   
            },
            {
                id: 'q9_3_10',
                type: 'single',
                question: '板牙套螺纹时，应：',
                options: [
                    { key: 'A', value: '反转进刀' },
                    { key: 'B', value: '正转加压，反转退屑' },
                    { key: 'C', value: '一次套成' },
                    { key: 'D', value: '高速套丝' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：套丝时正转切削，适时反转断屑，保证螺纹表面光洁。'   
            },

            // ========== 9.4 孔加工 ==========
            {
                id: 'q9_4_1',
                type: 'single',
                question: '钻孔时，钻头的进给运动是：',
                options: [
                    { key: 'A', value: '钻头向下移动' },
                    { key: 'B', value: '工件移动' },
                    { key: 'C', value: '钻头旋转' },
                    { key: 'D', value: '工作台移动' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：钻孔时钻头旋转为主运动，轴向向下移动为进给运动。'   
            },
            {
                id: 'q9_4_2',
                type: 'single',
                question: '标准麻花钻的顶角（锋角）一般为：',
                options: [
                    { key: 'A', value: '90°' },
                    { key: 'B', value: '118°' },
                    { key: 'C', value: '135°' },
                    { key: 'D', value: '150°' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：标准麻花钻顶角2φ=118°。'   
            },
            {
                id: 'q9_4_3',
                type: 'single',
                question: '钻孔时，为防止钻头过热，应：',
                options: [
                    { key: 'A', value: '使用切削液' },
                    { key: 'B', value: '提高转速' },
                    { key: 'C', value: '增大进给量' },
                    { key: 'D', value: '减少背吃刀量' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：切削液可冷却钻头，延长刀具寿命，提高孔壁质量。'   
            },
            {
                id: 'q9_4_4',
                type: 'single',
                question: '扩孔的目的是：',
                options: [
                    { key: 'A', value: '提高孔的精度和表面质量' },
                    { key: 'B', value: '增大孔径较多' },
                    { key: 'C', value: '钻深孔' },
                    { key: 'D', value: '加工锥孔' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：扩孔可修正钻孔的偏斜，提高尺寸精度，降低表面粗糙度。'   
            },
            {
                id: 'q9_4_5',
                type: 'single',
                question: '铰孔能够达到的精度等级一般为：',
                options: [
                    { key: 'A', value: 'IT5~IT7' },
                    { key: 'B', value: 'IT8~IT9' },
                    { key: 'C', value: 'IT10~IT12' },
                    { key: 'D', value: 'IT13~IT14' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：铰孔是精加工方法，尺寸精度可达IT6~IT7级。'   
            },
            {
                id: 'q9_4_6',
                type: 'single',
                question: '铰孔时，铰刀的旋转方向应：',
                options: [
                    { key: 'A', value: '始终正转' },
                    { key: 'B', value: '正转后退刀' },
                    { key: 'C', value: '正反转均可' },
                    { key: 'D', value: '反转进刀' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：铰刀退刀时不能反转，防止刀刃崩损和划伤孔壁。'   
            },
            {
                id: 'q9_4_7',
                type: 'single',
                question: '钻孔时，钻头容易偏斜，主要原因不包括：',
                options: [
                    { key: 'A', value: '钻头两主切削刃不对称' },
                    { key: 'B', value: '工件表面不平' },
                    { key: 'C', value: '钻头直径太大' },
                    { key: 'D', value: '钻头横刃过长' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：钻头直径越大刚性越好，越不容易偏斜。'   
            },
            {
                id: 'q9_4_8',
                type: 'single',
                question: '在斜面上钻孔，应先用：',
                options: [
                    { key: 'A', value: '中心钻钻定位孔' },
                    { key: 'B', value: '平底钻' },
                    { key: 'C', value: '扩孔钻' },
                    { key: 'D', value: '深孔钻' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：斜面钻孔易打滑偏斜，先钻中心孔或铣出平面再钻。'   
            },
            {
                id: 'q9_4_9',
                type: 'single',
                question: '群钻（倪志福钻头）的主要特点是：',
                options: [
                    { key: 'A', value: '修磨横刃和分屑槽' },
                    { key: 'B', value: '顶角更大' },
                    { key: 'C', value: '螺旋角更小' },
                    { key: 'D', value: '直径更大' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：群钻通过修磨横刃、开分屑槽，改善切削性能和排屑效果。'   
            },
            {
                id: 'q9_4_10',
                type: 'single',
                question: '深孔加工（L/D>10）的主要难点是：',
                options: [
                    { key: 'A', value: '排屑和冷却困难' },
                    { key: 'B', value: '孔壁粗糙' },
                    { key: 'C', value: '钻头寿命低' },
                    { key: 'D', value: '孔径偏差大' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：深孔加工排屑和冷却润滑困难，需专用刀具和高压冷却系统。'   
            },

            // ========== 9.5 锉削与刮削 ==========
            {
                id: 'q9_5_1',
                type: 'single',
                question: '刮削的主要目的是：',
                options: [
                    { key: 'A', value: '获得高精度平面和表面' },
                    { key: 'B', value: '去除大量余量' },
                    { key: 'C', value: '提高表面硬度' },
                    { key: 'D', value: '改善材料组织' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：刮削是手工精加工方法，可获得很高的平面度和贴合精度。'   
            },
            {
                id: 'q9_5_2',
                type: 'single',
                question: '刮削常用的显示剂是：',
                options: [
                    { key: 'A', value: '红丹粉或蓝油' },
                    { key: 'B', value: '机油' },
                    { key: 'C', value: '石墨' },
                    { key: 'D', value: '白垩粉' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：显示剂涂在标准平板上，研点后显示工件表面的高点。'   
            },
            {
                id: 'q9_5_3',
                type: 'single',
                question: '刮削一个平面时，正确的步骤是：',
                options: [
                    { key: 'A', value: '粗刮→细刮→精刮→刮花' },
                    { key: 'B', value: '精刮→粗刮' },
                    { key: 'C', value: '仅粗刮' },
                    { key: 'D', value: '仅刮花' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：刮削按粗刮、细刮、精刮、刮花逐步进行，精度逐级提高。'   
            },
            {
                id: 'q9_5_4',
                type: 'single',
                question: '刮削的精度常用什么表示？',
                options: [
                    { key: 'A', value: '25mm×25mm内接触点数' },
                    { key: 'B', value: '表面粗糙度Ra值' },
                    { key: 'C', value: '平面度公差' },
                    { key: 'D', value: '硬度值' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：刮削精度以25mm×25mm面积内的均匀接触点数来评定。'   
            },
            {
                id: 'q9_5_5',
                type: 'single',
                question: '刮刀的材料一般为：',
                options: [
                    { key: 'A', value: '碳素工具钢（T12A）或硬质合金' },
                    { key: 'B', value: '高速钢' },
                    { key: 'C', value: '合金钢' },
                    { key: 'D', value: '铸铁' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：刮刀常用T12A等碳素工具钢制成，刃口需淬硬处理。'   
            },
            {
                id: 'q9_5_6',
                type: 'single',
                question: '刮削时，每次刮削的厚度一般为：',
                options: [
                    { key: 'A', value: '0.01~0.05mm' },
                    { key: 'B', value: '0.1~0.2mm' },
                    { key: 'C', value: '0.5~1mm' },
                    { key: 'D', value: '1~2mm' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：刮削是微量切削，每次去除材料极薄，约几微米。'   
            },
            {
                id: 'q9_5_7',
                type: 'single',
                question: '刮削操作时，刮刀的切削角度（前角）一般为：',
                options: [
                    { key: 'A', value: '负前角（-5°~-10°）' },
                    { key: 'B', value: '正前角（15°~20°）' },
                    { key: 'C', value: '零度' },
                    { key: 'D', value: '任意' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：刮刀采用负前角，以挤压光整作用为主，获得高质量表面。'   
            },
            {
                id: 'q9_5_8',
                type: 'single',
                question: '对机床导轨进行刮削的主要作用是：',
                options: [
                    { key: 'A', value: '提高接触刚度和油膜保持性' },
                    { key: 'B', value: '增加硬度' },
                    { key: 'C', value: '美观' },
                    { key: 'D', value: '防锈' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：导轨刮削可提高平面度、接触精度，并形成储油微坑改善润滑。'   
            },
            {
                id: 'q9_5_9',
                type: 'single',
                question: '“刮花”的作用是：',
                options: [
                    { key: 'A', value: '美观和储油' },
                    { key: 'B', value: '提高强度' },
                    { key: 'C', value: '去除余量' },
                    { key: 'D', value: '校正平面' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：刮出的花纹既美观又能储存润滑油，改善滑动面润滑效果。'   
            },
            {
                id: 'q9_5_10',
                type: 'single',
                question: '刮削时，显示剂涂在：',
                options: [
                    { key: 'A', value: '平板上，工件接触后高点显示' },
                    { key: 'B', value: '工件上' },
                    { key: 'C', value: '刮刀上' },
                    { key: 'D', value: '无需显示剂' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：显示剂涂在标准平板表面，研合后工件高点显色，作为刮削依据。'   
            },

            // ========== 9.6 装配和拆卸 ==========
            {
                id: 'q9_6_1',
                type: 'single',
                question: '装配的工作内容不包括：',
                options: [
                    { key: 'A', value: '零件清洗' },
                    { key: 'B', value: '零件加工' },
                    { key: 'C', value: '组件装配' },
                    { key: 'D', value: '总装调试' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：装配是将零件组合成产品的过程，不包含零件本身的加工。'   
            },
            {
                id: 'q9_6_2',
                type: 'single',
                question: '完全互换装配法的优点是：',
                options: [
                    { key: 'A', value: '装配效率高，维修方便' },
                    { key: 'B', value: '对零件精度要求低' },
                    { key: 'C', value: '成本低' },
                    { key: 'D', value: '适合单件生产' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：完全互换法无需修配选配，装配快，互换性好，便于维修。'   
            },
            {
                id: 'q9_6_3',
                type: 'single',
                question: '分组装配法主要用于：',
                options: [
                    { key: 'A', value: '高精度配合且生产批量较大' },
                    { key: 'B', value: '单件生产' },
                    { key: 'C', value: '大型设备' },
                    { key: 'D', value: '任意情况' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：分组装配法将零件按尺寸分组对应装配，以较低加工成本实现高精度配合。'   
            },
            {
                id: 'q9_6_4',
                type: 'single',
                question: '拆卸原则是：',
                options: [
                    { key: 'A', value: '与装配顺序相反' },
                    { key: 'B', value: '与装配顺序相同' },
                    { key: 'C', value: '任意顺序' },
                    { key: 'D', value: '破坏性拆卸' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：拆卸应按与装配相反的顺序进行，先装的后拆，后装的先拆。'   
            },
            {
                id: 'q9_6_5',
                type: 'single',
                question: '过盈配合连接常用的拆卸方法是：',
                options: [
                    { key: 'A', value: '压力机压出' },
                    { key: 'B', value: '锤击' },
                    { key: 'C', value: '加热包容件' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：过盈连接可采用压力机、拉马、热拆等多种方法拆卸。'   
            },
            {
                id: 'q9_6_6',
                type: 'single',
                question: '螺纹连接拆卸时，应：',
                options: [
                    { key: 'A', value: '使用合适的扳手，逆时针旋松' },
                    { key: 'B', value: '顺时针旋松' },
                    { key: 'C', value: '用锤子敲击' },
                    { key: 'D', value: '用管钳' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：普通右旋螺纹逆时针为旋松方向，使用规格匹配的扳手。'   
            },
            {
                id: 'q9_6_7',
                type: 'single',
                question: '轴承拆卸时，应避免：',
                options: [
                    { key: 'A', value: '使用专用拉拔器' },
                    { key: 'B', value: '敲击滚动体' },
                    { key: 'C', value: '加热轴承内圈' },
                    { key: 'D', value: '加润滑油' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：直接敲击滚动体和保持架会损坏轴承，作用力应作用在内圈或外圈端面。'   
            },
            {
                id: 'q9_6_8',
                type: 'single',
                question: '装配时，使用定位销的作用是：',
                options: [
                    { key: 'A', value: '保证零件相对位置' },
                    { key: 'B', value: '传递较大扭矩' },
                    { key: 'C', value: '密封' },
                    { key: 'D', value: '防松' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：定位销主要用于精确确定两个零件的相互位置。'   
            },
            {
                id: 'q9_6_9',
                type: 'single',
                question: '在装配过程中，对配合面涂润滑油的作用是：',
                options: [
                    { key: 'A', value: '便于装配，防锈' },
                    { key: 'B', value: '增加强度' },
                    { key: 'C', value: '提高精度' },
                    { key: 'D', value: '减少磨损' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：装配时涂润滑油可减小装配阻力，防止配合面拉伤和锈蚀。'   
            },
            {
                id: 'q9_6_10',
                type: 'single',
                question: '静平衡用于消除转子的：',
                options: [
                    { key: 'A', value: '不平衡力矩' },
                    { key: 'B', value: '不平衡力' },
                    { key: 'C', value: '振动频率' },
                    { key: 'D', value: '轴向窜动' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：静平衡消除单面的不平衡力，适用于盘类薄转子。'   
            },

            // ========== 10.1 安全用电 ==========
            {
                id: 'q10_1_1',
                type: 'single',
                question: '我国工业用电的安全电压一般为：',
                options: [
                    { key: 'A', value: '36V' },
                    { key: 'B', value: '110V' },
                    { key: 'C', value: '220V' },
                    { key: 'D', value: '380V' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：我国规定的安全电压等级为：42V、36V、24V、12V、6V。常用于手持电动工具和移动设备。'   
            },
            {
                id: 'q10_1_2',
                type: 'single',
                question: '人体触电最危险的是：',
                options: [
                    { key: 'A', value: '电流通过心脏' },
                    { key: 'B', value: '电流通过手指' },
                    { key: 'C', value: '电流通过脚' },
                    { key: 'D', value: '电流通过皮肤' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：电流流经心脏会引起心室纤颤甚至骤停，是最危险的触电路径。'   
            },
            {
                id: 'q10_1_3',
                type: 'single',
                question: '保护接地用于：',
                options: [
                    { key: 'A', value: '中性点不接地系统' },
                    { key: 'B', value: '中性点直接接地系统' },
                    { key: 'C', value: '所有系统' },
                    { key: 'D', value: '仅高压系统' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：保护接地（IT系统）适用于中性点不接地的三相三线制电网。'   
            },
            {
                id: 'q10_1_4',
                type: 'single',
                question: '保护接零（TN系统）适用于：',
                options: [
                    { key: 'A', value: '中性点直接接地系统' },
                    { key: 'B', value: '中性点不接地' },
                    { key: 'C', value: '所有情况' },
                    { key: 'D', value: '仅直流系统' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：保护接零用于中性点直接接地的三相四线制系统，设备外壳接零线。'   
            },
            {
                id: 'q10_1_5',
                type: 'single',
                question: '发现有人触电，首先应：',
                options: [
                    { key: 'A', value: '切断电源' },
                    { key: 'B', value: '用手拉开触电者' },
                    { key: 'C', value: '呼叫急救' },
                    { key: 'D', value: '用木头挑开电线' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：发现触电第一时间切断电源，是最安全有效的措施。'   
            },
            {
                id: 'q10_1_6',
                type: 'single',
                question: '下列哪种措施不能防止触电：',
                options: [
                    { key: 'A', value: '使用绝缘鞋' },
                    { key: 'B', value: '单手操作' },
                    { key: 'C', value: '不接地线' },
                    { key: 'D', value: '安装漏电保护器' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：不接地线会使设备外壳带电时无法保护，增加触电风险。'   
            },
            {
                id: 'q10_1_7',
                type: 'single',
                question: '干粉灭火器不能用于扑救：',
                options: [
                    { key: 'A', value: '电气火灾' },
                    { key: 'B', value: '油类火灾' },
                    { key: 'C', value: '可燃气体火灾' },
                    { key: 'D', value: '金属火灾' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：金属火灾需专用D类灭火器，普通干粉无法扑灭。'   
            },
            {
                id: 'q10_1_8',
                type: 'single',
                question: '保险丝熔断后，应：',
                options: [
                    { key: 'A', value: '更换相同规格保险丝' },
                    { key: 'B', value: '用铜丝代替' },
                    { key: 'C', value: '用铁丝代替' },
                    { key: 'D', value: '加大规格' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：必须更换原规格保险丝，严禁用铜、铁丝代替，失去过载保护作用。'   
            },
            {
                id: 'q10_1_9',
                type: 'single',
                question: '机床局部照明应采用：',
                options: [
                    { key: 'A', value: '36V以下安全电压' },
                    { key: 'B', value: '220V' },
                    { key: 'C', value: '380V' },
                    { key: 'D', value: '110V' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：机床工作灯等局部照明必须使用36V及以下安全电压。'   
            },
            {
                id: 'q10_1_10',
                type: 'single',
                question: '重复接地的作用是：',
                options: [
                    { key: 'A', value: '降低零线断线时的触电风险' },
                    { key: 'B', value: '提高电压' },
                    { key: 'C', value: '减少电流' },
                    { key: 'D', value: '增加电阻' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：零线多处重复接地，可防止零线断线后设备外壳带电伤人。'   
            },

            // ========== 10.2 卧式车床的电气控制 ==========
            {
                id: 'q10_2_1',
                type: 'single',
                question: 'CA6140车床的主电动机通常采用：',
                options: [
                    { key: 'A', value: '三相异步电动机' },
                    { key: 'B', value: '直流电动机' },
                    { key: 'C', value: '同步电动机' },
                    { key: 'D', value: '步进电机' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：普通卧式车床主电机普遍采用三相笼型异步电动机。'   
            },
            {
                id: 'q10_2_2',
                type: 'single',
                question: '车床主轴的正反转是通过什么实现的：',
                options: [
                    { key: 'A', value: '改变电动机相序' },
                    { key: 'B', value: '机械离合器' },
                    { key: 'C', value: '变频器' },
                    { key: 'D', value: '电磁制动器' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：普通车床通过主轴箱内的摩擦离合器机械换向，电机转向不变。'   
            },
            {
                id: 'q10_2_3',
                type: 'single',
                question: '车床的冷却泵电机通常是：',
                options: [
                    { key: 'A', value: '与主电机同步启动' },
                    { key: 'B', value: '独立控制' },
                    { key: 'C', value: '与进给电机联动' },
                    { key: 'D', value: '手动控制' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：冷却泵电机可单独启停，按需开启切削液。'   
            },
            {
                id: 'q10_2_4',
                type: 'single',
                question: '电气控制电路中，热继电器的作用是：',
                options: [
                    { key: 'A', value: '过载保护' },
                    { key: 'B', value: '短路保护' },
                    { key: 'C', value: '欠压保护' },
                    { key: 'D', value: '失压保护' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：热继电器利用电流热效应动作，实现电动机过载保护。'   
            },
            {
                id: 'q10_2_5',
                type: 'single',
                question: '熔断器在电路中用于：',
                options: [
                    { key: 'A', value: '短路保护' },
                    { key: 'B', value: '过载保护' },
                    { key: 'C', value: '欠压保护' },
                    { key: 'D', value: '漏电保护' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：熔断器在短路时熔体迅速熔断，切断短路电流。'   
            },
            {
                id: 'q10_2_6',
                type: 'single',
                question: '车床的急停按钮通常是：',
                options: [
                    { key: 'A', value: '红色蘑菇头，常闭触点' },
                    { key: 'B', value: '绿色按钮，常开触点' },
                    { key: 'C', value: '黑色旋钮' },
                    { key: 'D', value: '黄色指示灯' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：红色蘑菇头急停按钮，按下后立即切断控制回路。'   
            },
            {
                id: 'q10_2_7',
                type: 'single',
                question: '行程开关在车床上用于：',
                options: [
                    { key: 'A', value: '控制溜板箱行程极限' },
                    { key: 'B', value: '控制主轴转动' },
                    { key: 'C', value: '控制冷却液' },
                    { key: 'D', value: '控制照明' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：行程开关限制溜板移动范围，防止超程撞坏机床。'   
            },
            {
                id: 'q10_2_8',
                type: 'single',
                question: '接触器的作用是：',
                options: [
                    { key: 'A', value: '远距离频繁接通和分断主电路' },
                    { key: 'B', value: '保护过载' },
                    { key: 'C', value: '调节电压' },
                    { key: 'D', value: '整流' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：接触器通过电磁吸力控制主触点通断，实现电机启停。'   
            },
            {
                id: 'q10_2_9',
                type: 'single',
                question: '电气原理图中，SB1常表示：',
                options: [
                    { key: 'A', value: '停止按钮' },
                    { key: 'B', value: '启动按钮' },
                    { key: 'C', value: '急停按钮' },
                    { key: 'D', value: '转换开关' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：电气图中SB1常为停止按钮，SB2为启动按钮。'   
            },
            {
                id: 'q10_2_10',
                type: 'single',
                question: '车床电气柜门上常见的指示灯颜色含义：红色表示：',
                options: [
                    { key: 'A', value: '停止或故障' },
                    { key: 'B', value: '运行' },
                    { key: 'C', value: '电源' },
                    { key: 'D', value: '过载' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：红色指示灯通常表示设备停止运行或出现故障报警。'   
            },

            // ========== 10.3 电工仪表简要介绍 ==========
            {
                id: 'q10_3_1',
                type: 'single',
                question: '测量交流电压应使用：',
                options: [
                    { key: 'A', value: '交流电压表（并联）' },
                    { key: 'B', value: '直流电压表' },
                    { key: 'C', value: '万用表电阻档' },
                    { key: 'D', value: '钳形电流表' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：测量电压时电压表必须并联在被测电路两端。'   
            },
            {
                id: 'q10_3_2',
                type: 'single',
                question: '钳形电流表的优点是：',
                options: [
                    { key: 'A', value: '无需断开电路即可测量电流' },
                    { key: 'B', value: '精度高' },
                    { key: 'C', value: '可测电压' },
                    { key: 'D', value: '可测电阻' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：钳形表通过互感原理，无需拆线即可在线测量交流电流。'   
            },
            {
                id: 'q10_3_3',
                type: 'single',
                question: '万用表测量电阻前，应：',
                options: [
                    { key: 'A', value: '调零（短接表笔调零）' },
                    { key: 'B', value: '直接测量' },
                    { key: 'C', value: '并联在电路中' },
                    { key: 'D', value: '通电测量' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：电阻档测量前需欧姆调零，且必须断电测量。'   
            },
            {
                id: 'q10_3_4',
                type: 'single',
                question: '兆欧表（摇表）用于测量：',
                options: [
                    { key: 'A', value: '绝缘电阻' },
                    { key: 'B', value: '低电阻' },
                    { key: 'C', value: '电压' },
                    { key: 'D', value: '电流' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：兆欧表专门用于测量电气设备的绝缘电阻。'   
            },
            {
                id: 'q10_3_5',
                type: 'single',
                question: '使用兆欧表测量电机绝缘时，应：',
                options: [
                    { key: 'A', value: '先断开电源，放电' },
                    { key: 'B', value: '直接测量' },
                    { key: 'C', value: '通电测量' },
                    { key: 'D', value: '短路测量' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：测量绝缘必须先断电，测量后对电容性设备放电。'   
            },
            {
                id: 'q10_3_6',
                type: 'single',
                question: '万用表交流电压档读数一般是指：',
                options: [
                    { key: 'A', value: '有效值' },
                    { key: 'B', value: '峰值' },
                    { key: 'C', value: '平均值' },
                    { key: 'D', value: '瞬时值' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：普通万用表交流档测量显示的是正弦交流电的有效值。'   
            },
            {
                id: 'q10_3_7',
                type: 'single',
                question: '测量大电流时，常配合使用：',
                options: [
                    { key: 'A', value: '电流互感器' },
                    { key: 'B', value: '分流器' },
                    { key: 'C', value: '变压器' },
                    { key: 'D', value: '整流器' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：交流大电流通过电流互感器按比例变小后再测量。'   
            },
            {
                id: 'q10_3_8',
                type: 'single',
                question: '示波器可以观测：',
                options: [
                    { key: 'A', value: '电压波形' },
                    { key: 'B', value: '电阻值' },
                    { key: 'C', value: '功率' },
                    { key: 'D', value: '频率' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：示波器直观显示电压随时间变化的波形。'   
            },
            {
                id: 'q10_3_9',
                type: 'single',
                question: '接地电阻测量仪用于测量：',
                options: [
                    { key: 'A', value: '接地电阻' },
                    { key: 'B', value: '线路电阻' },
                    { key: 'C', value: '电机电阻' },
                    { key: 'D', value: '绝缘电阻' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：接地电阻测试仪专门测量接地装置的接地电阻值。'   
            },
            {
                id: 'q10_3_10',
                type: 'single',
                question: '使用万用表时，严禁：',
                options: [
                    { key: 'A', value: '在测量电阻时带电测量' },
                    { key: 'B', value: '在测电压时转换档位' },
                    { key: 'C', value: '在测电流时并联' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：以上操作均会损坏万用表或造成安全事故。'   
            },

            // ========== 11.1 概述 ==========
            {
                id: 'q11_1_1',
                type: 'single',
                question: '数控机床的英文缩写是：',
                options: [
                    { key: 'A', value: 'CNC' },
                    { key: 'B', value: 'CAD' },
                    { key: 'C', value: 'CAM' },
                    { key: 'D', value: 'CAE' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：CNC = Computer Numerical Control，即计算机数字控制。'   
            },
            {
                id: 'q11_1_2',
                type: 'single',
                question: '数控机床的组成不包括：',
                options: [
                    { key: 'A', value: '伺服系统' },
                    { key: 'B', value: '数控系统' },
                    { key: 'C', value: '冷却液' },
                    { key: 'D', value: '主轴及进给传动' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：冷却液属于机床辅助系统，不是数控核心组成部分。'   
            },
            {
                id: 'q11_1_3',
                type: 'single',
                question: '开环控制系统的特点是：',
                options: [
                    { key: 'A', value: '无位置检测反馈' },
                    { key: 'B', value: '精度高' },
                    { key: 'C', value: '抗干扰强' },
                    { key: 'D', value: '使用光栅尺' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：开环系统没有位置反馈装置，结构简单但精度较低。'   
            },
            {
                id: 'q11_1_4',
                type: 'single',
                question: '半闭环控制系统的检测元件通常安装在：',
                options: [
                    { key: 'A', value: '电机轴或丝杠端部' },
                    { key: 'B', value: '工作台上' },
                    { key: 'C', value: '主轴内部' },
                    { key: 'D', value: '刀具上' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：半闭环检测电机或丝杠转角，间接推算工作台位置。'   
            },
            {
                id: 'q11_1_5',
                type: 'single',
                question: '全闭环控制系统的检测元件安装在：',
                options: [
                    { key: 'A', value: '工作台或滑板上' },
                    { key: 'B', value: '电机轴' },
                    { key: 'C', value: '数控系统内' },
                    { key: 'D', value: '控制柜' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：全闭环使用光栅尺直接测量工作台位移，精度最高。'   
            },
            {
                id: 'q11_1_6',
                type: 'single',
                question: '数控机床的插补功能是指：',
                options: [
                    { key: 'A', value: '根据给定曲线计算中间点' },
                    { key: 'B', value: '加工程序输入' },
                    { key: 'C', value: '刀具补偿' },
                    { key: 'D', value: '主轴变频' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：插补运算由CNC系统完成，计算各轴联动的中间轨迹点。'   
            },
            {
                id: 'q11_1_7',
                type: 'single',
                question: '数控机床适用于：',
                options: [
                    { key: 'A', value: '多品种、小批量复杂零件' },
                    { key: 'B', value: '单一品种大批量' },
                    { key: 'C', value: '形状简单零件' },
                    { key: 'D', value: '无需程序' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：数控机床柔性好，适合多品种小批量的复杂零件加工。'   
            },
            {
                id: 'q11_1_8',
                type: 'single',
                question: 'G代码是：',
                options: [
                    { key: 'A', value: '准备功能（如G01直线插补）' },
                    { key: 'B', value: '辅助功能（如M03主轴正转）' },
                    { key: 'C', value: '进给功能' },
                    { key: 'D', value: '主轴功能' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：G代码为准备功能代码，定义刀具运动方式。'   
            },
            {
                id: 'q11_1_9',
                type: 'single',
                question: '在数控机床上，刀具半径补偿的作用是：',
                options: [
                    { key: 'A', value: '简化编程，允许刀具实际半径不同' },
                    { key: 'B', value: '提高转速' },
                    { key: 'C', value: '增加进给' },
                    { key: 'D', value: '减少振动' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：刀具半径补偿可按零件轮廓编程，系统自动偏置刀具路径。'   
            },
            {
                id: 'q11_1_10',
                type: 'single',
                question: '数控机床中，绝对坐标编程与增量坐标编程的区别是：',
                options: [
                    { key: 'A', value: '绝对坐标以工件原点为基准，增量以上一点为基准' },
                    { key: 'B', value: '绝对坐标只能用于车床' },
                    { key: 'C', value: '增量坐标更精确' },
                    { key: 'D', value: '无区别' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：G90为绝对坐标，G91为增量（相对）坐标。'   
            },

            // ========== 11.2 数控车床 ==========
            {
                id: 'q11_2_1',
                type: 'single',
                question: '数控车床的坐标系中，X轴正方向是：',
                options: [
                    { key: 'A', value: '径向远离主轴轴线' },
                    { key: 'B', value: '轴向从卡盘到尾座' },
                    { key: 'C', value: '轴向从尾座到卡盘' },
                    { key: 'D', value: '切向' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：X轴为径向，正方向是刀具远离工件旋转中心的方向。'   
            },
            {
                id: 'q11_2_2',
                type: 'single',
                question: '数控车床通常有几个控制轴？',
                options: [
                    { key: 'A', value: '2轴（X、Z）' },
                    { key: 'B', value: '1轴' },
                    { key: 'C', value: '3轴' },
                    { key: 'D', value: '4轴' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：标准数控车床为X、Z两轴联动。'   
            },
            {
                id: 'q11_2_3',
                type: 'single',
                question: '数控车床的刀架形式多为：',
                options: [
                    { key: 'A', value: '电动刀架（转塔式）' },
                    { key: 'B', value: '排刀架' },
                    { key: 'C', value: '手动刀架' },
                    { key: 'D', value: '四方刀架' }
                ],  
                answer: 'A',
                explanation: '参考答案：A<br>解析：数控车床多采用电动转塔刀架，自动换刀。'   
            },
            {
                id: 'q11_2_4',
                type: 'single',
                question: '数控车床加工螺纹时，主轴编码器的作用是：',
                options: [
                    { key: 'A', value: '提供主轴位置信号，保证螺纹不乱牙' },
                    { key: 'B', value: '测量转速' },
                    { key: 'C', value: '控制进给' },
                    { key: 'D', value: '冷却' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：主轴编码器检测主轴转角，与Z轴进给同步，保证螺纹导程准确。'   
            },
            {
                id: 'q11_2_5',
                type: 'single',
                question: '数控车床的G71指令是：',
                options: [
                    { key: 'A', value: '外圆粗车循环' },
                    { key: 'B', value: '精车循环' },
                    { key: 'C', value: '螺纹循环' },
                    { key: 'D', value: '钻孔循环' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：G71为轴向粗车复合循环，用于棒料粗加工。'   
            },
            {
                id: 'q11_2_6',
                type: 'single',
                question: '数控车床上，G96指令表示：',
                options: [
                    { key: 'A', value: '恒线速度控制' },
                    { key: 'B', value: '恒转速控制' },
                    { key: 'C', value: '暂停' },
                    { key: 'D', value: '返回参考点' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：G96恒线速度控制，随直径变化自动调整转速。'   
            },
            {
                id: 'q11_2_7',
                type: 'single',
                question: '数控车床的刀具补偿包括：',
                options: [
                    { key: 'A', value: '刀尖圆弧半径补偿' },
                    { key: 'B', value: '刀长补偿' },
                    { key: 'C', value: '磨损补偿' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：数控车床包含刀具位置补偿和刀尖圆弧半径补偿。'   
            },
            {
                id: 'q11_2_8',
                type: 'single',
                question: '数控车床的尾座通常：',
                options: [
                    { key: 'A', value: '可编程控制移动（部分机型）' },
                    { key: 'B', value: '固定不动' },
                    { key: 'C', value: '手动只有' },
                    { key: 'D', value: '无需尾座' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：中高档数控车床尾座可通过程序控制移动和顶紧。'   
            },
            {
                id: 'q11_2_9',
                type: 'single',
                question: '数控车床的卡盘通常采用：',
                options: [
                    { key: 'A', value: '液压或气动卡盘' },
                    { key: 'B', value: '手动三爪' },
                    { key: 'C', value: '四爪单动' },
                    { key: 'D', value: '弹簧夹头' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：数控车床普遍采用液压或气动卡盘，自动夹紧。'   
            },
            {
                id: 'q11_2_10',
                type: 'single',
                question: '数控车床的M代码中，M03表示：',
                options: [
                    { key: 'A', value: '主轴正转' },
                    { key: 'B', value: '主轴反转' },
                    { key: 'C', value: '主轴停止' },
                    { key: 'D', value: '冷却液开' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：M03为主轴正转指令，M04反转，M05停止。'   
            },

            // ========== 11.3 数控铣床 ==========
            {
                id: 'q11_3_1',
                type: 'single',
                question: '数控铣床的基本控制轴是：',
                options: [
                    { key: 'A', value: 'X、Y、Z三轴' },
                    { key: 'B', value: 'X、Y两轴' },
                    { key: 'C', value: 'X、Z两轴' },
                    { key: 'D', value: '四轴' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：三轴联动是数控铣床最基本的配置。'   
            },
            {
                id: 'q11_3_2',
                type: 'single',
                question: '数控铣床上，G90指令是：',
                options: [
                    { key: 'A', value: '绝对坐标编程' },
                    { key: 'B', value: '增量坐标编程' },
                    { key: 'C', value: '半径补偿' },
                    { key: 'D', value: '钻孔循环' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：G90为绝对坐标编程模式。'   
            },
            {
                id: 'q11_3_3',
                type: 'single',
                question: '刀具半径左补偿（G41）是指：',
                options: [
                    { key: 'A', value: '刀具在编程轨迹左侧偏移' },
                    { key: 'B', value: '刀具在右侧偏移' },
                    { key: 'C', value: '无偏移' },
                    { key: 'D', value: '长度补偿' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：沿刀具前进方向看，G41为左侧半径补偿。'   
            },
            {
                id: 'q11_3_4',
                type: 'single',
                question: '数控铣床加工圆弧时，常用指令是：',  
                options: [
                    { key: 'A', value: 'G02（顺时针）、G03（逆时针）' },
                    { key: 'B', value: 'G01' },
                    { key: 'C', value: 'G00' },
                    { key: 'D', value: 'G04' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：G02顺时针圆弧插补，G03逆时针圆弧插补。'   
            },
            {
                id: 'q11_3_5',
                type: 'single',
                question: '数控铣床的主轴转速单位通常是：',
                options: [
                    { key: 'A', value: 'r/min' },
                    { key: 'B', value: 'm/min' },
                    { key: 'C', value: 'mm/min' },
                    { key: 'D', value: 'mm/r' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：主轴转速单位为转每分钟（r/min）。'   
            },
            {
                id: 'q11_3_6',
                type: 'single',
                question: '数控铣床的绝对式位置检测元件（如光栅尺）安装在：',
                options: [
                    { key: 'A', value: '工作台和导轨上' },
                    { key: 'B', value: '电机轴' },
                    { key: 'C', value: '丝杠端部' },
                    { key: 'D', value: '数控系统内' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：全闭环光栅尺安装在工作台上，直接测量位移。'   
            },
            {
                id: 'q11_3_7',
                type: 'single',
                question: '数控铣床加工中，G81指令是：',
                options: [
                    { key: 'A', value: '钻孔循环' },
                    { key: 'B', value: '铣螺纹' },
                    { key: 'C', value: '攻丝' },
                    { key: 'D', value: '镗孔' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：G81为普通钻孔固定循环。'   
            },
            {
                id: 'q11_3_8',
                type: 'single',
                question: '数控铣床的刀库常见形式不包括：',
                options: [
                    { key: 'A', value: '排式刀库' },
                    { key: 'B', value: '盘式刀库' },
                    { key: 'C', value: '链式刀库' },
                    { key: 'D', value: '无刀库' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：带刀库的是加工中心，普通数控铣床一般无刀库。'   
            },
            {
                id: 'q11_3_9',
                type: 'single',
                question: '数控铣床的换刀指令是：',
                options: [
                    { key: 'A', value: 'M06' },
                    { key: 'B', value: 'M03' },
                    { key: 'C', value: 'M08' },
                    { key: 'D', value: 'M30' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：M06配合T代码执行自动换刀。'   
            },
            {
                id: 'q11_3_10',
                type: 'single',
                question: '数控铣床加工时，若需暂停一段时间，可使用：',
                options: [
                    { key: 'A', value: 'G04' },
                    { key: 'B', value: 'G00' },
                    { key: 'C', value: 'G01' },
                    { key: 'D', value: 'G02' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：G04为暂停指令，可设定暂停时间。'   
            },

            // ========== 11.4 加工中心 ==========
            {
                id: 'q11_4_1',
                type: 'single',
                question: '加工中心与数控铣床的主要区别是：',
                options: [
                    { key: 'A', value: '有刀库和自动换刀装置' },
                    { key: 'B', value: '主轴转速更高' },
                    { key: 'C', value: '精度更高' },
                    { key: 'D', value: '价格更低' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：加工中心带有刀库，能自动更换多种刀具。'   
            },
            {
                id: 'q11_4_2',
                type: 'single',
                question: '加工中心按主轴方向分为：',
                options: [
                    { key: 'A', value: '立式和卧式' },
                    { key: 'B', value: '龙门式和悬臂式' },
                    { key: 'C', value: '单轴和多轴' },
                    { key: 'D', value: '普通和高精度' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：分为立式加工中心和卧式加工中心两大类。'   
            },
            {
                id: 'q11_4_3',
                type: 'single',
                question: '卧式加工中心适合加工：',
                options: [
                    { key: 'A', value: '箱体类零件（多面加工）' },
                    { key: 'B', value: '盘类零件' },
                    { key: 'C', value: '小型零件' },
                    { key: 'D', value: '非金属' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：卧式加工中心一次装夹可加工多个侧面，适合箱体件。'   
            },
            {
                id: 'q11_4_4',
                type: 'single',
                question: '加工中心的刀库容量一般为：',
                options: [
                    { key: 'A', value: '10~100把' },
                    { key: 'B', value: '1~5把' },
                    { key: 'C', value: '200~500把' },
                    { key: 'D', value: '无限制' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：常见刀库容量有16把、24把、32把、40把等。'   
            },
            {
                id: 'q11_4_5',
                type: 'single',
                question: '加工中心的自动换刀装置（ATC）换刀时间一般在：',
                options: [
                    { key: 'A', value: '1~5秒' },
                    { key: 'B', value: '0.1秒' },
                    { key: 'C', value: '10~20秒' },
                    { key: 'D', value: '30秒以上' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：现代加工中心刀对刀换刀时间一般在1~4秒。'   
            },
            {
                id: 'q11_4_6',
                type: 'single',
                question: '下列哪种加工中心可实现五面加工？',
                options: [
                    { key: 'A', value: '带数控回转工作台的卧式加工中心' },
                    { key: 'B', value: '立式加工中心' },
                    { key: 'C', value: '龙门加工中心' },
                    { key: 'D', value: '五轴加工中心' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：卧加配回转工作台可加工四个侧面加顶面，实现五面加工。'   
            },
            {
                id: 'q11_4_7',
                type: 'single',
                question: '加工中心的导轨通常采用：',
                options: [
                    { key: 'A', value: '直线滚动导轨' },
                    { key: 'B', value: '滑动导轨' },
                    { key: 'C', value: '铸铁导轨' },
                    { key: 'D', value: '钢轨' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：加工中心普遍采用直线滚动导轨，高速高精度。'   
            },
            {
                id: 'q11_4_8',
                type: 'single',
                question: '加工中心冷却系统通常包括：',
                options: [
                    { key: 'A', value: '主轴中心出水（CTS）' },
                    { key: 'B', value: '外部冷却' },
                    { key: 'C', value: '气冷' },
                    { key: 'D', value: '以上都是' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：现代加工中心具备多种冷却方式。'   
            },
            {
                id: 'q11_4_9',
                type: 'single',
                question: '加工中心自动排屑器的作用是：',
                options: [
                    { key: 'A', value: '自动排出切屑' },
                    { key: 'B', value: '换刀' },
                    { key: 'C', value: '冷却' },
                    { key: 'D', value: '照明' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：排屑器自动收集并排出切屑，保持工作区清洁。'   
            },
            {
                id: 'q11_4_10',
                type: 'single',
                question: '加工中心编程时，准备功能G28指令用于：',
                options: [
                    { key: 'A', value: '返回参考点' },
                    { key: 'B', value: '攻丝' },
                    { key: 'C', value: '钻孔' },
                    { key: 'D', value: '螺纹铣削' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：G28使各轴自动返回机械参考点。'   
            },

            // ========== 11.5 数控机床编程基础 ==========
            {
                id: 'q11_5_1',
                type: 'single',
                question: '数控程序的基本单位是：',
                options: [
                    { key: 'A', value: '程序段（Block）' },
                    { key: 'B', value: '字符' },
                    { key: 'C', value: '字' },
                    { key: 'D', value: '文件' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：一个程序段由多个功能字组成，完成一个动作。'   
            },
            {
                id: 'q11_5_2',
                type: 'single',
                question: '程序号通常以什么开头？',
                options: [
                    { key: 'A', value: 'O（字母）' },
                    { key: 'B', value: 'P' },
                    { key: 'C', value: 'N' },
                    { key: 'D', value: '%' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：FANUC等系统程序号以字母O开头，如O0001。'   
            },
            {
                id: 'q11_5_3',
                type: 'single',
                question: 'G00指令表示：',
                options: [
                    { key: 'A', value: '快速定位' },
                    { key: 'B', value: '直线插补' },
                    { key: 'C', value: '圆弧插补' },
                    { key: 'D', value: '暂停' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：G00为快速点定位指令，以机床最快速度移动刀具。'   
            },
            {
                id: 'q11_5_4',
                type: 'single',
                question: 'G01指令格式中，F表示：',
                options: [
                    { key: 'A', value: '进给速度' },
                    { key: 'B', value: '主轴转速' },
                    { key: 'C', value: '刀具号' },
                    { key: 'D', value: '半径' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：F代码定义切削进给速度，单位一般为mm/min。'   
            },
            {
                id: 'q11_5_5',
                type: 'single',
                question: '绝对坐标编程时，X100.0 Z50.0表示：',
                options: [
                    { key: 'A', value: '刀具移动到工件坐标系中X100、Z50位置' },
                    { key: 'B', value: '刀具移动增加100、50' },
                    { key: 'C', value: '刀具半径补偿' },
                    { key: 'D', value: '主轴转速' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：绝对坐标以工件坐标系原点为基准，指定目标点坐标。'   
            },
            {
                id: 'q11_5_6',
                type: 'single',
                question: 'N10 G90 G00 X50.0 Y30.0；其中的N10表示：',
                options: [
                    { key: 'A', value: '程序段编号' },
                    { key: 'B', value: '准备功能' },
                    { key: 'C', value: '辅助功能' },
                    { key: 'D', value: '坐标值' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：N后跟数字为程序段号，用于程序检索和跳转。'   
            },
            {
                id: 'q11_5_7',
                type: 'single',
                question: '在数控程序中，M02与M30的区别是：',
                options: [
                    { key: 'A', value: 'M30程序结束并返回开头，M02只结束' },
                    { key: 'B', value: 'M02程序结束并回零' },
                    { key: 'C', value: '无区别' },
                    { key: 'D', value: 'M30用于子程序' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：M30结束程序后光标返回程序开头，便于重复运行。'   
            },
            {
                id: 'q11_5_8',
                type: 'single',
                question: '数控程序中，子程序调用指令为：',
                options: [
                    { key: 'A', value: 'M98' },
                    { key: 'B', value: 'M99' },
                    { key: 'C', value: 'M03' },
                    { key: 'D', value: 'M05' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：M98 PXXXX调用子程序，M99为子程序结束返回。'   
            },
            {
                id: 'q11_5_9',
                type: 'single',
                question: '圆弧插补时，I、J、K表示：',
                options: [
                    { key: 'A', value: '圆心相对于起点的坐标增量' },
                    { key: 'B', value: '圆弧半径' },
                    { key: 'C', value: '终点坐标' },
                    { key: 'D', value: '角度' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：I、J、K分别对应X、Y、Z方向上圆心相对圆弧起点的增量。'   
            },
            {
                id: 'q11_5_10',
                type: 'single',
                question: '数控程序中的小数点编程，例如X10.5表示：',
                options: [
                    { key: 'A', value: '10.5mm' },
                    { key: 'B', value: '105mm' },
                    { key: 'C', value: '0.105mm' },
                    { key: 'D', value: '1050mm' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：带小数点时单位为毫米，不带小数点时按系统最小设定单位计算。'   
            },

            // ========== 12.1 特种加工 ==========
            {
                id: 'q12_1_1',
                type: 'single',
                question: '电火花加工（EDM）适合加工：',
                options: [
                    { key: 'A', value: '导电材料，复杂型腔' },
                    { key: 'B', value: '非导电材料' },
                    { key: 'C', value: '普通钢' },
                    { key: 'D', value: '木材' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：电火花利用脉冲放电蚀除金属，工件必须具备导电性。'   
            },
            {
                id: 'q12_1_2',
                type: 'single',
                question: '电火花加工时，工作液（煤油等）的作用不包括：',
                options: [
                    { key: 'A', value: '导电' },
                    { key: 'B', value: '冷却' },
                    { key: 'C', value: '排屑' },
                    { key: 'D', value: '绝缘恢复' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：工作液应具备绝缘性能，在放电后迅速恢复绝缘状态。'   
            },
            {
                id: 'q12_1_3',
                type: 'single',
                question: '线切割加工（WEDM）的电极丝常用：',
                options: [
                    { key: 'A', value: '钼丝或铜丝' },
                    { key: 'B', value: '钨丝' },
                    { key: 'C', value: '铝丝' },
                    { key: 'D', value: '铁丝' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：快走丝线切割多用钼丝，慢走丝多用黄铜丝。'   
            },
            {
                id: 'q12_1_4',
                type: 'single',
                question: '电化学加工（ECM）的原理是：',
                options: [
                    { key: 'A', value: '阳极溶解' },
                    { key: 'B', value: '阴极沉积' },
                    { key: 'C', value: '火花放电' },
                    { key: 'D', value: '激光烧蚀' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：工件接阳极，在电解液中发生电化学阳极溶解去除材料。'   
            },
            {
                id: 'q12_1_5',
                type: 'single',
                question: '激光加工的特点不包括：',
                options: [
                    { key: 'A', value: '可加工非导电材料' },
                    { key: 'B', value: '热影响区大' },
                    { key: 'C', value: '无接触' },
                    { key: 'D', value: '高能量密度' }
                ],
                answer: 'B',
                explanation: '参考答案：B<br>解析：激光能量高度集中，热影响区很小，加工精度高。'   
            },
            {
                id: 'q12_1_6',
                type: 'single',
                question: '超声波加工适合：',
                options: [
                    { key: 'A', value: '硬脆材料（玻璃、陶瓷）' },
                    { key: 'B', value: '韧性金属' },
                    { key: 'C', value: '塑料' },
                    { key: 'D', value: '木材' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：超声波通过磨料高频撞击加工硬脆材料，不依赖导电性。'   
            },
            {
                id: 'q12_1_7',
                type: 'single',
                question: '电子束加工必须在什么环境下进行：',
                options: [
                    { key: 'A', value: '真空' },
                    { key: 'B', value: '大气' },
                    { key: 'C', value: '保护气体' },
                    { key: 'D', value: '液体' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：电子束必须在真空中传播，避免与气体分子碰撞损耗能量。'   
            },
            {
                id: 'q12_1_8',
                type: 'single',
                question: '水射流切割（水刀）的优点不包括：',
                options: [
                    { key: 'A', value: '无热影响区' },
                    { key: 'B', value: '可切割任何材料' },
                    { key: 'C', value: '成本极低' },
                    { key: 'D', value: '环保' }
                ],
                answer: 'C',
                explanation: '参考答案：C<br>解析：水刀设备和运行成本相对较高，不属于低成本工艺。'   
            },
            {
                id: 'q12_1_9',
                type: 'single',
                question: '电火花线切割加工中，电极丝与工件之间：',
                options: [
                    { key: 'A', value: '保持一定放电间隙' },
                    { key: 'B', value: '直接接触' },
                    { key: 'C', value: '无间隙' },
                    { key: 'D', value: '浸没在酸中' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：火花放电必须维持微小的放电间隙，接触则发生短路。'   
            },
            {
                id: 'q12_1_10',
                type: 'single',
                question: '特种加工的共同特点是：',
                options: [
                    { key: 'A', value: '主要利用电、热、光、化学等能量，不受材料硬度限制' },
                    { key: 'B', value: '必须使用刀具' },
                    { key: 'C', value: '加工精度低' },
                    { key: 'D', value: '只能加工金属' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：特种加工不依靠传统机械能，可加工高硬度、高脆性材料。'   
            },

            // ========== 12.2 工业机器人==========
            {
                id: 'q12_2_1',
                type: 'single',
                question: '工业机器人通常有几个自由度：',
                options: [
                    { key: 'A', value: '4~6轴' },
                    { key: 'B', value: '1~2轴' },
                    { key: 'C', value: '7~8轴' },
                    { key: 'D', value: '2~3轴' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：典型通用工业机器人为6轴，可实现空间任意位姿。'   
            },
            {
                id: 'q12_2_2',
                type: 'single',
                question: '机器人的重复定位精度一般可达：',
                options: [
                    { key: 'A', value: '±0.05~0.1mm' },
                    { key: 'B', value: '±1mm' },
                    { key: 'C', value: '±0.5mm' },
                    { key: 'D', value: '±0.01mm以下' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：通用工业机器人重复定位精度通常在±0.05~±0.1mm量级。'   
            },
            {
                id: 'q12_2_3',
                type: 'single',
                question: '工业机器人常用的驱动方式不包括：',
                options: [
                    { key: 'A', value: '液压驱动' },
                    { key: 'B', value: '气动驱动' },
                    { key: 'C', value: '电动（伺服）驱动' },
                    { key: 'D', value: '内燃机驱动' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：工业机器人主流为伺服电机驱动，不用内燃机。'   
            },
            {
                id: 'q12_2_4',
                type: 'single',
                question: '机器人的示教编程是指：',
                options: [
                    { key: 'A', value: '手动拖拽机器人记录点位' },
                    { key: 'B', value: '离线编程' },
                    { key: 'C', value: '直接写代码' },
                    { key: 'D', value: '语音控制' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：示教编程通过示教器引导机器人到达目标点并记录位置。'   
            },
            {
                id: 'q12_2_5',
                type: 'single',
                question: '焊接机器人主要应用于：',
                options: [
                    { key: 'A', value: '汽车白车身焊接' },
                    { key: 'B', value: '码垛' },
                    { key: 'C', value: '喷涂' },
                    { key: 'D', value: '装配' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：焊接机器人是汽车制造中应用最广泛的工业机器人类型。'   
            },
            {
                id: 'q12_2_6',
                type: 'single',
                question: '机器人的工作范围（可达半径）是指：',
                options: [
                    { key: 'A', value: '手腕中心能到达的最大距离' },
                    { key: 'B', value: '机器人本体重心距离' },
                    { key: 'C', value: '控制器距离' },
                    { key: 'D', value: '电源线长度' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：工作范围描述机器人末端执行器可到达的空间区域大小。'   
            },
            {
                id: 'q12_2_7',
                type: 'single',
                question: 'AGV（自动导引车）常用于：',
                options: [
                    { key: 'A', value: '物料搬运' },
                    { key: 'B', value: '焊接' },
                    { key: 'C', value: '喷涂' },
                    { key: 'D', value: '装配' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：AGV是自动化物流系统中的核心搬运设备。'   
            },
            {
                id: 'q12_2_8',
                type: 'single',
                question: '协作机器人的特点是：',
                options: [
                    { key: 'A', value: '可与人直接协作，无需安全围栏' },
                    { key: 'B', value: '负载大' },
                    { key: 'C', value: '速度极高' },
                    { key: 'D', value: '精度低' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：协作机器人具备碰撞检测和力限制功能，人机可同工位作业。'   
            },
            {
                id: 'q12_2_9',
                type: 'single',
                question: '机器人手爪（末端执行器）的作用是：',
                options: [
                    { key: 'A', value: '抓取或操作工件' },
                    { key: 'B', value: '移动机器人' },
                    { key: 'C', value: '控制电机' },
                    { key: 'D', value: '供电' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：末端执行器根据作业需求设计，实现抓取、焊接、喷涂等功能。'   
            },
            {
                id: 'q12_2_10',
                type: 'single',
                question: '机器人的零点标定（校准）的目的是：',
                options: [
                    { key: 'A', value: '确定各轴的机械零点位' },
                    { key: 'B', value: '提高速度' },
                    { key: 'C', value: '降低能耗' },
                    { key: 'D', value: '更换电机' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：零点标定后机器人才能准确计算末端位置，保证运动精度。'   
            },

            // ========== 12.3 塑料成型 ==========
            {
                id: 'q12_3_1',
                type: 'single',
                question: '注塑成型（注射成型）适合：',
                options: [
                    { key: 'A', value: '热塑性塑料大批量生产' },
                    { key: 'B', value: '单件生产' },
                    { key: 'C', value: '热固性塑料' },
                    { key: 'D', value: '所有塑料' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：注塑是热塑性塑料最主要的大批量成型方法。'   
            },
            {
                id: 'q12_3_2',
                type: 'single',
                question: '注塑机的主要组成部分不包括：',
                options: [
                    { key: 'A', value: '熔胶筒和螺杆' },
                    { key: 'B', value: '合模机构' },
                    { key: 'C', value: '模具' },
                    { key: 'D', value: '淬火池' }
                ],
                answer: 'D',
                explanation: '参考答案：D<br>解析：淬火池是金属热处理设备，不属于注塑机组成。'   
            },
            {
                id: 'q12_3_3',
                type: 'single',
                question: '挤出成型常用于：',
                options: [
                    { key: 'A', value: '管材、型材、薄膜' },
                    { key: 'B', value: '复杂壳体' },
                    { key: 'C', value: '精密齿轮' },
                    { key: 'D', value: '发泡材料' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：挤出成型可连续生产等截面的管材、板材、薄膜等制品。'   
            },
            {
                id: 'q12_3_4',
                type: 'single',
                question: '吹塑成型用于制造：',
                options: [
                    { key: 'A', value: '中空制品（瓶、桶）' },
                    { key: 'B', value: '实心制品' },
                    { key: 'C', value: '薄膜' },
                    { key: 'D', value: '纤维' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：吹塑通过压缩空气使型坯膨胀贴模，形成中空容器。'   
            },
            {
                id: 'q12_3_5',
                type: 'single',
                question: '压塑成型（模压）主要适用于：',
                options: [
                    { key: 'A', value: '热固性塑料（酚醛、环氧）' },
                    { key: 'B', value: '热塑性塑料' },
                    { key: 'C', value: '弹性体' },
                    { key: 'D', value: '泡沫' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：热固性塑料常用模压成型，在模具中加热加压固化。'   
            },
            {
                id: 'q12_3_6',
                type: 'single',
                question: '塑料模具的型腔表面粗糙度要求:',
                options: [
                    { key: 'A', value: '较高（Ra>0.4μm）' },
                    { key: 'B', value: '较低' },
                    { key: 'C', value: '无要求' },
                    { key: 'D', value: '越粗糙越好' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：高光洁度型腔才能得到外观光亮的塑料制品。'   
            },
            {
                id: 'q12_3_7',
                type: 'single',
                question: '注塑成型中的“缩痕”缺陷主要是由什么引起？',
                options: [
                    { key: 'A', value: '保压不足或冷却不均' },
                    { key: 'B', value: '模具温度过高' },
                    { key: 'C', value: '注射速度过快' },
                    { key: 'D', value: '塑料干燥不足' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：缩痕是制品厚壁处熔体收缩得不到足够补料造成的表面凹陷。'   
            },
            {
                id: 'q12_3_8',
                type: 'single',
                question: '热流道模具的特点是：',
                options: [
                    { key: 'A', value: '无浇道凝料，节省材料' },
                    { key: 'B', value: '结构简单' },
                    { key: 'C', value: '成本低' },
                    { key: 'D', value: '适合小批量' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：热流道使流道内塑料始终熔融，无浇口废料，提高材料利用率。'   
            },
            {
                id: 'q12_3_9',
                type: 'single',
                question: '塑料制品中加玻璃纤维的主要目的是:',
                options: [
                    { key: 'A', value: '提高强度和刚度' },
                    { key: 'B', value: '降低成本' },
                    { key: 'C', value: '改善颜色' },
                    { key: 'D', value: '增加透明度' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：玻璃纤维是常用增强材料，可显著提升塑料的力学性能。'   
            },
            {
                id: 'q12_3_10',
                type: 'single',
                question: '3D打印（增材制造）在塑料成型中的优势是:',
                options: [
                    { key: 'A', value: '无需模具，可定制化' },
                    { key: 'B', value: '生产效率高' },
                    { key: 'C', value: '成本低' },
                    { key: 'D', value: '材料种类多' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：D打印无需开模，适合原型制作、个性化定制和小批量生产。'   
            },

            // ========== 12.4 在工程训练中培养学生的创新意识和创新能力 ==========
            {
                id: 'q12_4_1',
                type: 'single',
                question: '工程训练中，项目式教学的主要目的是：',
                options: [
                    { key: 'A', value: '培养学生综合运用知识和创新能力' },
                    { key: 'B', value: '缩短训练时间' },
                    { key: 'C', value: '减少设备使用' },
                    { key: 'D', value: '降低难度' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：项目式教学以真实项目为载体，锻炼综合实践与创新能力。'   
            },
            {
                id: 'q12_4_2',
                type: 'single',
                question: 'TRIZ理论在创新方法中的作用是:',
                options: [
                    { key: 'A', value: '提供解决技术矛盾的系统方法' },
                    { key: 'B', value: '组织管理' },
                    { key: 'C', value: '财务分析' },
                    { key: 'D', value: '市场营销' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：TRIZ即发明问题解决理论，用于系统化地推导技术创新方案。'   
            },
            {
                id: 'q12_4_3',
                type: 'single',
                question: '在工程训练中鼓励“头脑风暴”有助于：',
                options: [
                    { key: 'A', value: '产生多种创意' },
                    { key: 'B', value: '约束思维' },
                    { key: 'C', value: '减少讨论' },
                    { key: 'D', value: '提高成本' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：头脑风暴鼓励自由发散思考，集思广益产生大量创意。'   
            },
            {
                id: 'q12_4_4',
                type: 'single',
                question: '“逆向工程”训练可以：',
                options: [
                    { key: 'A', value: '通过三维扫描等还原产品设计，改进创新' },
                    { key: 'B', value: '直接复制产品' },
                    { key: 'C', value: '避免创新' },
                    { key: 'D', value: '只用于教学' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：逆向工程在消化吸收现有产品基础上进行再创新和优化设计。'   
            },
            {
                id: 'q12_4_5',
                type: 'single',
                question: '创客空间（Maker Space）在工程训练中的作用是：',
                options: [
                    { key: 'A', value: '提供设备、工具和协作环境，支持创意实现' },
                    { key: 'B', value: '替代理论教学' },
                    { key: 'C', value: '仅用于娱乐' },
                    { key: 'D', value: '限制使用' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：创客空间为学生提供开放的动手实践与创意落地平台。'   
            },
            {
                id: 'q12_4_6',
                type: 'single',
                question: '设计思维（Design Thinking）的五个阶段不包括：',
                options: [
                    { key: 'A', value: '数据分析' },
                    { key: 'B', value: '同理心' },
                    { key: 'C', value: '定义问题' },
                    { key: 'D', value: '原型制作' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：设计思维五阶段为共情、定义、构思、原型、测试。'   
            },
            {
                id: 'q12_4_7',
                type: 'single',
                question: '在工程训练中，通过“失败分析”能培养学生的能力：',
                options: [
                    { key: 'A', value: '从错误中学习并改进设计的能力' },
                    { key: 'B', value: '气馁' },
                    { key: 'C', value: '推卸责任' },
                    { key: 'D', value: '忽视细节' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：分析失败原因、总结改进，是创新能力成长的重要途径。'   
            },
            {
                id: 'q12_4_8',
                type: 'single',
                question: '开放式的工程训练题目（如“设计一个智能搬运小车”）有利于：',
                options: [
                    { key: 'A', value: '发挥学生自主创新和团队协作' },
                    { key: 'B', value: '统一标准答案' },
                    { key: 'C', value: '减少工作量' },
                    { key: 'D', value: '限制想象' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：开放性题目没有唯一答案，鼓励多元方案和自主探索。'   
            },
            {
                id: 'q12_4_9',
                type: 'single',
                question: '在工程训练中引入“竞赛机制”的作用是：',
                options: [
                    { key: 'A', value: '激发竞争意识和创新潜能' },
                    { key: 'B', value: '增加压力' },
                    { key: 'C', value: '降低兴趣' },
                    { key: 'D', value: '浪费时间' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：以赛促学，激发学生主动钻研、突破创新的动力。'   
            },
            {
                id: 'q12_4_10',
                type: 'single',
                question: '培养学生的创新能力，工程训练应注重：',
                options: [
                    { key: 'A', value: '跨学科交叉和动手实践' },
                    { key: 'B', value: '仅背诵理论' },
                    { key: 'C', value: '单一工种重复' },
                    { key: 'D', value: '忽视安全' }
                ],
                answer: 'A',
                explanation: '参考答案：A<br>解析：创新能力培养需要多学科知识融合与动手实践相结合。' 
            }
        ]
    };
    
    // CSS样式
    var styles = `
        <style>
            .quiz-js-container * { margin: 0; padding: 0; box-sizing: border-box; }
            .quiz-js-container {
                font-family: 'Microsoft YaHei', Arial, sans-serif;
                background: #f5f5f5;
                width: 100%;
                max-width: 100%;
                height: 100vh;
                padding: 14px;
                overflow: hidden;
                box-sizing: border-box;
            }
            .quiz-js-container .quiz-box {
                width: 100%;
                height: 100%;
                background: white;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }
            .quiz-js-container .quiz-header {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                color: white;
                padding: 18px 20px;
                text-align: center;
                flex-shrink: 0;
            }
            .quiz-js-container .quiz-header h1 { font-size: 20px; margin-bottom: 5px; }
            .quiz-js-container .quiz-header p { font-size: 13px; opacity: 0.9; }
            .quiz-js-container .quiz-body { 
                padding: 20px; 
                min-width: 0;
                flex: 1;
                overflow-y: auto; 
                scrollbar-width: thin;
                scrollbar-color: #4facfe #f1f1f1;
            }
            .quiz-js-container .quiz-body::-webkit-scrollbar {
                width: 5px;
            }
            .quiz-js-container .quiz-body::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 3px;
            }
            .quiz-js-container .quiz-body::-webkit-scrollbar-thumb {
                background: #4facfe;
                border-radius: 3px;
            }
            .quiz-js-container .quiz-body::-webkit-scrollbar-thumb:hover {
                background: #3a8fda;
            }
            .quiz-js-container .question-item {
                margin-bottom: 25px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
                border-left: 4px solid #4facfe;
            }
            .quiz-js-container .question-number {
                display: inline-block;
                background: #4facfe;
                color: white;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                text-align: center;
                line-height: 28px;
                font-size: 14px;
                margin-right: 12px;
                font-weight: bold;
            }
            .quiz-js-container .question-text {
                font-size: 16px;
                color: #333;
                margin-bottom: 15px;
                line-height: 1.6;
            }
            .quiz-js-container .options-list { list-style: none; }
            .quiz-js-container .option-item { margin-bottom: 10px; }
            .quiz-js-container .option-item label {
                display: flex;
                align-items: center;
                padding: 12px 15px;
                min-width: 0;
                background: white;
                border: 2px solid #e9ecef;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 15px;
            }
            .quiz-js-container .option-item label:hover { border-color: #4facfe; background: #f0f8ff; }
            .quiz-js-container .option-item input[type="radio"] {
                margin-right: 12px;
                width: 18px;
                height: 18px;
                cursor: pointer;
            }
            .quiz-js-container .truefalse-options {
                display: flex;
                gap: 15px;
            }
            .quiz-js-container .truefalse-options label {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 14px;
                background: white;
                border: 2px solid #e9ecef;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 16px;
                font-weight: bold;
            }
            .quiz-js-container .truefalse-options label.true:hover { border-color: #28a745; background: #d4edda; }
            .quiz-js-container .truefalse-options label.false:hover { border-color: #dc3545; background: #f8d7da; }
            .quiz-js-container .quiz-footer {
                padding: 15px 20px;
                background: #f8f9fa;
                border-top: 1px solid #e9ecef;
                text-align: center;
                flex-shrink: 0;
            }
            .quiz-js-container .submit-btn {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                color: white;
                border: none;
                padding: 14px 40px;
                font-size: 16px;
                border-radius: 30px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .quiz-js-container .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4); }
            .quiz-js-container .result-container {
                display: none;
                padding: 30px;
                text-align: center;
            }
            .quiz-js-container .result-icon { font-size: 60px; margin-bottom: 20px; }
            .quiz-js-container .result-score {
                font-size: 36px;
                font-weight: bold;
                color: #4facfe;
                margin-bottom: 10px;
            }
            .quiz-js-container .result-text {
                font-size: 18px;
                color: #666;
                margin-bottom: 20px;
            }
            .quiz-js-container .retry-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 30px;
                font-size: 14px;
                border-radius: 25px;
                cursor: pointer;
            }
            .quiz-js-container .explanation {
                display: none;
                margin-top: 15px;
                padding: 14px;
                background: #fff3cd;
                border-left: 4px solid #ffc107;
                border-radius: 5px;
                font-size: 14px;
                color: #856404;
            }
            .quiz-js-container .explanation.show { display: block; }
        </style>
    `;

    // 渲染测试题目    
    function renderQuiz(courseType, containerId, chapterFilter) {
        var questions = quizData[courseType] || [];
        
        // 如果指定了章节筛选，只显示对应章节的题目
        if (chapterFilter && chapterFilter !== '') {
            // 所有课程统一使用q前缀
            questions = questions.filter(function(q) {
                return q.id && q.id.startsWith('q' + chapterFilter + '_');
            });
        }
        
        var container = document.getElementById(containerId);
        
        if (!container) {
            return;
        }
        
        // 移除已有的测试题容器
        var existingQuiz = container.querySelector('.quiz-js-container');
        if (existingQuiz) {
            existingQuiz.remove();
        }
        
        if (questions.length === 0) {
            var noQuizEl = document.createElement('div');
            noQuizEl.style.textAlign = 'center';
            noQuizEl.style.padding = '50px';
            noQuizEl.style.color = '#999';
            noQuizEl.textContent = '暂无测试题目。';
            container.appendChild(noQuizEl);
            return;
        }

        // 添加样式
        if (!document.querySelector('style#quiz-js-styles')) {
            var styleEl = document.createElement('style');
            styleEl.id = 'quiz-js-styles';
            styleEl.innerHTML = styles;
            document.head.appendChild(styleEl);
        }

        // 生成HTML
        var html = '<div class="quiz-js-container"><div class="quiz-box">';
        
        // 头部
        html += '<div class="quiz-header">';
        html += '<h1>在线测验</h1>';
        html += '<p>共' + questions.length + ' 道题</p>';
        html += '</div>';

        // 题目区域
        html += '<div class="quiz-body"><form id="quizForm">';
        
        questions.forEach(function(q, index) {
            html += '<div class="question-item">';
            html += '<div class="question-text">';
            html += '<span class="question-number">' + (index + 1) + '</span>';
            html += q.question;
            html += '</div>';

            if (q.type === 'single') {
                // 单选题
                html += '<ul class="options-list">';
                q.options.forEach(function(opt) {
                    html += '<li class="option-item">';
                    html += '<label>';
                    html += '<input type="radio" name="' + q.id + '" value="' + opt.key + '">';
                    html += '<span>' + opt.key + '. ' + opt.value + '</span>';
                    html += '</label>';
                    html += '</li>';
                });
                html += '</ul>';
            } else if (q.type === 'judge') {
                // 判断题
                html += '<div class="truefalse-options">';
                html += '<label class="true">';
                html += '<input type="radio" name="' + q.id + '" value="true">';
                html += '<span>√ 正确</span>';
                html += '</label>';
                html += '<label class="false">';
                html += '<input type="radio" name="' + q.id + '" value="false">';
                html += '<span>× 错误</span>';
                html += '</label>';
                html += '</div>';
            }

            // 解析
            html += '<div class="explanation" id="exp_' + q.id + '">' + q.explanation + '</div>';
            html += '</div>';
        });

        html += '</form>';

        // 结果区域（放在quiz-body内部，题目后面）
        html += '<div class="result-container" id="resultContainer">';
        html += '<div class="result-icon" id="resultIcon">🎉</div>';
        html += '<div class="result-score" id="resultScore"></div>';
        html += '<div class="result-text" id="resultText"></div>';
        html += '<button class="retry-btn" onclick="QuizSystem.resetQuiz()">重新测验</button>';
        html += '</div>';

        html += '</div>';

        // 底部按钮
        html += '<div class="quiz-footer" id="quizFooter">';
        html += '<button type="button" class="submit-btn" onclick="QuizSystem.submitQuiz(' + questions.length + ')">提交答案</button>';
        html += '</div>';

        html += '</div></div>';

        // 隐藏iframe和其他元素
        var iframe = container.querySelector('#resIframe');
        if (iframe) iframe.style.display = 'none';
        var buildTip = container.querySelector('#buildTip');
        if (buildTip) buildTip.style.display = 'none';
        var vrPagination = container.querySelector('.vr-pagination-container');
        if (vrPagination) vrPagination.style.display = 'none';
        var resTitle = container.querySelector('.res-title');
        if (resTitle) resTitle.style.display = 'none';

        // 追加测试题而不是覆盖
        container.insertAdjacentHTML('beforeend', html);
    }

    // 提交答案
    function submitQuiz(totalQuestions) {
        var courseType = getCurrentCourseType();
        var questions = quizData[courseType] || [];
        var score = 0;
        var answered = 0;

        questions.forEach(function(q) {
            var answer = document.querySelector('input[name="' + q.id + '"]:checked');
            if (answer) {
                answered++;
                if (answer.value === q.answer) {
                    score++;
                }
            }
        });

        if (answered < totalQuestions) {
            alert('请回答所有问题后再提交！');
            return;
        }

        var percentage = (score / totalQuestions) * 100;
        var icon, text;

        if (percentage === 100) {
            icon = '🏆';
            text = '太棒了！你完全掌握了相关知识！';
        } else if (percentage >= 80) {
            icon = '🎉';
            text = '优秀！继续保持！';
        } else if (percentage >= 60) {
            icon = '👍';
            text = '不错！还需要多加练习哦！';
        } else {
            icon = '💪';
            text = '加油！建议复习后再试一次！';
        }

        document.getElementById('resultIcon').textContent = icon;
        document.getElementById('resultScore').textContent = '最终得分：' + Math.round(percentage) + '分（满分100分）';
        document.getElementById('resultText').textContent = text;

        // 显示所有解析        
        questions.forEach(function(q) {
            var exp = document.getElementById('exp_' + q.id);
            if (exp) {
                exp.classList.add('show');
            }
        });

        document.getElementById('quizFooter').style.display = 'none';
        document.getElementById('resultContainer').style.display = 'block';
    }

    // 重置测验
    function resetQuiz() {
        document.querySelectorAll('input[type="radio"]').forEach(function(radio) {
            radio.checked = false;
        });

        // 隐藏所有解析       
        document.querySelectorAll('.explanation').forEach(function(exp) {
            exp.classList.remove('show');
        });

        document.getElementById('quizFooter').style.display = 'block';
        document.getElementById('resultContainer').style.display = 'none';
    }

    // 获取当前课程类型（需要根据实际情况调整）
    function getCurrentCourseType() {
        var courseName = localStorage.getItem("cName");
        if (courseName === "画法几何与机械制图") return 'huafa';
        if (courseName === "液压与气压传动") return 'hydraulic';
        if (courseName === "工程训练") return 'engineering';
        return 'huafa'; // 默认画法几何
    }

    // 公共API
    return {
        quizData: quizData,
        renderQuiz: renderQuiz,
        submitQuiz: submitQuiz,
        resetQuiz: resetQuiz,
        getCurrentCourseType: getCurrentCourseType,
        
        // 添加新测试题
        addQuestion: function(courseType, question) {
            if (!quizData[courseType]) {
                quizData[courseType] = [];
            }
            quizData[courseType].push(question);
        },

        // 获取测试题目        
        getQuestions: function(courseType) {
            return quizData[courseType] || [];
        },

        // 初始化（用于独立页面)       
        init: function(courseType) {
            var type = courseType || getCurrentCourseType();
            renderQuiz(type, 'quizContainer');
        }
    };
})();

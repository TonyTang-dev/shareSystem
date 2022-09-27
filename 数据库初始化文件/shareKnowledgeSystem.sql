-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: shareKnowledgeSystem
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pub` int DEFAULT NULL,
  `articleType` varchar(100) DEFAULT '未分类',
  `beLiked` int DEFAULT '0',
  `beComment` int DEFAULT '0',
  `beScaned` int DEFAULT '0',
  `content` text,
  `title` varchar(128) DEFAULT NULL,
  `cover` varchar(50) DEFAULT 'default.png',
  `articleTag` varchar(50) DEFAULT '默认',
  `articleAbstract` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (25,29,'教育,军事,金融,财政',0,0,0,'>欢迎使用知识分享系统\n```cpp\nclass node{\n\n};\n```','这是第一篇文章','/ced9f252-a366-42ae-96a7-637eeeea700e.png','原创,娱乐','这是第一篇文章的摘要'),(26,29,'军事',1,0,0,'>欢迎使用知识分享系统\n```cpp\nclass node{\n\n};\n```','这是测试的另一篇文章','/default.png','原创','>欢迎使用知识分享系统\n```cpp\nclass node{\n\n};\n```'),(27,29,'金融',3,0,1,'>欢迎使用知识分享系统\n```cpp\nclass node{\n\n};\n```','这是又一篇文章创作','/default.png','原创','222'),(28,30,'金融,军事',3,0,7,'修改就要有修改的样子','这是大雄的文章-修改','/0e83a57b-6edd-4660-98de-95e9e21f4ba9.png','原创,转载','签名要有签名的样子'),(31,29,'战斗机,坦克',0,0,0,'>欢迎使用知识分享系统\n```cpp\nclass node{\n\n};\n```','测试新分类','/0e83a57b-6edd-4660-98de-95e9e21f4ba9.png','原创','测试'),(34,29,'未分类',2,0,18,'>**小札记**，预计开发成一款PC端基于electron的小型编辑器，集成pdf处理功能和markdown编辑功能\n>目前项目处于开发阶段，也希望自己能坚持开发下去\n>当前版本**小札记(pretty note v1.0.0)**\n\n# 开发预期\n一款PC端个人编辑器，选定electron+node.js作为开发底层技术，基于html+css+js+jquery.js+bootstrap来实现；\n当前进度，开始实现前端页面，并去除了windows自带边框，实现自定义边框（实现效果不佳）；\n预期集成pdf处理功能，以满足用户对pdf处理的需求；\n预期集成markdown编辑功能，使得用户可以使用markdown语法编辑文件；\n\n# 当前实现效果\n![在这里插入图片描述](https://img-blog.csdnimg.cn/decae68d43db48ccbaf447f8caa5f731.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5aSW5amG55qE6YW45rGk6bG8,size_20,color_FFFFFF,t_70,g_se,x_16)\n![在这里插入图片描述](https://img-blog.csdnimg.cn/02f0aa93e6c34992bfc8cddb850a0b88.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5aSW5amG55qE6YW45rGk6bG8,size_20,color_FFFFFF,t_70,g_se,x_16)\n\n\n# 操作说明及介绍\n1. 运行软件，有资源管理器可以实时进行资源管理\n2. 软件实现自定义操作栏，右上角实现最大/小化功能及关闭按钮，鼠标按住导航栏中部拖动可实现窗口拖动（注，由于使用js原生实现拖动，因此拖动容易导致丢失，当前请放慢拖动速度，最大化最小化当前也存在部分问题，兼容性不强，后续优化）\n3. 左上角有软件logo及软件名==小札记==，点击此部分，顶层面板旋转弱化，进入底层操作面板，可进行相应操作\n4. 点击操作面板左上角==小札记==部分或直接点击==编辑面板==可恢复到编辑面板\n5. 进一步操作，正在开发中···\n\n# 技术实现\n* 自定义操作栏\n使用html+css+js实现，基于window对象对窗口实现大小变化、关闭窗口,html及js实现方式如下：\n```html\n<div class=\"menu-wrap bottom-menu\">\n			<div class=\"left-wrap\">\n			<span onclick=\"recovery()\" class=\"home-btn\">\n			<span class=\"glyphicon glyphicon-user\"></span>\n			<span>小札记</span>\n			</span>\n			<span>编辑</span>\n			<span>窗口</span>\n			<span>关于</span>\n			</div>\n			<div class=\"fill-wrap\">\n			<font>Note 小札记1.0.0</font>\n			</div>\n			<div class=\"right-wrap\">\n			<!-- 最大化、最小化及关闭按钮 -->\n			<span class=\"glyphicon glyphicon-minus\" onclick=\"operAPP(1)\"></span>\n			<span class=\"tips min\">最小化</span>\n			<span class=\"glyphicon glyphicon-unchecked\" onclick=\"operAPP(1)\"></span>\n			<span class=\"tips max\">最大化</span>\n			<span class=\"glyphicon glyphicon-remove\" onclick=\"operAPP(3)\"></span>\n			<span class=\"tips shutdown\">关闭应用</span>\n		</div>\n</div>\n```\n>js\n```javascript\n// 操作窗口\nfunction operAPP(index){\n    // console.log(window.innerWidth+\" \"+window.screen.width);\n    // 关闭窗口\n    if(index==3){\n        window.close();\n    }\n    // 最大化\n    else if(index==2){\n        if(window.outerWidth < window.screen.width-10){\n            window.resizeTo(window.screen.width,window.screen.height);\n        }\n        else{\n            window.resizeTo(800,600);\n        }\n    }\n    // 最小化\n    else{\n        if(window.outerWidth==300){\n            window.resizeTo(800, 600);\n        }\n        else{\n            window.resizeTo(300,200);\n            window.moveTo(window.screen.width-300,window.screen.height-200);\n        }\n    }\n}\n```\n\n* 滑动窗口位置实现\n此次通过监听鼠标按下和鼠标拖动事件来获得位置并且还窗口位置，js实现如下：\n\n```javascript\n/* 添加窗口拖动效果 */\n    var x=0;\n    var y=0;\n    $(\".fill-wrap\").mousedown(function(event){\n        if(isDrag){\n            isDrag=false;\n            x=event.screenX;\n            y=event.screenY;\n        }\n        else{\n            isDrag=true;\n            x=event.screenX;\n            y=event.screenY;\n        }\n    });\n    $(\"body\").mouseup(function(){\n        isDrag=false;\n    });\n\n    $(\".fill-wrap\").mousemove(function(event){\n        if(isDrag){\n            // 经测试，1.1倍比较柔和适中且\n            window.moveBy(parseInt(1.1*(event.screenX-x)),parseInt(1.1*(event.screenY-y)));\n            \n            // console.log(parseInt(event.screenX-x)+\",\"+parseInt(event.screenY-y));\n            // window.moveTo(0,event.screenY);\n        }\n        x=event.screenX;\n        y=event.screenY;\n    });\n```\n\n* 本编辑器实现了点击logo部分，编辑框旋转偏离从而显现主面板的功能，具体实现请查看**github**或**gitee**仓库\n\n* scroll-bar滚动条的样式设置，css实现如下：\n```css\n/* 滚动条样式 */\n.edit-input-area::-webkit-scrollbar{\n    width: 4px;\n}\n.edit-input-area::-webkit-scrollbar-thumb{\n    border-radius: 5px;\n    background-color: #f88604;\n}\n.edit-input-area::-webkit-scrollbar-thumb:hover{\n    background-color: #2bf156;\n    cursor: pointer;\n}\n.edit-input-area::-webkit-scrollbar-corner{\n    display: none;\n}\n.edit-input-area::-webkit-scrollbar-button{\n    display: none;\n}\n```\n\n# 项目地址\n\ngitee: [https://gitee.com/TangGarlic/prettyNode.git](https://gitee.com/TangGarlic/prettyNode.git)\n\ngithub: [https://github.com/TonyTang-dev/prettyNote.git](https://github.com/TonyTang-dev/prettyNote.git)\n\n# 注意事项\n0. 项目处于开始阶段，还有很长的路要走，正在继续维护，也希望自己能坚持做下去\n1. 本软件是**小札记**社区版1.0.0，基于electron开发\n2. 本项目已开源，可进行下拉二次开发\n3. 本软件还存在若干bug，且软件开发未完毕，正在维护中···\n4. 项目已开源，但拒绝任何形式的恶意利用和恶意开发\n5. 本人声明，任何恶意的二次开发均与本人无关\n6. 如有优化建议或开发需求，我诚挚希望您给我来邮件353-818-2550@qq.com','基于electron的PC编辑器-小札记(prettynote)-1','/2446d9ab-25c2-4f5d-b6f7-192f2cb208cd.png','原创','小札记，预计开发成一款PC端基于electron的小型编辑器，集成pdf处理功能和markdown编辑功能'),(40,29,'税收',1,0,1,'>欢迎使用知识分享系统\n```cpp\nclass node{\n\n};\n```','131','/default.png','原创','>欢迎使用知识分享系统\n```cpp\nclass node{\n\n};\n```'),(41,29,'C++',1,1,1,'\n# 一、基本概念\n队列是一种只允许在表的一端进行操作的线性表，队列的插入称为入队，队列的删除称为出队；允许入队的一端称为队尾，允许出队的一端称为队头；不含任何元素的队列称为空队列；队列也称为先入先出线性表。本文主要介绍顺序队列和链式栈。\n![队列](https://img-blog.csdnimg.cn/c6561ad8a7e340e0a054d0f8544a36ad.png)\n\n# 二、基本操作\n1. 创建队列\n2. 删除队列\n3. 判断队列是否为空\n4. 在队尾插入一个元素\n5. 取队头元素的值\n6. 队头元素出队\n7. 输出队列\n\n# 三、队列的顺序表示及实现\n## 3.1 表示\n1. 采用顺序存储结构的队列称为顺序队列，顺序队列通常用一个一维数组来存放队列中的数据元素。此外，还需要设置两个整型变量front和rear，分别指示队头和队尾，称为头指针和尾指针，front始终指向队头元素，rear始终指向队尾元素。\n队列元素的入队和出队是最基本操作，顺序队列入队时，将新元素插入rear所指位置，再将rear的值加一；出队时，删除front所指位置的元素后，再将front哦值**+1**，并返回被删元素。\n队列满时，再入队则产生上溢，队列为空再出队则产生下溢。\n2. 链式队列是仅在表头删除节点和仅在表尾插入节点的单链表，因为需要在表头进行删除操作和在表尾进行插入操作，所以需要front和rear指针，一个链式队列就可以由**front指针和rear指针唯一确定**。\n## 3.2 问题分析与避免\n由于队列经常做插入删除，front和rear会随着操作的深入而发生变化。如下图，当再进行插入，系统会误以为队列已满，造成空间浪费。\n![假满](https://img-blog.csdnimg.cn/07effd72c5df4c03b6d13c2078109f67.png)\n为避免出现**假上溢**问题，充分利用队列空间，可以将顺序队列存储空间的最后一个位置和第一个位置逻辑上链接到一起，这样的队列叫做循环队列。假设队列能够容纳**MaxSize**个元素，逻辑上的循环是通过头、尾指针的**+1**操作来实现的，再对其进行MaxSize求模运算，即可得出相应的指针位置，保证队列指针位置不发生错误位置索引。\n```cpp\nfront = (front+1) % MaxSize;\nrear = (rear+1) % MaxSize;\n```\n如上情形，当还有新元素入队，由于rear指向0，能够进行入队，解决了假上溢问题。当然，仅根据**front和rear**，无法判断队列是满还是空，因为这两种状态是一样的。要解决这个问题有两种方法：\n1. 约定少用一个元素空间，入队前如果关系`(rear+1)%(MaxSize-1)==front`，就认为队列是满，再插入就会发生溢出，**这种方法，rear指针始终指向那个空闲的元素空间**。\n2. 使用一个计数器size记录当前队列长度，如果**size=0**，且`front==rear`，则当前是空队列，可以进行入队操作，否则，如果队列满的话就不能进行入队操作。\n\n## 3.3 队列实现\n使用C++语言实现的顺序队列和链式队列的实现如下\n```cpp\n//顺序队列\n#include<iostream>\nusing namespace std;\n\ntemplate<class T>\nclass LinearQueue{\n	public:\n		LinearQueue(int LQMaxSize);\n		~LinearQueue();\n		bool IsEmpty();\n		bool IsFull();\n		bool Insert(const T& x);\n		bool GetElement(T& x);\n		bool Delete(T& x);\n		void Output(ostream& out) const;\n		\n	private:\n		int size;\n		int MaxSize;\n		int front,rear;\n		T *element;\n};\n\ntemplate<class T>\nLinearQueue<T>::LinearQueue(int LQMaxSize){\n	MaxSize=LQMaxSize;\n	element=new T[MaxSize];\n	size=0;\n	front=0;\n	rear=0;\n}\ntemplate<class T>\nLinearQueue<T>::~LinearQueue(){\n	delete []element;\n}\ntemplate<class T>\nbool LinearQueue<T>::IsEmpty(){\n	return size==0;\n}\ntemplate<class T>\nbool LinearQueue<T>::IsFull(){\n	return size==MaxSize;\n}\ntemplate<class T>\nbool LinearQueue<T>::Insert(const T& x){\n	if(IsFull()){\n		return false;\n	}\n	else{\n		element[rear]=x;\n		rear=(rear+1)%(MaxSize);\n		size++;\n		return true;\n	}\n}\ntemplate<class T>\nbool LinearQueue<T>::GetElement(T& x){\n	if(IsEmpty()){\n		return false;\n	}\n	else{\n		x=element[front];\n		return true;\n	}\n}\ntemplate<class T>\nbool LinearQueue<T>::Delete(T& x){\n	if(IsEmpty()){\n		return false;\n	}\n	else{\n		x=element[front];\n		front=(front+1)%(MaxSize);\n		size--;\n		return true;\n	}\n}\ntemplate<class T>\nvoid LinearQueue<T>::Output(ostream& out) const{\n	int index;\n	index=front;\n	for(int i=0;i<size;i++){\n		out<<element[index]<<endl;\n		index=(index+1)%MaxSize;\n	}\n}\ntemplate<class T>\nostream& operator<<(ostream& out,LinearQueue<T>& x){\n	x.Output(out);\n	return out;\n}\n\nvoid PrintSpace(int n,int k){\n	for(int i=1;i<=n-k;i++){\n		cout<<\' \';\n	}\n}\nvoid YangHui(int n){\n	LinearQueue<int> Q(n+2);\n	int x,y;\n	PrintSpace(n,1);\n	cout<<\'1\'<<endl;\n	Q.Insert(0);\n	Q.Insert(1);\n	Q.Insert(1);\n	for(int i=2;i<=n;i++){\n		Q.Insert(0);\n		PrintSpace(n,i);\n		do{\n			Q.Delete(x);\n			Q.GetElement(y);\n			if(y){\n				cout<<y<<\' \';\n			}\n			else{\n				cout<<endl;\n			}\n			Q.Insert(x+y);\n		}while(y);\n	}\n	cout<<endl;\n}\nint main(){\n	YangHui(6);\n	return 0;\n}\n```\n```cpp\n//链式队列\n#include<iostream>\nusing namespace std;\n\ntemplate<class T>\nclass LinkQueue;\n\ntemplate<class T>\nclass LinkNode{\n	friend class LinkQueue<T>;\n	\n	public:\n		LinkNode(){\n			next=NULL;\n		}\n	private:\n		T data;\n		LinkNode<T> *next;\n};\n\ntemplate<class T>\nclass LinkQueue{\n	public:\n		LinkQueue();\n		~LinkQueue();\n		bool IsEmpty();\n		bool Insert(const T& x);\n		bool GetElement(T& x);\n		bool Delete(T& x);\n		void Output(ostream& out) const;\n	private:\n		int size;\n		LinkNode<T> *front,*rear;\n};\ntemplate<class T>\nLinkQueue<T>::LinkQueue(){\n	front=NULL;\n	rear=NULL;\n	size=0;\n}\ntemplate<class T>\nLinkQueue<T>::~LinkQueue(){\n	T x;\n	while(front!=NULL){\n		Delete(x);\n	}\n}\ntemplate<class T>\nbool LinkQueue<T>::IsEmpty(){\n	return size==0;\n}\ntemplate<class T>\nbool LinkQueue<T>::Insert(const T& x){\n	LinkNode<T> *p=new LinkNode<T>;\n	if(p==NULL){\n		return false;\n	}\n	else{\n		p->data=x;\n		if(front==NULL){\n			rear=p;\n			front=p;\n		}\n		else{\n			rear->next=p;\n			rear=p;\n		}\n		size++;\n		return true;\n	}\n}\ntemplate<class T>\nbool LinkQueue<T>::GetElement(T& x){\n	if(IsEmpty()){\n		return false;\n	}\n	else{\n		x=front->data;\n		return true;\n	}\n}\ntemplate<class T>\nbool LinkQueue<T>::Delete(T& x){\n	LinkNode<T> *p;\n	if(IsEmpty()){\n		return false;\n	}\n	else{\n		p=front;\n		x=front->data;\n		front=front->next;\n		delete p;\n		size--;\n		return true;\n	}\n}\ntemplate<class T>\nvoid LinkQueue<T>::Output(ostream& out) const{\n	LinkNode<T> *p;\n	p=front;\n	for(int i=0;i<size;i++){\n		out<<p->data<<endl;\n		p=p->next;\n	}\n}\ntemplate<class T>\nostream& operator<<(ostream& out,LinkQueue<T> x){\n	x.Output(out);\n	return out;\n}\n\nvoid printspace(int n,int k){\n	for(int i=1;i<=n-k;i++){\n		cout<<\' \';\n	}\n}\nvoid yanghui(int n){\n	LinkQueue<int> Q;\n	int x,y;\n	printspace(n,1);\n	cout<<\"1\"<<endl;\n	Q.Insert(0);\n	Q.Insert(1);\n	Q.Insert(1);\n	for(int i=2;i<=n;i++){\n		Q.Insert(0);\n		printspace(n,i);\n		do{\n			Q.Delete(x);\n			Q.GetElement(y);\n			if(y){\n				cout<<y<<\' \';\n			}\n			else{\n				cout<<endl;\n			}\n			Q.Insert(x+y);\n		}while(y);\n	}\n	cout<<endl;\n}\nint main(){\n	yanghui(6);\n	\n	return 0;\n}\n```\n\n**=============队列介绍与实现===============**','C++数据结构-链表','/bd4c9e74-2c51-4348-a148-f210e4f22e59.png','原创','C++数据结构-链表');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tang`@`localhost`*/ /*!50003 TRIGGER `autoUpdateTypeNum` AFTER INSERT ON `article` FOR EACH ROW update articleType set num=num+1 where id=5 */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tang`@`localhost`*/ /*!50003 TRIGGER `autoIecreaceArticleNum` AFTER INSERT ON `article` FOR EACH ROW begin
update basicInfor set totalArticle=totalArticle+1;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tang`@`localhost`*/ /*!50003 TRIGGER `autoIncreasePubCredit` AFTER INSERT ON `article` FOR EACH ROW begin 
update credit set totalCredit=totalCredit+3 where linkUser=new.pub;
update sysUser set articleNum=articleNum+1 where id=new.pub;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tang`@`localhost`*/ /*!50003 TRIGGER `autoDecreaceArticleNum` AFTER DELETE ON `article` FOR EACH ROW begin
update basicInfor set totalArticle=totalArticle-1;
update credit set totalCredit=totalCredit-3 where linkUser=old.pub;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `articleTopTen`
--

DROP TABLE IF EXISTS `articleTopTen`;
/*!50001 DROP VIEW IF EXISTS `articleTopTen`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `articleTopTen` AS SELECT 
 1 AS `id`,
 1 AS `acc`,
 1 AS `title`,
 1 AS `cover`,
 1 AS `beScaned`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `articleType`
--

DROP TABLE IF EXISTS `articleType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articleType` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` char(20) DEFAULT NULL,
  `num` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articleType`
--

LOCK TABLES `articleType` WRITE;
/*!40000 ALTER TABLE `articleType` DISABLE KEYS */;
INSERT INTO `articleType` VALUES (1,'教育',1),(2,'军事',2),(3,'财政',1),(4,'金融',3),(5,'默认',14);
/*!40000 ALTER TABLE `articleType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `basicInfor`
--

DROP TABLE IF EXISTS `basicInfor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basicInfor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `totalUser` int DEFAULT '0',
  `totalArticle` int DEFAULT '0',
  `dayRegister` int DEFAULT '0',
  `dayAccess` int DEFAULT '0',
  `commonUser` int DEFAULT '0',
  `commonAdmin` int DEFAULT '0',
  `superAdmin` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basicInfor`
--

LOCK TABLES `basicInfor` WRITE;
/*!40000 ALTER TABLE `basicInfor` DISABLE KEYS */;
INSERT INTO `basicInfor` VALUES (1,11,8,0,0,5,5,1);
/*!40000 ALTER TABLE `basicInfor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit`
--

DROP TABLE IF EXISTS `credit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `linkUser` int DEFAULT NULL,
  `totalCredit` int DEFAULT '0',
  `ranking` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit`
--

LOCK TABLES `credit` WRITE;
/*!40000 ALTER TABLE `credit` DISABLE KEYS */;
INSERT INTO `credit` VALUES (6,29,168,1),(7,30,16,2),(8,31,0,3),(9,32,0,4),(10,33,0,5),(11,34,0,6),(12,35,0,7),(13,36,0,8),(20,43,0,9),(21,44,0,10),(22,45,0,11);
/*!40000 ALTER TABLE `credit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `finalType`
--

DROP TABLE IF EXISTS `finalType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `finalType` (
  `id` int NOT NULL AUTO_INCREMENT,
  `linkRootId` int DEFAULT NULL,
  `linkSecondId` int DEFAULT NULL,
  `typeName` varchar(100) DEFAULT NULL,
  `num` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finalType`
--

LOCK TABLES `finalType` WRITE;
/*!40000 ALTER TABLE `finalType` DISABLE KEYS */;
INSERT INTO `finalType` VALUES (1,1,1,'{\"java\":\"JAVA\"}',1),(2,1,1,'{\"python\":\"PYTHON\"}',1),(3,1,1,'{\"dataStructure\":\"数据结构\"}',1),(4,2,2,'{\"merchandise\":\"商品\"}',1),(5,2,3,'{\"ticket\":\"车票\"}',0),(6,3,4,'{\"warCraft\":\"战斗机\"}',2),(7,3,4,'{\"tank\":\"坦克\"}',1),(10,1,1,'{\"291660719127517\":\"C++\"}',1),(13,4,6,'{\"291660734644439\":\"波动率\"}',0),(14,6,9,'{\"291660873241287\":\"1\"}',1);
/*!40000 ALTER TABLE `finalType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `linkUserId` int DEFAULT NULL,
  `linkArticleId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,29,34),(3,29,32),(12,29,40),(13,29,41);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mainComment`
--

DROP TABLE IF EXISTS `mainComment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mainComment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `linkArticle` int DEFAULT NULL,
  `linkUser` int DEFAULT NULL,
  `commentContent` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mainComment`
--

LOCK TABLES `mainComment` WRITE;
/*!40000 ALTER TABLE `mainComment` DISABLE KEYS */;
INSERT INTO `mainComment` VALUES (20,32,29,'测试'),(21,32,29,'1111111'),(22,32,29,'2222222'),(23,41,29,'刚学C++');
/*!40000 ALTER TABLE `mainComment` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tang`@`localhost`*/ /*!50003 TRIGGER `autoIncreaseUserCommentNum` AFTER INSERT ON `mainComment` FOR EACH ROW update sysUser set userComment=userComment+1 where new.linkUser=id */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tang`@`localhost`*/ /*!50003 TRIGGER `autoIncreaseArticleCommentNum` AFTER INSERT ON `mainComment` FOR EACH ROW update article set beComment=beComment+1 where new.linkArticle=id */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tang`@`localhost`*/ /*!50003 TRIGGER `afterDeleteMainComment` AFTER DELETE ON `mainComment` FOR EACH ROW begin
delete from subComment where linkComment=old.id;
update credit set totalCredit=totalCredit-1 where id=old.linkUser;
update article set beComment=beComment-1 where id=old.linkArticle;
update sysUser set userComment=userComment-1 where id=old.linkUser;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `mainCommentView`
--

DROP TABLE IF EXISTS `mainCommentView`;
/*!50001 DROP VIEW IF EXISTS `mainCommentView`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `mainCommentView` AS SELECT 
 1 AS `id`,
 1 AS `linkArticle`,
 1 AS `acc`,
 1 AS `linkUserId`,
 1 AS `avatar`,
 1 AS `commentContent`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `queryArticleById`
--

DROP TABLE IF EXISTS `queryArticleById`;
/*!50001 DROP VIEW IF EXISTS `queryArticleById`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `queryArticleById` AS SELECT 
 1 AS `id`,
 1 AS `acc`,
 1 AS `pub`,
 1 AS `title`,
 1 AS `cover`,
 1 AS `content`,
 1 AS `articleType`,
 1 AS `articleTag`,
 1 AS `articleAbstract`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `queryBlogGalaxy`
--

DROP TABLE IF EXISTS `queryBlogGalaxy`;
/*!50001 DROP VIEW IF EXISTS `queryBlogGalaxy`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `queryBlogGalaxy` AS SELECT 
 1 AS `userID`,
 1 AS `acc`,
 1 AS `sign`,
 1 AS `avatar`,
 1 AS `id`,
 1 AS `title`,
 1 AS `content`,
 1 AS `cover`,
 1 AS `beScaned`,
 1 AS `beLiked`,
 1 AS `beComment`,
 1 AS `articleType`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `queryTopTen`
--

DROP TABLE IF EXISTS `queryTopTen`;
/*!50001 DROP VIEW IF EXISTS `queryTopTen`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `queryTopTen` AS SELECT 
 1 AS `id`,
 1 AS `acc`,
 1 AS `pass`,
 1 AS `sign`,
 1 AS `gender`,
 1 AS `phone`,
 1 AS `email`,
 1 AS `articleNum`,
 1 AS `beLiked`,
 1 AS `userComment`,
 1 AS `ranking`,
 1 AS `authority`,
 1 AS `avatar`,
 1 AS `token`,
 1 AS `extendMenu`,
 1 AS `credit`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `rootType`
--

DROP TABLE IF EXISTS `rootType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rootType` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeName` varchar(100) DEFAULT NULL,
  `num` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rootType`
--

LOCK TABLES `rootType` WRITE;
/*!40000 ALTER TABLE `rootType` DISABLE KEYS */;
INSERT INTO `rootType` VALUES (1,'{\"education\":\"教育\"}',2),(2,'{\"news\":\"新闻\"}',1),(3,'{\"military\":\"军事\"}',1),(4,'{\"finance\":\"金融\"}',0),(5,'{\"noSort\":\"未分类\"}',0),(6,'{\"291660873240872\":\"1\"}',1);
/*!40000 ALTER TABLE `rootType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `secondType`
--

DROP TABLE IF EXISTS `secondType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `secondType` (
  `id` int NOT NULL AUTO_INCREMENT,
  `linkRootId` int DEFAULT NULL,
  `typeName` varchar(100) DEFAULT NULL,
  `num` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `secondType`
--

LOCK TABLES `secondType` WRITE;
/*!40000 ALTER TABLE `secondType` DISABLE KEYS */;
INSERT INTO `secondType` VALUES (1,1,'{\"CS\":\"计算机\"}',2),(2,2,'{\"life\":\"生活\"}',1),(3,2,'{\"trip\":\"出行\"}',0),(4,3,'{\"weaponry\":\"武器装备\"}',1),(5,4,'{\"tax\":\"税收\"}',1),(6,4,'{\"stock\":\"股票\"}',0),(8,1,'{\"291660721193444\":\"机械\"}',0),(9,6,'{\"291660873241120\":\"1\"}',1);
/*!40000 ALTER TABLE `secondType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subComment`
--

DROP TABLE IF EXISTS `subComment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subComment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `linkComment` int DEFAULT NULL,
  `linkUser` int DEFAULT NULL,
  `replyTo` int DEFAULT NULL,
  `commentContent` text,
  `linkArticle` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subComment`
--

LOCK TABLES `subComment` WRITE;
/*!40000 ALTER TABLE `subComment` DISABLE KEYS */;
INSERT INTO `subComment` VALUES (20,20,29,29,'111111',32);
/*!40000 ALTER TABLE `subComment` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tang`@`localhost`*/ /*!50003 TRIGGER `autoIncreaseUserSubCommentNum` AFTER INSERT ON `subComment` FOR EACH ROW update sysUser set userComment=userComment+1 where new.linkUser=id */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tang`@`localhost`*/ /*!50003 TRIGGER `autoIncreaseArticleSubCommentNum` AFTER INSERT ON `subComment` FOR EACH ROW update article set beComment=beComment+1 where new.linkArticle=id */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tang`@`localhost`*/ /*!50003 TRIGGER `afterDeleteSubComment` AFTER DELETE ON `subComment` FOR EACH ROW begin
update credit set totalCredit=totalCredit-1 where id=old.linkUser;
update article set beComment=beComment-1 where id=old.linkArticle;
update sysUser set userComment=userComment-1 where id=old.linkUser;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `subCommentView`
--

DROP TABLE IF EXISTS `subCommentView`;
/*!50001 DROP VIEW IF EXISTS `subCommentView`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `subCommentView` AS SELECT 
 1 AS `id`,
 1 AS `linkComment`,
 1 AS `linkUser`,
 1 AS `linkUserId`,
 1 AS `avatar`,
 1 AS `replyTo`,
 1 AS `commentContent`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `sysUser`
--

DROP TABLE IF EXISTS `sysUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sysUser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `acc` char(32) DEFAULT NULL,
  `pass` char(32) DEFAULT NULL,
  `sign` varchar(32) DEFAULT '这个人什么也没有写！',
  `gender` int DEFAULT '1',
  `phone` char(15) DEFAULT '无',
  `email` varchar(20) DEFAULT '无',
  `articleNum` int DEFAULT '0',
  `beLiked` int DEFAULT '0',
  `userComment` int DEFAULT '0',
  `ranking` int DEFAULT '0',
  `authority` int DEFAULT '0',
  `avatar` varchar(50) DEFAULT 'default.png',
  `token` varchar(100) DEFAULT NULL,
  `extendMenu` varchar(1000) DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `acc` (`acc`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysUser`
--

LOCK TABLES `sysUser` WRITE;
/*!40000 ALTER TABLE `sysUser` DISABLE KEYS */;
INSERT INTO `sysUser` VALUES (29,'张三','123456','patron',1,'18223075242','777@starnet',3,0,5,1,2,'default.png','张三token1660897317831','[{\"key\":\"administrator\",\"name\":\"用户管理\"},{\"key\":\"sortManage\",\"name\":\"分类管理\"},{\"key\":\"fileManage\",\"name\":\"文件管理\"},{\"key\":\"adManage\",\"name\":\"广告管理\"},{\"key\":\"commentManage\",\"name\":\"评论管理\"}]'),(30,'大雄','7427026597','哈哈哈',1,'18223075242','777@starnet',0,0,0,2,0,'default.png','',''),(31,'小花','123456','黑嘿嘿',1,'18272625353','777@starnet',0,0,0,3,0,'default.png',NULL,'[{\"key\":\"administrator\",\"name\":\"用户管理\"}]'),(32,'小明','123456','是但是的',1,'18272625353','777@starnet',0,0,0,4,1,'default.png',NULL,'[{\"key\":\"administrator\",\"name\":\"用户管理\"}]'),(33,'王大麻子','123456','顶顶顶顶',1,'18272625353','777@starnet',0,0,0,5,1,'default.png',NULL,'[{\"key\":\"administrator\",\"name\":\"用户管理\"}]'),(34,'李小妃子','123456','发反反复复',1,'18272625353','777@starnet',0,0,0,6,1,'default.png',NULL,'[{\"key\":\"administrator\",\"name\":\"用户管理\"}]'),(35,'赵四','123456','发广告广告',1,'18272625353','777@starnet',0,0,0,7,1,'default.png',NULL,'[{\"key\":\"administrator\",\"name\":\"用户管理\"}]'),(36,'王小麻子','123456','黑嘿嘿',1,'18223075242','777@starnet',0,0,0,8,0,'default.png',NULL,''),(43,'22','22','22',1,'22','22',0,0,0,9,1,'default.png','','[{\"key\":\"administrator\",\"name\":\"用户管理\"},{\"key\":\"commentManage\",\"name\":\"评论管理\"}]'),(44,'111111','11','这个人什么都没有写！',1,'11','11',0,0,0,10,0,'default.png',NULL,'[{\"key\":\"fileManage\",\"name\":\"文件管理\"}]'),(45,'0','0','这个人什么都没有写！',1,'无','无',0,0,0,11,0,'default.png','','[{\"key\":\"fileManage\",\"name\":\"文件管理\"}]');
/*!40000 ALTER TABLE `sysUser` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tang`@`localhost`*/ /*!50003 TRIGGER `autoIncreaceUserNum` AFTER INSERT ON `sysUser` FOR EACH ROW begin
update basicInfor set totalUser=totalUser+1;
update basicInfor set commonUser=commonUser+1 where new.authority=0;
update basicInfor set commonAdmin=commonAdmin+1 where new.authority=1;
update basicInfor set superAdmin=superAdmin+1 where new.authority=2;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tang`@`localhost`*/ /*!50003 TRIGGER `autoInsertCreditItem` AFTER INSERT ON `sysUser` FOR EACH ROW insert into credit(linkUser) values(new.id) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tang`@`localhost`*/ /*!50003 TRIGGER `autoDecreaceUserNum` AFTER DELETE ON `sysUser` FOR EACH ROW begin
update basicInfor set totalUser=totalUser-1;
update basicInfor set commonUser=commonUser-1 where old.authority=0;
update basicInfor set commonAdmin=commonAdmin-1 where old.authority=1;
update basicInfor set superAdmin=superAdmin-1 where old.authority=2;
delete from credit b where old.id=d.linkUser;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `articleTopTen`
--

/*!50001 DROP VIEW IF EXISTS `articleTopTen`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`tang`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `articleTopTen` AS select `a`.`id` AS `id`,`b`.`acc` AS `acc`,`a`.`title` AS `title`,`a`.`cover` AS `cover`,`a`.`beScaned` AS `beScaned` from (`article` `a` join `sysUser` `b`) where (`a`.`pub` = `b`.`id`) order by `a`.`beScaned` desc limit 10 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `mainCommentView`
--

/*!50001 DROP VIEW IF EXISTS `mainCommentView`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`tang`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `mainCommentView` AS select `a`.`id` AS `id`,`a`.`linkArticle` AS `linkArticle`,`b`.`acc` AS `acc`,`a`.`linkUser` AS `linkUserId`,`b`.`avatar` AS `avatar`,`a`.`commentContent` AS `commentContent` from (`sysUser` `b` join `mainComment` `a`) where (`a`.`linkUser` = `b`.`id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `queryArticleById`
--

/*!50001 DROP VIEW IF EXISTS `queryArticleById`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`tang`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `queryArticleById` AS select `b`.`id` AS `id`,`a`.`acc` AS `acc`,`b`.`pub` AS `pub`,`b`.`title` AS `title`,`b`.`cover` AS `cover`,`b`.`content` AS `content`,`b`.`articleType` AS `articleType`,`b`.`articleTag` AS `articleTag`,`b`.`articleAbstract` AS `articleAbstract` from (`sysUser` `a` join `article` `b`) where (`a`.`id` = `b`.`pub`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `queryBlogGalaxy`
--

/*!50001 DROP VIEW IF EXISTS `queryBlogGalaxy`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`tang`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `queryBlogGalaxy` AS select `a`.`id` AS `userID`,`a`.`acc` AS `acc`,`a`.`sign` AS `sign`,`a`.`avatar` AS `avatar`,`b`.`id` AS `id`,`b`.`title` AS `title`,`b`.`content` AS `content`,`b`.`cover` AS `cover`,`b`.`beScaned` AS `beScaned`,`b`.`beLiked` AS `beLiked`,`b`.`beComment` AS `beComment`,`b`.`articleType` AS `articleType` from (`sysUser` `a` join `article` `b`) where (`a`.`id` = `b`.`pub`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `queryTopTen`
--

/*!50001 DROP VIEW IF EXISTS `queryTopTen`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`tang`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `queryTopTen` AS select `a`.`id` AS `id`,`a`.`acc` AS `acc`,`a`.`pass` AS `pass`,`a`.`sign` AS `sign`,`a`.`gender` AS `gender`,`a`.`phone` AS `phone`,`a`.`email` AS `email`,`a`.`articleNum` AS `articleNum`,`a`.`beLiked` AS `beLiked`,`a`.`userComment` AS `userComment`,`a`.`ranking` AS `ranking`,`a`.`authority` AS `authority`,`a`.`avatar` AS `avatar`,`a`.`token` AS `token`,`a`.`extendMenu` AS `extendMenu`,(select `credit`.`totalCredit` from `credit` where (`credit`.`linkUser` = `a`.`id`)) AS `credit` from `sysUser` `a` order by `a`.`ranking` limit 10 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `subCommentView`
--

/*!50001 DROP VIEW IF EXISTS `subCommentView`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`tang`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `subCommentView` AS select `a`.`id` AS `id`,`a`.`linkComment` AS `linkComment`,(select `c`.`acc` from `sysUser` `c` where (`c`.`id` = `a`.`linkUser`)) AS `linkUser`,`a`.`linkUser` AS `linkUserId`,`b`.`avatar` AS `avatar`,(select `d`.`acc` from `sysUser` `d` where (`d`.`id` = `a`.`replyTo`)) AS `replyTo`,`a`.`commentContent` AS `commentContent` from (`subComment` `a` join `sysUser` `b`) where (`a`.`linkUser` = `b`.`id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-19 16:59:46

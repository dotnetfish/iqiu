# 弹幕说明

[leancloud SDK安装说明](https://leancloud.cn/docs/sdk_setup-js.html#hash20935048)

1. 服务器推送的消息

	case: 
		{"_lctype": 1, "_lctext":"小飞机关注了这个主播", "_lcattrs" : {"user" : {"id" : "20032019", "name" : "晨曦吻月", "role": 9, "avatar" : "xxxxxx"}, "sm" : {"type": 0}, "gift" : {"id" : 83743784138, "number": 12, "totalFee" : 1200, "anchorId" : "726265"}, "rw" : {"type" : 0, "level" : 0, "isJump" : 0}, "pType" : 0, "pid" : "126712676"}}

	字段介绍: 
		_lctype: -1 (文本消息), 1(系统消息,解析sm), 2(礼物,解析gift), 3(红包,解析rp), 4(跑道,解析rw), 5(禁言,解析fb), 6(设置房管,解析manager)
		_lctext: 消息内容
		_lcattrs: user : id
						 name
						 role: 0(普通用户), 1(房管), 2(主播), 9(超管)
						 avatar: 头像

				  sm : type: 0(领取红包的弹幕), 1(公告类), 2(关注,分享,欢迎语类)

				  fb : uid : (被禁言的ID)
				  	   type: 1:24小时, 2:7天, 3:30天, 4:永久(20年)
				  	   end : 解除禁言的时间 (单位毫秒)


				  gift: id 礼物ID
				  		number 个数
				  		totalFee 总额(分)
				  		anchorId: (主播ID/直播间ID)
				  		anchorName: (主播名称)
				  		name: 礼物名称
				  		picture: 图片
				  		playGif: 是否播放GIF

		  		  rp: id
		  		     time 倒计时用,单位(毫秒)
		  		     type: 0(主播发的红包)

			      rw: type: 0(直播间), 1(全站)
			     	  level:0(普通), 1(白银), 2(黄金), 
			     	  isJump: 是否跳入直播间: 0(不可以), 1(可以)
			     	  anchorId: (主播ID/直播间ID)
			     	  anchorName: (主播名称)
			     	  name: 礼物名称
			  		  picture: 图片
			  		  id: 礼物ID
			  		  times: 滚动次数
			  		  duration: 持续时间, 单位(毫秒)  -- 在 _lctext 里面增加 "xxx赠送给主播xxxxx  x 个 xxxx ！快来围观吧！"

		  		  manager : 
		  		  	  id : (被操作的ID)
				  	  type: 0:添加, 1:删除

		     	  pType: 0(直播间), 1(全站), 2(赛程聊天室)

		     	  pid: 

		     	  from: 0 (0:服务器, 101:MIFAN_pc, 201:MIFAN_h5, 301:MIFAN_Android, 401:MIFAN_iOS_app_store, 402:MIFAN_iOS_ota)

2. 客户端相互间推送
	
	case : 
		{"_lctype":-1, "_lctext":"你好,小可", "_lcattrs" : {"user" : {"id" : "20032019", "name" : "晨曦吻月", "role": 9, "avatar" : "xxxxxx", "token":"xxxx"}, "black": "xxxxxx", pType" : 0, "pid" : "126712676", "lcuid": "CHAT_USER_6474075", from: }

			  pType: 0(直播间), 1(全站), 2(赛程聊天室)

	     	  pid: 

	     	  lcuid: leancloudUid: 命名规范如3   用户: CHAT_USER_uid  游客: CHAT_VISITOR_mac地址

3. 命名规范, 创建用户时按照如下规则
	
	用户: CHAT_USER_uid  : 用户需要加TAG(PC, iOS, Android, M, iPad 注意: 一定要这5个,超出会另收费) 参考文档: https://leancloud.cn/docs/realtime-guide-intermediate.html#hash502615897  和  https://leancloud.cn/docs/realtime-guide-intermediate.html#hash-1327699533 和 https://leancloud.cn/docs/realtime-guide-intermediate.html#hash-2140562613
	游客: CHAT_VISITOR_mac地址
	服务端: CHAT_MIFAN_SYSTEM

4. channel/info 接口里面增加2个字段
	
	chatRooms: [xxxxx]  为list,取第一个
	isChatRoomPart: false (false: 不分房间,   turn: 分房间, 如果分房间的话, 根据用户uid的末尾进行hash, 到chatRooms里面对应的房间号,case: 用户32761 进入 CHAT_ROOM_主播ID_1 )
		注意: 本期可以不实现, 但是要按照顺序解析

5. 测试leanCloud账户信息如下, 正式的和我要:
	
	appId: 6u6EpgkBCEwXwQpGrSYulSM3-9Nh9j0Va
    appKey: CmLGpemJK7Qq2xJjpauRYbCW
    masterKey: z2DoOqYqmQHxouHSTQBA9Kap
    apiHost: https://6u6epgkb.lc-cn-e1-shared.com







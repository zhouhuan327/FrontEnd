myApp.onPageInit('questionnaireDetail', function(page) {
	document.title = "问卷调查";
	var userId = sessionStorage.getItem('userId');
	var userName = sessionStorage.getItem('userName');
	// personInfoInit();
	// 测试
	//	 userId = "20145032060";

	var questionnaireId = page.query.id;

	//老师0、学生1
	var userType = "";

	//获取籍贯和部门信息
	$$.ajax({
		url: "../../questionnaireSurvey/queryUserDetail",
		method: "post",
		data: {
			"userId": userId
		},
		beforeSend: function() {},
		dataType: "json",
		success: function(data) {
			$$("#userName").text("姓名：" + data.rows[0].USERNAME);
			$$("#orgName").text("所属单位或班级：" + data.rows[0].DEPT);
			userType = data.rows[0].TYPE;
			// $$("#jiguan").text("籍贯:" + data.rows[0].nativePlace);
		},
		error: function() {
			$Vany.show({
				type: "toast",
				toast_text: "网络错误",
			});
		},
	})

	//请求问卷
	$$.ajax({
		url: "../../questionnaireSurvey/queryQuestionnaireDetail",
		method: "post",
		data: {
			"questionnaireId": questionnaireId,
			"userId": userId
		},
		beforeSend: function() {},
		dataType: "json",
		success: function(data) {
			// 	var data= {
			// 		rows: [{
			// 			"SHOWRESULT": true,
			// 			"QUESTIONTITLE": "每日健康上报2020年2月6日",
			// 			"HASANSWER": false,
			// 			"BETWEEN": "2020-02-06 至 2020-02-07",
			// 			"STATE": "已结束",
			// 			"SUBTITLE": "为更好的开展我校疫情防御工作，请师生认真填写一下内容"
			// 		}, {
			// 			"ANSWERTEXT": "",
			// 			"TITLE": "手机号码",
			// 			"INDEX": "Q1",
			// 			"ITEMID": "2cdcd8a6-c78a-433a-b666-17bef0b80061",
			// 			"TYPE": "textFill",
			// 			"REQUIRE": false
			// 		}, {
			// 			"ANSWERTEXT": "",
			// 			"TITLE": "你的籍贯，如xxx省xxx市xxx县",
			// 			"INDEX": "Q2",
			// 			"ITEMID": "edd1f450-e50d-478b-b565-09381c07b7bc",
			// 			"TYPE": "textFill",
			// 			"REQUIRE": false
			// 		}, {
			// 			"ANSWERTEXT": "",
			// 			"TITLE": "家庭地址，如xxx省xxx市xxx县xx街道x x x小区xx栋xx单元xx号",
			// 			"INDEX": "Q3",
			// 			"ITEMID": "04353b38-9585-467f-8b0d-d2adae7a2b73",
			// 			"TYPE": "areaFill",
			// 			"REQUIRE": false
			// 		}, {
			// 			"ANSWERTEXT": "",
			// 			"TITLE": "目前居住地址，如xxx省xxx市xxx县xx街道x x x小区xx栋xx单元xx号",
			// 			"INDEX": "Q4",
			// 			"ITEMID": "17ef7870-9bc1-4d85-bc69-33e638d06287",
			// 			"TYPE": "areaFill",
			// 			"REQUIRE": false
			// 		}, {
			// 			"TITLE": "本人身体是否有不适？",
			// 			"INDEX": "Q5",
			// 			"ITEMID": "8262b2ab-ec24-4550-ba1c-da1234d8ecc2",
			// 			"OPTIONS": [{
			// 				"SUBID": "4b698ea4-51c1-4eea-b2c6-ff9a1463eb76",
			// 				"IMGS": "",
			// 				"OPTION": "健康",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "ea9832cf-3f67-45c1-8295-c37fc65df1c0",
			// 				"IMGS": "",
			// 				"OPTION": "发热",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "5b24aa16-33ed-47d3-8fbf-7f29c175d9af",
			// 				"IMGS": "",
			// 				"OPTION": "咳嗽",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "7ba9d3d2-db31-4311-b010-6f311c7a00d4",
			// 				"IMGS": "",
			// 				"OPTION": "感冒",
			// 				"CHECKED": false
			// 			}, {"SUBID": "6679f7f9-9079-4582-81f8-42533f3002d5", "IMGS": "", "OPTION": "其他", "CHECKED": false}],
			// 			"TYPE": "checkbox",
			// 			"REQUIRE": false
			// 		}, {
			// 			"TITLE": "14日内是否接触以下人群？",
			// 			"INDEX": "Q6",
			// 			"ITEMID": "b7c978f5-afb9-4f66-9d7e-d4a42009f74f",
			// 			"OPTIONS": [{
			// 				"SUBID": "a1d9648e-4c1d-4eaf-84a9-324e1371f581",
			// 				"IMGS": "",
			// 				"OPTION": "湖北人（不包含武汉人）",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "8e022b9c-c828-474c-9c9c-291f099980ef",
			// 				"IMGS": "",
			// 				"OPTION": "武汉人",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "1407dc77-7ed1-4ce5-b0e8-a2147c7e5913",
			// 				"IMGS": "",
			// 				"OPTION": "温州人",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "ce79eeab-094f-40b0-8c19-806adc723eab",
			// 				"IMGS": "",
			// 				"OPTION": "温岭人",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "16a05b60-6fdb-49bf-91da-22c70851e405",
			// 				"IMGS": "",
			// 				"OPTION": "黄岩人",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "8f506691-cb3c-4007-976b-6c73f0cd94b1",
			// 				"IMGS": "",
			// 				"OPTION": "未接触以上人群",
			// 				"CHECKED": false
			// 			}],
			// 			"TYPE": "checkbox",
			// 			"REQUIRE": false
			// 		}, {
			// 			"TITLE": "14日内是否去过以下省市或地区？",
			// 			"INDEX": "Q7",
			// 			"ITEMID": "e8a8edb7-922f-4368-9ba5-93df06b29f28",
			// 			"OPTIONS": [{
			// 				"SUBID": "d691888c-767a-466d-a6b9-76eb62fc0d47",
			// 				"IMGS": "",
			// 				"OPTION": "湖北（不包含武汉）",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "cfca5882-7561-4dc1-8290-ff173c482408",
			// 				"IMGS": "",
			// 				"OPTION": "武汉",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "b443e2cb-9bed-4ff1-b5b0-e4047888b094",
			// 				"IMGS": "",
			// 				"OPTION": "温州",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "49adaf21-1955-4530-82f1-a63537edb3eb",
			// 				"IMGS": "",
			// 				"OPTION": "温岭",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "307f66d0-365b-4fcc-a63e-e46c718d468a",
			// 				"IMGS": "",
			// 				"OPTION": "黄岩",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "13b6a340-fa7d-481c-ae92-15973257773d",
			// 				"IMGS": "",
			// 				"OPTION": "未去过以上城市",
			// 				"CHECKED": false
			// 			}],
			// 			"TYPE": "checkbox",
			// 			"REQUIRE": false
			// 		}, {
			// 			"TITLE": "14日内是否接触确诊病例？",
			// 			"INDEX": "Q8",
			// 			"ITEMID": "25cee918-d346-4c89-996c-df5e6e7e9846",
			// 			"OPTIONS": [{
			// 				"SUBID": "96b56bb7-2868-4423-b375-0e07f34d14f7",
			// 				"IMGS": "",
			// 				"OPTION": "是",
			// 				"CHECKED": false
			// 			}, {"SUBID": "df0ba2ed-4afa-45db-b8cd-0f7562200f2e", "IMGS": "", "OPTION": "否", "CHECKED": false}],
			// 			"TYPE": "radio",
			// 			"REQUIRE": false
			// 		}, {
			// 			"TITLE": "14日内是否接触疑似病例？",
			// 			"INDEX": "Q9",
			// 			"ITEMID": "b016bf6b-9634-41ae-b1cc-ee04295c5ec2",
			// 			"OPTIONS": [{
			// 				"SUBID": "02cace83-9874-4999-99c2-184aa0f06430",
			// 				"IMGS": "",
			// 				"OPTION": "是",
			// 				"CHECKED": false
			// 			}, {"SUBID": "c496d9d9-550b-45cf-8516-0964ff8c391f", "IMGS": "", "OPTION": "否", "CHECKED": false}],
			// 			"TYPE": "radio",
			// 			"REQUIRE": false
			// 		}, {
			// 			"TITLE": "目前本人的实际状态",
			// 			"INDEX": "Q10",
			// 			"ITEMID": "69f5a35e-529f-403c-9fbe-9444211cccdd",
			// 			"OPTIONS": [{
			// 				"SUBID": "4816f71d-95ef-4ce0-8861-1c8dc48cb626",
			// 				"IMGS": "",
			// 				"OPTION": "正常",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "ebfce0a8-aefe-410f-a3a1-bf61185e7e1a",
			// 				"IMGS": "",
			// 				"OPTION": "自主居家医学观察",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "5b028712-d677-4b42-b673-05cdf1289974",
			// 				"IMGS": "",
			// 				"OPTION": "社区强制居家医学观察",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "f5f46dd0-bd97-49a5-8d11-406a8f99166c",
			// 				"IMGS": "",
			// 				"OPTION": "被地方疾控集中隔离",
			// 				"CHECKED": false
			// 			}],
			// 			"TYPE": "radio",
			// 			"REQUIRE": false
			// 		}, {
			// 			"TITLE": "目前家庭直系亲属健康状况",
			// 			"INDEX": "Q11",
			// 			"ITEMID": "8c762f39-b77b-4ac9-aeca-a604c8721ff2",
			// 			"OPTIONS": [{
			// 				"SUBID": "44e7b842-3042-4125-befa-4be60718fd31",
			// 				"IMGS": "",
			// 				"OPTION": "正常",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "36b48a90-7ecc-450d-8f96-381b44739792",
			// 				"IMGS": "",
			// 				"OPTION": "自主居家医学观察",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "85a0603b-476a-40b0-aa7e-b2da613813ff",
			// 				"IMGS": "",
			// 				"OPTION": "社区强制居家医学观察",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "a177f86f-b781-4035-a0bc-7a2ba1f70c2d",
			// 				"IMGS": "",
			// 				"OPTION": "被地方疾控集中隔离",
			// 				"CHECKED": false
			// 			}],
			// 			"TYPE": "radio",
			// 			"REQUIRE": false
			// 		}, {
			// 			"TITLE": "14天内是否有聚会聚餐？",
			// 			"INDEX": "Q12",
			// 			"ITEMID": "a7b5e891-e26a-4171-8c57-7309a18b4f0c",
			// 			"OPTIONS": [{
			// 				"SUBID": "703df5ac-e8ba-411c-ac40-fac92a3abf63",
			// 				"IMGS": "",
			// 				"OPTION": "有",
			// 				"CHECKED": false
			// 			}, {"SUBID": "6de73c0f-7302-49e7-8c80-99b011ef7a2d", "IMGS": "", "OPTION": "无", "CHECKED": false}],
			// 			"TYPE": "radio",
			// 			"REQUIRE": false
			// 		}, {
			// 			"ANSWERTEXT": "",
			// 			"TITLE": "问题8和问题9选择b选项回答“是”者填写具体情况：如xx月xx日，通过聚餐接触湖北上学同学，该同学目前情况正常，本人情况正常，居家隔离观察中。",
			// 			"INDEX": "Q13",
			// 			"ITEMID": "c7789caa-6c19-429c-b940-61c656aa75d0",
			// 			"TYPE": "areaFill",
			// 			"REQUIRE": false
			// 		}, {
			// 			"ANSWERTEXT": "",
			// 			"TITLE": "其他需要说明事项",
			// 			"INDEX": "Q14",
			// 			"ITEMID": "9558e74e-3bb1-4f53-b16c-4ac1e3010ca7",
			// 			"TYPE": "areaFill",
			// 			"REQUIRE": false
			// 		}, {
			// 			"ANSWERTEXT": "",
			// 			"TITLE": "预定返校时间填写：如xx月xx日上午，不确定可不填写",
			// 			"INDEX": "Q15",
			// 			"ITEMID": "82e1879e-73b2-421d-bd85-9bcc058005bb",
			// 			"TYPE": "textFill",
			// 			"REQUIRE": false
			// 		}, {
			// 			"TITLE": "乘坐交通工具",
			// 			"INDEX": "Q16",
			// 			"ITEMID": "85bf689c-1f84-41f1-b65d-7af2d85157f5",
			// 			"OPTIONS": [{
			// 				"SUBID": "85be3075-178c-4ff7-811a-2ebdd2e74bc3",
			// 				"IMGS": "",
			// 				"OPTION": "火车",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "22bd1d99-fdf5-4c7b-b2f5-011df8ca8958",
			// 				"IMGS": "",
			// 				"OPTION": "飞机",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "865662ad-d247-4fed-b270-927e2e362dc0",
			// 				"IMGS": "",
			// 				"OPTION": "自驾",
			// 				"CHECKED": false
			// 			}, {
			// 				"SUBID": "79f90659-9f55-404a-aa2a-7befaf413918",
			// 				"IMGS": "",
			// 				"OPTION": "其他",
			// 				"CHECKED": false
			// 			}, {"SUBID": "cfd8e6ab-6057-4ca1-8245-7207878458d6", "IMGS": "", "OPTION": "待定", "CHECKED": false}],
			// 			"TYPE": "checkbox",
			// 			"REQUIRE": false
			// 		}, {
			// 			"ANSWERTEXT": "",
			// 			"TITLE": "乘坐公共交通工具信息填写：如g1234次x车x作，不确定可不填写",
			// 			"INDEX": "Q17",
			// 			"ITEMID": "818137a5-7250-490d-9205-0cfd1883ab0e",
			// 			"TYPE": "areaFill",
			// 			"REQUIRE": false
			// 		}]
			// 	}
			//写问卷信息
			$$(".bgblue h1").text(data.rows[0].QUESTIONTITLE);
			// $$(".bgblue h2").text("——" + data.rows[0].SUBTITLE);
			// $$("#expired").text("有效期限：" + data.rows[0].BETWEEN);
			// $$("#state_").text("问卷状态：" + data.rows[0].STATE);
			$$("#userId").text("学号/工号:" + userId);
			// $$("#userName").text("姓名：" + userName);
			//$$("#orgName").text("所属部门/班级：" + sessionStorage.getItem('orgname'));
			//遍历写题目
			var i, len = data.rows.length;
			for (i = 1; i < len; i++) {
				//老师和学生
				if (data.rows[i].INDEX === 'Q15') {
					continue;
				}
				//老师
				if (userType === '0') {
					if (data.rows[i].INDEX === 'Q2' || data.rows[i].INDEX === 'Q5' || data.rows[i].INDEX === 'Q6' || data.rows[i].INDEX === 'Q7' || data.rows[i].INDEX === 'Q16' || data.rows[i].INDEX === 'Q20' || data.rows[i].INDEX === 'Q21' || data.rows[i].INDEX === 'Q22' || data.rows[i].INDEX === 'Q29' || data.rows[i].INDEX === 'Q30' || data.rows[i].INDEX === 'Q31') {
						continue;
					}
				}


				var type = data.rows[i].TYPE;
				var result;
				if (type === "radio" || type === "checkbox" || type === "imgRadio" || type === "imgCheckbox") {
					result = createOption(data.rows[i]);
				} else if (type === "textFill" || type === "areaFill") {
					result = createText(data.rows[i]);
				} else if (type === "score") {
					result = createRankInput(data.rows[i]);
				} else {
					result = createMatrix(data.rows[i]);
				}
				$$(".questionsContent").append(result);
				setWidth();
			}
			$("#distpicker").distpicker({
				autoSelect: false,
				province: data.rows[2].ANSWERTEXT.split(',')[0],
				city: data.rows[2].ANSWERTEXT.split(',')[1],
				district: data.rows[2].ANSWERTEXT.split(',')[2]
			});
			// $$('#province10').val(data.rows[2].ANSWERTEXT.split(',')[0]);
			// $$('#city10').val(data.rows[2].ANSWERTEXT.split(',')[1]);
			// $$('#district10').val(data.rows[2].ANSWERTEXT.split(',')[2]);
			//如果未开始则仅展示问卷题目
			if (data.rows[0].STATE === "未开始" || data.rows[0].STATE === "已结束") {

				$Vany.show({
					type: "toast",
					toast_text: "该问卷调查" + data.rows[0].STATE,
				});
				$$(".questionsFooter a, input, textarea").addClass("disabled");
			}
			//如果问卷已填写则回写仅做展示;false为复制的问卷
			if (data.rows[0].HASANSWER) {
				// $$(".questionsFooter a").css({'background':'#708090'});
				$$(".questionsFooter a")[0].innerHTML = '我要修改';
				$$("[data-valid='false']").data("valid", "true");
				$$("input, textarea").addClass("disabled");
				$$('select').attr('disabled', 'disabled')
			} else {

			}
		},
		error: function() {
			$Vany.show({
				type: "toast",
				toast_text: "网络错误",
			});
		},
	});


	//问卷提交&展示结果
	$$("#sumit_form").click(function() {
		var this_ = this;
		if ($$("#sumit_form").text() == '我要修改') {
			$$(".questionsFooter a")[0].innerHTML = '提交问卷';
			$$("input, textarea").removeClass("disabled");
			$$('select').removeAttr('disabled')
		} else {
			if (!$$('#chengnuo')[0].checked) {
				$Vany.show({
					type: "toast",
					toast_text: "请勾选承诺书",
				});
				return false;
			}
			if (!validForm()) {
				$Vany.show({
					type: "toast",
					toast_text: "请正确填写问卷",
				});
				return false;
			}
			var answer = getAnswer();
			$$(".questionsFooter a, input, textarea").addClass("disabled");
			$$.ajax({
				url: "../../questionnaireSurvey/addQuestionnaireRecord",
				method: "POST",
				data: {
					"questionnaireId": questionnaireId,
					"userId": userId,
					"answerData": JSON.stringify(answer)
				},
				beforeSend: function() {},
				dataType: "json",
				success: function(data) {
					if (data.rspcode === "000000") {
						$Vany.show({
							type: "toast",
							toast_text: "提交成功",
						});

						// $$(".questionsFooter a").css({'background':'#708090'});
						$$(".questionsFooter a").removeClass("disabled");
						$$(".questionsFooter a")[0].innerHTML = '我要修改';
						$$("input, textarea").addClass("disabled");
						$$('select').attr('disabled', 'disabled')
					} else {
						$Vany.show({
							type: "toast",
							toast_text: data.rspmsg,
						});
					}
				},
				error: function() {
					$$(".questionsFooter a, input, textarea").removeClass("disabled");
					$Vany.show({
						type: "toast",
						toast_text: "网络错误",
					});
				},
			});
			//请求结果
			//		$$.ajax({
			//			url: "json/result.json",
			//			method: "GET",
			//			data: "",
			//			beforeSend: function() {},
			//			dataType: "json",
			//			success: function(data) {
			//				$$("#expired").text(data.rows[0].ANSWERDATE);
			//				var i, len = data.rows.length,
			//					type, div;
			//				for(i = 1; i < len; i++) {
			//					var j, resultLen,
			//						type = data.rows[i].TYPE,
			//						total = 0,
			//						tempArray = [],
			//						optionsId = [],
			//						curoption;
			//					var setUrl = $$(".questions_item h1").eq(i - 1);
			//					var temp_text = setUrl.html();
			//					switch(type) {
			//						case "radio":
			//						case "checkbox":
			//						case "imgRadio":
			//						case "imgCheckbox":
			//							resultLen = data.rows[i].OPTIONS.length;
			//							for(j = 0; j < resultLen; j++) {
			//								tempArray.push(data.rows[i].OPTIONS[j].RESULT);
			//								total += data.rows[i].OPTIONS[j].RESULT;
			//								optionsId.push(data.rows[i].OPTIONS[j].ITEMID);
			//							}
			//							for(var k = 0; k < optionsId.length; k++) {
			//								curoption = $$("[data-subid='" + optionsId[k] + "']");
			//								curoption.find(".vote_result span").text(tempArray[k] + "人");
			//								curoption.find(".vote_result").css({
			//									"width": tempArray[k] / total * 100 + "%",
			//								});
			//							}
			//							setUrl.html('<a href="eachDetail.html?type=' + type + '&id=' + $$(".questions_item").eq(i - 1).attr("data-itemid") + '" class="item-link item-content">' + temp_text + '</a>');
			//							break;
			//						case "textFill":
			//						case "areaFill":
			//							optionsId = data.rows[i].ITEMID;
			//							curoption = $$("[data-itemid='" + optionsId + "']");
			//							div = $$('<div class="inputtype"></div>');
			//							div.append('<p class="peoplename">' + data.rows[0].ANSWERPEOPLE + '</p>');
			//							div.append('<p class="org">' + data.rows[0].ORG + '</p>');
			//							div.append('<p class="answertext">' + data.rows[i].ANSWERTEXT + '</p>');
			//							curoption.append(div);
			//							setUrl.html('<a href="eachDetail.html?type=' + type + '&id=' + $$(".questions_item").eq(i - 1).attr("data-itemid") + '" class="item-link item-content">' + temp_text + '</a>');
			//							break;
			//						case "score":
			//							optionsId = data.rows[i].ITEMID;
			//							curoption = $$("[data-itemid='" + optionsId + "']");
			//							div = $$('<div class="ranktype"></div>');
			//							div.append('<p>平均分值</p>');
			//							div.append('<p><span>' + data.rows[i].AVERAGE + '</span>分</p>');
			//							curoption.append(div);
			//							setUrl.html('<a href="eachDetail.html?type=' + type + '&id=' + $$(".questions_item").eq(i - 1).attr("data-itemid") + '" class="item-link item-content">' + temp_text + '</a>');
			//							break;
			//					}
			//				}
			//				setResultCSS();
			//				$$(this_).addClass("disabled");
			//			},
			//			error: function() {
			//				$Vany.show({
			//					type: "toast",
			//					toast_text: "网络错误",
			//				});
			//			},
			//		});
		}

	});
});

//从问卷详情返回后判断是否要更新问卷
myApp.onPageAfterBack("questionnaireDetail", function(page) {
	if ($$(".questionsFooter a").hasClass("disabled")) {
		var questionnaireId = page.query.id;
		$$.ajax({
			url: "../../questionnaireSurvey/queryQuestionnaireInfoById",
			method: "POST",
			data: {
				"questionnaireId": questionnaireId,
				"userId": userId
			},
			beforeSend: function() {},
			dataType: "json",
			success: function(data) {
				//局部更新该问卷的填写、参与人数
				if (data.rows[0].HASANSWER) {
					$$("#" + questionnaireId).find(".item-subtitle").text("已填写").addClass("state");
				}
				$$("#" + questionnaireId).find(".item-after").eq(1).text(data.rows[0].CANYUSHU + "人已参与");
			},
			error: function() {
				$Vany.show({
					type: "toast",
					toast_text: "网络错误",
				});
			},
		});
	}
});
// 获取中风险地区
function closeRiskDig() {
	$$("#riskDig").css('display', 'none')
}

function openRiskDig() {

	$$.ajax({
		url: "../../riskArea/searchRiskArea",
		method: "POST",
		beforeSend: function() {},
		dataType: "json",
		success: function(data) {
			$$("#riskArea").html(data[0].RISKAREAINFO)
			$$("#riskDig").css('display', 'block')
		},
		error: function() {
			$Vany.show({
				type: "toast",
				toast_text: "网络错误",
			});
		},
	});
}


//获取用户信息load接口
// function personInfoInit(){
// 	$$.ajax({
// 			url: "/manage/user/load",
// 			method: "get",
// 			data: {
// 				"userId":sessionStorage.getItem('userId')
// 			},
// 			success: function(data) {
// 				sessionStorage.setItem('orgname',JSON.parse(data).rows[0].ORGNAME);
//                 $$("#orgName").text("所属部门/班级：" + JSON.parse(data).rows[0].ORGNAME);
// 			},
// 			error: function() {
// 				$Vany.show({
// 					type: "toast",
// 					toast_text: "网络错误",
// 				});
// 			},
// 		});
// }
//创建单复选（含图片单复选）
function createOption(obj) {
	var template = '<div class="questions_item ' + obj.TYPE;
	var p = '';
	var data_valid = false;
	//用于回写选项状态
	var ischecked = "";
	var typename;
	if (obj.REQUIRE) {
		$$.each(obj.OPTIONS, function(index, item) {
			if (item.CHECKED) {
				data_valid = true;
				return false;
			}
		})
	} else {
		data_valid = true;
	}

	//非必填则提交时候不用验证，data-valid属性设置为true
	//obj.REQUIRE ? data_valid = "false" : data_valid = "true";
	if (obj.REQUIRE) {
		template += ' require';
		p = '<p class="form_valid"></p>';
	}
	switch (obj.TYPE) {
		case "radio":
		case "imgRadio":
			obj.TYPE === "radio" ? typename = "单选" : typename = "图片单选";
			template += '" data-itemid="' + obj.ITEMID + '" data-valid="' + data_valid + '"><h1>' + obj.INDEX + '.' + obj.TITLE + '（' + typename + '）';
			break;
		case "checkbox":
		case "imgCheckbox":
			obj.TYPE === "checkbox" ? typename = "多选" : typename = "图片多选";
			template += '" data-itemid="' + obj.ITEMID + '" data-valid="' + data_valid + '"><h1>' + obj.INDEX + '.' + obj.TITLE + '（' + typename + '）';
			break;
	}
	if (obj.REQUIRE) {
		template += '<span>*</span>';
	}
	template += '</h1>';

	var i, len = obj.OPTIONS.length;
	var optiontext = '<div class="question_options">';
	for (i = 0; i < len; i++) {
		obj.OPTIONS[i].CHECKED ? ischecked = "checked" : ischecked = "";
		optiontext += '<div class="options_item ' + ischecked + '" data-subid="' + obj.OPTIONS[i].SUBID + '" onclick="select_option(this)"><i class="icon iconfont">';
		switch (obj.TYPE) {
			case "radio":
			case "imgRadio":
				if (obj.OPTIONS[i].CHECKED) {
					optiontext += '&#xe679;</i>';
				} else {
					optiontext += '&#xe677;</i>';
				}
				break;
			case "checkbox":
			case "imgCheckbox":
				if (obj.OPTIONS[i].CHECKED) {
					optiontext += '&#xe678;</i>';
				} else {
					optiontext += '&#xe67a;</i>';
				}
				break;
		}
		if (obj.OPTIONS[i].IMGS.length !== 0) {
			optiontext += '<img src="' + obj.OPTIONS[i].IMGS + '" width="60" height="60" />';
		}
		optiontext += '<div class="option_text"><p>' + obj.OPTIONS[i].OPTION + '</p><p class="vote_result"><span></span></p></div></div><div class="detail_result"></div>';
	}
	optiontext += '</div>';
	template += optiontext + p + '</div>';
	return template;
}

//创建矩阵单选
function createMatrix(obj) {
	var template = '<div class="questions_item matrix_" data-itemid="' + obj.ITEMID + '">';
	var data_valid;
	var p = '';
	//用于回写选项状态
	var ischecked = "";
	//非必填则提交时候不用验证，data-valid属性设置为true
	obj.REQUIRE ? data_valid = "false" : data_valid = "true";
	template += '<h1>' + obj.INDEX + '.' + obj.TITLE + "（矩阵单选）";
	if (obj.REQUIRE) {
		template += '<span style="color:#f7554a">*</span>';
		p = '<p class="form_valid"></p>';
	}
	template += '</h1>';

	var i, len_main = obj.OPTIONS[0].OPTIONS.length,
		len_sub = obj.OPTIONS[1].OPTIONS.length;
	var mainoption = '<div class="questions_item matrix';
	var suboption = '<div class="questions_item matrix';
	if (obj.REQUIRE) {
		mainoption += " require";
		suboption += " require";
	}
	mainoption += ' mainoption" data-itemid="' + obj.OPTIONS[0].ITEMID + '"' + 'data-valid="' + data_valid + '"><h2>' + obj.OPTIONS[0].TITLE + '</h2><div class="question_options">';
	suboption += ' suboption" data-itemid="' + obj.OPTIONS[1].ITEMID + '"' + 'data-valid="' + data_valid + '"><h2>' + obj.OPTIONS[1].TITLE + '</h2><div class="question_options">';
	var temp = "";
	var icon = "";
	for (i = 0; i < len_main; i++) {
		obj.OPTIONS[0].OPTIONS[i].CHECKED ? ischecked = "checked" : ischecked = "";
		obj.OPTIONS[0].OPTIONS[i].CHECKED ? icon = "&#xe679;" : icon = "&#xe677;";
		temp += '<div class="options_item ' + ischecked + '" data-subid="' + obj.OPTIONS[0].OPTIONS[i].SUBID + '" onclick="select_option(this)"><i class="icon iconfont">' + icon + '</i>' +
			'<div class="option_text">' +
			'<p>' + obj.OPTIONS[0].OPTIONS[i].OPTION + '</p>' +
			'<p class="vote_result"><span></span></p>' +
			'</div>' +
			'</div>' +
			'<div class="detail_result"></div>';
	}
	temp = temp + '</div>' + p;
	mainoption = mainoption + temp + '</div>';
	temp = "";
	for (i = 0; i < len_sub; i++) {
		obj.OPTIONS[1].OPTIONS[i].CHECKED ? ischecked = "checked" : ischecked = "";
		obj.OPTIONS[1].OPTIONS[i].CHECKED ? icon = "&#xe679;" : icon = "&#xe677;";
		temp += '<div class="options_item ' + ischecked + '" data-subid="' + obj.OPTIONS[1].OPTIONS[i].SUBID + '" onclick="select_option(this)"><i class="icon iconfont">' + icon + '</i>' +
			'<div class="option_text">' +
			'<p>' + obj.OPTIONS[1].OPTIONS[i].OPTION + '</p>' +
			'<p class="vote_result"><span></span></p>' +
			'</div>' +
			'</div>' +
			'<div class="detail_result"></div>';
	}
	temp = temp + '</div>' + p;
	suboption = suboption + temp + '</div>';
	template = template + mainoption + suboption + '</div>';
	return template;
}

//创建问答、填空
function createText(obj) {
	var template = '<div class="questions_item ' + obj.TYPE;
	var data_valid;
	//非必填则提交时候不用验证，data-valid属性设置为true
	var p = '';
	var val = obj.ANSWERTEXT || "";
	var dataVilidFlg = false;
	if (obj.REQUIRE) {
		if (obj.ANSWERTEXT != "") {
			dataVilidFlg = true;
		} else {
			if (obj.INDEX == "Q3" && sessionStorage.getItem('mapResult')) {
				dataVilidFlg = true;
			} else {
				dataVilidFlg = false;
			}
		}
		template += ' require" data-itemid="' + obj.ITEMID + '" data-valid="' + dataVilidFlg + '">';
		p = '<p class="form_valid"></p>';
	} else {
		template += '" data-itemid="' + obj.ITEMID + '" data-valid="true">';
	}
	template += '<h1>' + obj.INDEX + '.' + obj.TITLE;
	if (obj.REQUIRE) {
		template += '<span>*</span>';
	}
	if (obj.TYPE === "textFill") {
		template += '</h1><input value="' + val + '" onchange="check_input(this)" placeholder="请填写答案" type="text" maxlength="100">' + p + '</div>';
	} else {
		if (obj.INDEX == "Q2") {
			var val = "";
			if (obj.ANSWERTEXT.split(',')[3]) {
				val = obj.ANSWERTEXT.split(',')[3];
			} else {
				val = "";
			}
			template += '</h1><form class="form-inline">' + '<div id="distpicker">' + '<div class="form-group">' + '<label class="sr-only" for="province10"></label>' + '<select class="form-control" id="province10"></select>' + '</div>' + '<div class="form-group">' + '<label class="sr-only" for="city10"></label>' + '<select class="form-control" id="city10"></select>' + '</div>' + '<div class="form-group">' + '<label class="sr-only" for="district10"></label>' + '<select class="form-control" id="district10"></select>' + '</div>' + '</div>' + '</form>' + '<div style="margin-top: 10px"><input id="detailaddress" value="' + val + '" onchange="check_input(this)" placeholder="请填写详细地址" type="text" maxlength="100"></div>' + '</div>';
		} else {
			if (obj.INDEX == "Q3" && sessionStorage.getItem('mapResult')) {
				template += '</h1><textarea rows="4" disabled onchange="check_input(this)" placeholder="请填写答案" maxlength="200">' + sessionStorage.getItem('mapResult') + '</textarea>' + p + '</div>';
			} else {
				template += '</h1><textarea rows="4" onchange="check_input(this)" placeholder="请填写答案" maxlength="200">' + val + '</textarea>' + p + '</div>';
			}
		}

	}
	return template;
}

//创建评分
function createRankInput(obj) {
	var template = '<div class="questions_item ' + obj.TYPE;
	var p = '<p class="form_valid"></p>';
	var val = obj.ANSWERTEXT || "";
	if (obj.REQUIRE) {
		template += ' require" data-itemid="' + obj.ITEMID + '" data-valid="false">';
	} else {
		template += '" data-itemid="' + obj.ITEMID + '" data-valid="true">';
	}
	template += '<h1>' + obj.INDEX + '.' + obj.TITLE;
	if (obj.REQUIRE) {
		template += '<span>*</span>';
	}
	template += '</h1><input value="' + val + '" onchange="check_input(this)" placeholder="0-100" class="rank_input" type="tel"><em>分</em>' + p + '</div>';
	return template;
}

//表单验证
function validForm() {
	$$(".require").each(function() {
		var pass = $$(this).attr("data-valid");
		var p = $$(this).find(".form_valid");
		if (pass === "false") {
			if ($$(this).hasClass("score")) {
				if (p.text().length === 0) {
					p.text("该项为必填项");
				}
			} else {
				p.text("该项为必填项");
			}
		} else {
			p.text("");
		}
	});
	if ($$("[data-valid='false']").length !== 0 || ($$('#province10').val() == "" || $$('#city10').val() == "" || $$('#detailaddress').val() == "")) {
		return false;
	}
	return true;
}

//模拟单选多选同时并作校验标记
function select_option(obj) {
	if ($$(".questionsFooter a").text() == "我要修改") {
		return false;
	}
	var this_ = $$(obj);
	var this_parent = this_.closest(".questions_item");
	var siblings = this_.siblings();
	//单选
	if (this_parent.hasClass("radio") || this_parent.hasClass("imgRadio") || this_parent.hasClass("matrix")) {
		this_.find("i").remove();
		this_.prepend('<i class="icon iconfont">&#xe679;</i>');
		this_.addClass("checked");
		siblings.each(function() {
			if ($$(this).hasClass("options_item")) {
				$$(this).find("i").remove();
				$$(this).removeClass("checked");
				$$(this).prepend('<i class="icon iconfont">&#xe677;</i>');
			}
		});
	} else {
		if (this_.hasClass("checked")) {
			this_.removeClass("checked");
			this_.find("i").remove();
			this_.prepend('<i class="icon iconfont">&#xe67a;</i>');
		} else {
			this_.addClass("checked");
			this_.find("i").remove();
			this_.prepend('<i class="icon iconfont">&#xe678;</i>');
		}
	}
	if (this_.hasClass("checked")) {
		this_parent.attr("data-valid", true);
	} else {
		var flag = false;
		$$.each(siblings, function(index, item) {
			if ($$(item).hasClass('checked')) {
				flag = true;
				return false;
			}
		})
		if (flag) {
			this_parent.attr("data-valid", true);
		} else {
			this_parent.attr("data-valid", false);
		}

	}
	seticon();
}

//input框输入绑定同时并作校验标记
function check_input(obj) {
	if ($$(".questionsFooter a").hasClass("disabled")) {
		return false;
	}
	var this_ = $$(obj);
	var this_parent = this_.parents(".questions_item");
	var p = this_parent.find(".form_valid");
	var thisval = this_.val().trim();
	if (thisval.length !== 0) {
		//评分题还要验证输入是否为1到100整数
		if (this_parent.hasClass("score")) {
			if (Number(thisval) >= 0 && Number(thisval) <= 100) {
				$$(this_).val(parseInt(thisval));
				p.text("");
				this_parent.attr("data-valid", true);
			} else {
				this_parent.attr("data-valid", false);
				p.text("请输入0到100的正整数")
			}
		} else {
			this_parent.attr("data-valid", true);
		}
	} else {
		if (this_parent.hasClass("require")) {
			p.text("该项不能为空");
			this_parent.attr("data-valid", false);
		} else {
			p.text("");
			this_parent.attr("data-valid", true);
		}
	}
}

//设置问卷结果展示的样式
function setResultCSS() {
	$$(".questions_item").addClass("show_result");
	$$("#questionnaireDetail .questionscontainer").css({
		"background": "#f5f5f8",
	});
	$$(".questionsHeader").css({
		"background": "#fff",
	});
	$$("#expired").css({
		"color": "#777",
	});
	$$(".vote_result").show();
	$$(".options_item i, .form_valid, .questions_item input, .questions_item em, .questions_item textarea").hide();
}

function getAnswer() {
	var answer = {
		"answerData": []
	};

	$$(".radio, .checkbox,.imgRadio, .imgCheckbox, .matrix ").each(function() {
		var temp = {
			"itemId": $$(this).data("itemid"),
			"itemType": $$(this).attr("class").split(" ")[1],
			"answerArr": []
		};
		var checked = $$(this).find(".checked");
		checked.each(function() {
			temp.answerArr.push($$(this).data("subid"));
		});
		answer.answerData.push(temp);
	});

	//单行填空和评分题目
	$$(".textFill, .score").each(function(index, item) {
		var temp = {
			"itemId": $$(this).data("itemid"),
			"itemType": $$(this).attr("class").split(" ")[1],
			"answerArr": [$$(this).find("input").val()]
		};
		answer.answerData.push(temp);
	});
	//多行填空
	$$(".areaFill").each(function(index, item) {
		if (index === 0) {
			var dataArray = [];
			$$(this).find("select").each(function(index, item1) {
				dataArray.push($$(item1).val())
			})
			dataArray.push($$(item).find('input').val());
			var temp = {
				"itemId": $$(this).data("itemid"),
				"itemType": $$(this).attr("class").split(" ")[1],
				"answerArr": [dataArray.join(',')]
			};
			answer.answerData.push(temp);
		} else {
			var temp = {
				"itemId": $$(this).data("itemid"),
				"itemType": $$(this).attr("class").split(" ")[1],
				"answerArr": [$$(this).find("textarea").val()]
			};
			answer.answerData.push(temp);
		}


	});
	console.log(answer);
	return answer;
}

function setWidth() {
	if (myApp.device.ios) {
		if (window.innerWidth === 320) {
			var parentel = $$(".questions_item").eq(0);
			var img_width = 60;
			var icon_width = 22;
			var total_width = parentel.width();

			//使单选复选文字分配剩余内容
			$$(".radio .option_text p, .checkbox .option_text p").each(function() {
				$$(this).css({
					"width": (total_width - icon_width) + "px",
				});
			});
			//使图片单选复选文字分配剩余内容
			$$(".imgRadio .option_text p, .imgCheckbox  .option_text p").each(function() {
				$$(this).css({
					"width": (total_width - img_width - icon_width - 17) + "px",
				});
			});

			//使单选复选icon居中
			$$(".radio .options_item i, .checkbox .options_item i").each(function() {
				$$(this).css({
					"position": "reletive",
					"bottom": "2px",
				});
			});

			//使图片单选复选icon居中
			$$(".imgRadio .options_item i, .imgCheckbox .options_item i").each(function() {
				$$(this).css({
					"position": "reletive",
					"bottom": "25px",
				});
			});
		}
	}
}

function seticon() {
	if (myApp.device.ios) {
		if (window.innerWidth === 320) {
			$$(".radio .options_item i, .checkbox .options_item i, .imgRadio .options_item i, .imgCheckbox  .options_item i").each(function() {
				var parenth = $$(this).closest(".options_item").height();
				$$(this).css({
					"position": "relative",
					"bottom": parenth / 2 - 9 + "px",
				});
			});
		}
	}
}
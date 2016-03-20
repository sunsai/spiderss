var curIndex=0;
 var timeInterval=5000;
 var arr=new Array();
 //arr[0] = "/Content/images/dashengguilai.png";
 //arr[1] = "/Content/images/yangguifei.jpg";
 //arr[2] = "/Content/images/zhuoyaoji.jpg";
setInterval(changeImg,timeInterval);
function changeImg()
{
   var obj=$("#changeImg");
   if (curIndex==arr.length-1) 
   {
       curIndex=0;
    }
   else
    {
        curIndex+=1;
    }
    obj.src=arr[curIndex];
    obj.css('background-image','url('+arr[curIndex]+')');
}



$(".mian_center table tr").each(function(){
	$(this).hover(function(){
		$(this).css('color','#30bdf8');
	},
	function(){
		if($(this).hasClass('active')){
			$(this).css('color','#1881bf');
		}else{
			$(this).css('color','#333');
		}
	});
	
	$(this).click(function(){
		$(this).parent().find('tr').css('color','#333');
		$(this).css('color','#1881bf');
		$(this).parent().find('tr').removeClass('active');
		$(this).addClass('active');
	});
});

$("#titleH2").hover(
	function(){
	$(this).css('color','#30bdf8');
},
	function(){
		if($(this).hasClass('active')){
			$(this).css('color','#1881bf');
		}else{
			$(this).css('color','#333');
		}
});

$("#titleH2").click(function(){
	$(this).css('color','#1881bf');
	$(this).addClass('active');
});

$(".mian_right_dl_yi").hover(
	function(){
		$(this).css('color','#30bdf8');
	},
	function(){
		if($(this).hasClass('active')){
			$(this).css('color','#1881bf');
		}else{
			$(this).css('color','#333');
		}
	}
);

$(".mian_right_dl_yi").click(function(){
	$(this).css('color','#1881bf');
	$(this).addClass('active');
});

$("h1").hover(
		function(){
			$(this).css('color','#30bdf8');
		},
		function(){
			if($(this).hasClass('active')){
				$(this).css('color','#1881bf');
			}else{
				$(this).css('color','#00a0e9');
			}
		}
	);

	$("h1").click(function(){
		$(this).css('color','#1881bf');
		$(this).addClass('active');
});

$(".banner_table tbody tr").each(function(){
	$(this).hover(function(){
		$(this).css('color','#30bdf8');
		var td1 = $(this).children('td:eq(0)').text();
		var td2 = $(this).children('td:eq(1)').text();
		$('.banner_right').html('<dl>'+
                '<dt>'+
                '<img src="images/banner_dt.png" alt=""/>'+
                '<span class="triangle-topleft">'+
                '<a style="color:white;font-weight:bold;font-size:24px; top:-80px;display: inline-block;left:20px; position: absolute; ">'+td1+'</a>'+
                '</span>'+
            '</dt>'+
            '<dd>'+
                '<h2>'+td2+'</h2>'+
                '<p>制片国家/地区: 中国大陆 </p>'+
                '<p>片长: 89分钟</p>'+
                '<p>导演: 田晓鹏</p>'+
                '<p>编剧: 刘虎 / 米粒 / 金冉 / 金成...</p>'+
                '<p> 主演: 张磊 </p>'+
            '</dd>'+
        '</dl>');
	},
	function(){
		if($(this).hasClass('active')){
			$(this).css('color','#1881bf');
		}else{
			$(this).css('color','#333');
		}
	});
	
	$(this).click(function(){
		$(this).parent().find('tr').css('color','#333');
		$(this).css('color','#1881bf');
		$(this).parent().find('tr').removeClass('active');
		$(this).addClass('active');
	});

    $(".code-box").hover(function(){
             $(this).find('.code-warp').css("display","block")
       },
         function(){
              $(this).find(".code-warp").css("display","none")
         })
});

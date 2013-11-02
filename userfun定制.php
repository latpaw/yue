<?php
//---------------------------用户自定义标签函数文件
//smart_show,动态显示字段.
//在小语种中,设置co_id字段,为英文相同文章的id,当本篇文章调用时,如果某字段为'en',则自动显示英文的内容.
//调用方法,内容页中 <?php echo smart_show('titlepic');
//列表页中或者循环中,list.var中, $listtemp= smart_show('titlepic',$r[id],$r[classid]);
function smart_show($field,$id=0,$classid=0){
	global $class_r,$empire;
	//return $GLOBALS[navinfor];
	if($classid){
		$tbname = $class_r[$classid]['tbname'];
	}else{
		$classid=$GLOBALS[navinfor][classid];
		$tbname = $class_r[$classid]['tbname'];
	}
	if(!$id){
		$content = $GLOBALS[navinfor][$field];
		$co_id = $GLOBALS[navinfor]["co_id"];}
	else{
		$old = $empire->fetch1("select * from sbm_ecms_{$tbname} where id={$id}");
		$content=$old[$field];
		$co_id = $old['co_id'];
	}

	$is_en = $content == 'en' ? true : false;

	if(!$is_en){
		return $content;
	}else{
		if($co_id){
			$re = $empire->fetch1("select * from sbm_ecms_{$tbname} where id={$co_id}");
			return $re[$field];
		}else{
			return "empty co_id!";
		}
	}
}

?>

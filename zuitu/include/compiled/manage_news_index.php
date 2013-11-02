<?php include template("manage_header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="coupons">
	<div class="dashboard" id="dashboard">
		<ul><?php echo mcurrent_news($selector); ?></ul>
	</div>
    <div id="content" class="coupons-box clear mainwide">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
                    <h2>全部新闻</h2>
				</div>
                <div class="sect">
					<table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
					<tr><th width="40">ID</th><th width="500">新闻标题</th><th width="100">日期</th><th width="140">操作</th></tr>
					<?php if(is_array($news)){foreach($news AS $index=>$one) { ?>
					<tr <?php echo $index%2?'':'class="alt"'; ?> id="team-list-id-<?php echo $one['id']; ?>">
						<td><?php echo $one['id']; ?></a></td>
						<td>
							<a class="deal-title" href="/news.php?id=<?php echo $one['id']; ?>" target="_blank"><?php echo $one['title']; ?></a>
						</td>
						<td nowrap><?php echo date('Y-m-d',$one['begin_time']); ?></td>
						<td class="op" nowrap><a href="/manage/news/edit.php?id=<?php echo $one['id']; ?>">编辑</a>｜<a href="/ajax/manage.php?action=newsremove&id=<?php echo $one['id']; ?>" class="ajaxlink" ask="确定删除本条新闻吗？" >删除</a></td>
					</tr>
					<?php }}?>
					<tr><td colspan="7"><?php echo $pagestring; ?></tr>
                    </table>
				</div>
            </div>
            <div class="box-bottom"></div>
        </div>
    </div>
</div>
</div> <!-- bd end -->
</div> <!-- bdw end -->

<?php include template("manage_footer");?>

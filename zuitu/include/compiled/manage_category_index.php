<?php include template("manage_header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="coupons">
	<div class="dashboard" id="dashboard">
		<ul><?php echo mcurrent_category($zone); ?></ul>
	</div>
    <div id="content" class="coupons-box clear mainwide">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
                    <h2><?php echo $cates[$zone]; ?></h2>
					<ul class="filter">
						<li><a href="/ajax/manage.php?action=categoryedit&zone=<?php echo $zone; ?>" class="ajaxlink">新建<?php echo $cates[$zone]; ?></a></li>
					</ul>
				</div>
                <div class="sect">
					<table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
					<tr><th width="50">ID</th><th width="250">中文名称</th><th width="250">英文名称</th><th width="60">首字母</th><th width="150"><?php if($zone=='group'){?>所属分类<?php } else { ?>自定义分组<?php }?></th><th width="40" nowrap>导航</th><th width="40" nowrap>排序</th><th width="100">操作</th></tr>
					<?php if(is_array($categories)){foreach($categories AS $index=>$one) { ?>
					<tr <?php echo $index%2?'':'class="alt"'; ?>>
						<td><?php echo $one['id']; ?></td>
						<td><?php echo $one['name']; ?></td>
						<td><?php echo $one['ename']; ?></td>
						<td><?php echo strtoupper($one['letter']); ?></td>
						<td><?php if($zone=='group'){?>
						 <?php if($one['fid'] ){?><?php echo $groups[$one['fid']]['name']; ?><?php } else { ?>一级大类<?php }?>
						<?php } else { ?><?php echo $one['czone']; ?><?php }?></td>
						<td><?php echo $one['display']; ?></td>
						<td><?php echo intval($one['sort_order']); ?></td>
						<td class="op"><a href="/ajax/manage.php?action=categoryedit&id=<?php echo $one['id']; ?>" class="ajaxlink">编辑</a>｜<a href="/ajax/manage.php?action=categoryremove&id=<?php echo $one['id']; ?>" class="ajaxlink" ask="确定删除本类别？">删除</a></td>
					</tr>
					<?php }}?>
					<tr><td colspan="8"><?php echo $pagestring; ?></td></tr>
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

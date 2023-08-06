// 站点信息
export const basic = {
	add: 'b:basic:add',
	del: 'b:basic:delete',
	edit: 'b:basic:edit'
}

// 静态
export const statics = {
	server: 'b:static:server'
}

// 导航单页
export const navigation = {
	main: {
		add: 'b:navigation:main:add',
		del: 'b:navigation:main:delete',
		edit: 'b:navigation:main:add',
		child: 'b:navigation:main:child',
		status: 'b:navigation:main:status'
	},
	single: {
		add: 'b:navigation:single:add',
		del: 'b:navigation:single:delete',
		edit: 'b:navigation:single:edit',
		child: 'b:navigation:single:status'
	}
} 

// 友情链接
export const link = {
	add: 'b:manage:link:add',
	del: 'b:manage:link:delete',
	edit: 'b:manage:link:edit',
	audit: 'b:manage:link:audit'
}

// 合作伙伴
export const partner = {
	add: 'b:manage:partner:add',
	del: 'b:manage:partner:delete',
	edit: 'b:manage:partner:edit'
}

// 公告
export const announcement = {
	add: 'b:manage:announcement:add',
	del: 'b:manage:announcement:delete',
	edit: 'b:manage:announcement:edit'
}  

// 幻灯片
export const slideshow = {
	cate: {
		add: 'b:slideshow:add',
		del: 'b:slideshow:delete',
		edit: 'b:slideshow:edit'
	},
	art: {
		add: 'b:slideshow:add',
		del: 'b:slideshow:delete',
		edit: 'b:slideshow:edit'
	}

}  

// 在线留言
export const messageBoard = {
	reply: 'b:messageBoard:reply',
	del: 'b:messageBoard:delete',
	status: 'b:messageBoard:status'
}  

// 意见反馈
export const feedback = {
	del: 'b:feedback:delete',
	edit: 'b:feedback:status'
}   

// 应用商城
export const appstore = {
	add: 'b:appstore:add',
	del: 'b:appstore:delete',
	edit: 'b:appstore:edit',
	grade: 'b:appstore:grade'
}  

// 采集管理
export const collection = {
	cate: {
		add: 'b:collection:node:add',
		start: 'b:collection:node:start',
		del: 'b:collection:node:delete',
		list: 'm:collection:article',
		tem: 'm:collection:temlist'
	},
	art: {
		del: 'b:collection:article:delete',
		edit: 'b:collection:article:edit',
		reduction: 'b:collection:recycle:reduction'
	},
	tem: {
		join: 'b:collection:tem:join',
		del: 'b:collection:tem:delete'
	}	
}  

// 模型管理
export const customize = {
		add: 'b:customize:field:add',
		del: 'b:customize:field:delete',
		edit: 'b:customize:field:edit'
} 

// 用户管理
export const user = {
	list: {
		recommend: 'b:user:type:list:recommend',
		setting: 'b:user:type:list:setting',
		banuser: 'b:user:type:list:banuser',
		email: 'b:user:type:list:email',
	},
	grade: {
		add: 'b:user:sign:add',
		del: 'b:user:sign:delete',
		edit: 'b:user:sign:edit'
	},
	recommend: {
		cancel: 'b:user:recommend:cancel'
	},
	role: {
		add: 'b:user:role:add',
		del: 'b:user:role:delete',
		edit: 'b:user:role:edit',
		view: 'b:user:role:view',
	},	
	roleGrade:{
		edit: 'b:user:role:grade:edit'
	},
	group: {
		add: 'b:user:group:add',
		edit: 'b:user:group:edit'
	},
	sign: {
		add: 'b:user:sign:add',
		del: 'b:user:sign:delete',
		edit: 'b:user:sign:edit'
	},
	banuser: {
		remove: 'b:user:sign:add'
	},
	security: {
		add: 'b:user:security:add',
		del: 'b:user:security:delete',
		edit: 'b:user:security:edit'
	},
	theme: {
		add: 'b:user:theme:add',
		del: 'b:user:theme:delete',
		edit: 'b:user:theme:edit'		
	}
} 


// 服务
export const service = {
	job: {
		add: 'b:service:job:position:add',
		del: 'b:service:job:position:delete',
		edit: 'b:service:job:position:edit'
	},
	resume: {
		del: 'b:service:job:resume:delete'
	}
} 

// 推广
export const spread = {
	add: 'b:business:spread:add',
	del: 'b:business:spread:delete',
	edit: 'b:business:spread:edit'
}  

// 广告
export const advertisement = {
	add: 'b:business:advertisement:add',
	del: 'b:business:advertisement:delete',
	edit: 'b:business:advertisement:edit'
}  


export const channel = {
	// 素材
	source: {
		status: 'b:source:status',
		display: 'b:source:display',
		info: 'b:source:info',
		tag: 'b:source:tag',
		cate: {
			add: 'b:source:cate:add',
			del: 'b:source:cate:edit',
			edit: 'b:source:cate:delete'
		},
		art: {
			add: 'm:source:list:add',
			del: 'b:source:list:delete',
			edit: 'm:source:list:edit',
			top: 'b:source:list:top'

		},
		comment: {
			show: 'b:source:comment:show',
			del: 'b:source:comment:delete'
		},
		recycle: {
			reduction: 'b:source:recycle:reduction',
			del: 'b:source:recycle:delete'
		}
	},
	// 资讯
	article: {
		status: 'b:article:status',
		display: 'b:article:display',
		info: 'b:article:info',
		tag: 'b:article:tag',
		cate: {
			add: 'b:article:cate:add',
			del: 'b:article:cate:edit',
			edit: 'b:article:cate:delete'
		},
		art: {
			add: 'b:article:list:add',
			del: 'b:article:list:delete',
			edit: 'b:article:list:edit',
			top: 'b:article:list:top',
			return: 'b:article:list:return',
			audit: 'b:article:list:audit',			
		},
		comment: {
			show: 'b:article:comment:show',
			del: 'b:article:comment:delete'
		},
		recycle: {
			reduction: 'b:article:recycle:reduction',
			del: 'b:article:recycle:delete'
		}
	},
	// 科技
	tech: {
		status: 'b:tech:status',
		display: 'b:tech:display',
		info: 'b:tech:info',
		tag: 'b:tech:tag',
		cate: {
			add: 'b:tech:cate:add',
			del: 'b:tech:cate:edit',
			edit: 'b:tech:cate:delete'
		},
		art: {
			add: 'b:tech:list:add',
			del: 'b:tech:list:delete',
			edit: 'b:tech:list:edit',
			top: 'b:tech:list:top'
		},
		comment: {
			show: 'b:tech:comment:show',
			del: 'b:tech:comment:delete'
		},
		recycle: {
			reduction: 'b:tech:recycle:reduction',
			del: 'b:tech:recycle:delete'
		}
	},
	// 图集
	picture: {
		status: 'b:picture:status',
		display: 'b:picture:display',
		info: 'b:picture:info',
		tag: 'b:picture:tag',
		cate: {
			add: 'b:picture:cate:add',
			del: 'b:picture:cate:edit',
			edit: 'b:picture:cate:delete'
		},
		art: {
			add: 'b:picture:list:add',
			del: 'b:picture:list:delete',
			edit: 'b:picture:list:edit',
			top: 'b:picture:list:top'
		},
		comment: {
			show: 'b:picture:comment:show',
			del: 'b:picture:comment:delete'
		},
		recycle: {
			reduction: 'b:picture:recycle:reduction',
			del: 'b:picture:recycle:delete'
		}
	},
	// 好站
	website: {
		status: 'b:website:status',
		display: 'b:website:display',
		info: 'b:website:info',
		tag: 'b:website:tag',
		cate: {
			add: 'b:website:cate:add',
			del: 'b:website:cate:edit',
			edit: 'b:website:cate:delete'
		},
		art: {
			add: 'b:website:list:add',
			del: 'b:website:list:delete',
			edit: 'b:website:list:edit',
			top: 'b:website:list:top'
		},
		comment: {
			show: 'b:website:comment:show',
			del: 'b:website:comment:delete'
		},
		recycle: {
			reduction: 'b:website:recycle:reduction',
			del: 'b:website:recycle:delete'
		}
	},
	// 搞笑
	funny: {
		status: 'b:funny:status',
		display: 'b:funny:display',
		info: 'b:funny:info',
		tag: 'b:funny:tag',
		cate: {
			add: 'b:funny:cate:add',
			del: 'b:funny:cate:edit',
			edit: 'b:funny:cate:delete'
		},
		art: {
			add: 'b:funny:list:add',
			del: 'b:funny:list:delete',
			edit: 'b:funny:list:edit',
			top: 'b:funny:list:top'
		},
		comment: {
			show: 'b:funny:comment:show',
			del: 'b:funny:comment:delete'
		},
		recycle: {
			reduction: 'b:funny:recycle:reduction',
			del: 'b:funny:recycle:delete'
		}
	},
		// 搞笑
		music: {
			status: 'b:funny:status',
			display: 'b:funny:display',
			info: 'b:funny:info',
			tag: 'b:funny:tag',
			cate: {
				add: 'b:funny:cate:add',
				del: 'b:funny:cate:edit',
				edit: 'b:funny:cate:delete'
			},
			art: {
				add: 'b:funny:list:add',
				del: 'b:funny:list:delete',
				edit: 'b:funny:list:edit',
				top: 'b:funny:list:top'
			},
			comment: {
				show: 'b:funny:comment:show',
				del: 'b:funny:comment:delete'
			},
			recycle: {
				reduction: 'b:funny:recycle:reduction',
				del: 'b:funny:recycle:delete'
			}
		},
			// 搞笑
			video: {
		status: 'b:funny:status',
		display: 'b:funny:display',
		info: 'b:funny:info',
		tag: 'b:funny:tag',
		cate: {
			add: 'b:funny:cate:add',
			del: 'b:funny:cate:edit',
			edit: 'b:funny:cate:delete'
		},
		art: {
			add: 'b:funny:list:add',
			del: 'b:funny:list:delete',
			edit: 'b:funny:list:edit',
			top: 'b:funny:list:top'
		},
		effect: {
			add: 'b:funny:list:add',
			del: 'b:funny:list:delete',
			edit: 'b:funny:list:edit',
			top: 'b:funny:list:top'
		},
		comment: {
			show: 'b:funny:comment:show',
			del: 'b:funny:comment:delete'
		},
		recycle: {
			reduction: 'b:funny:recycle:reduction',
			del: 'b:funny:recycle:delete'
		}
	},
	// 笔记
	notes: {
		status: 'b:notes:status',
		display: 'b:notes:display',
		info: 'b:notes:info',
		tag: 'b:notes:tag',
		cate: {
			add: 'b:notes:cate:add',
			del: 'b:notes:cate:edit',
			edit: 'b:notes:cate:delete'
		},
		art: {
			add: 'b:notes:list:add',
			del: 'b:notes:list:delete',
			edit: 'b:notes:list:edit',
			top: 'b:notes:list:top'
		},
		comment: {
			show: 'b:notes:comment:show',
			del: 'b:notes:comment:delete'
		},
		recycle: {
			reduction: 'b:notes:recycle:reduction',
			del: 'b:notes:recycle:delete'
		}
	},

	// 教程
	learn: {
		status: 'b:learn:status',
		display: 'b:learn:display',
		info: 'b:learn:info',
		tag: 'b:learn:tag',
		cate: {
			add: 'b:learn:cate:add',
			del: 'b:learn:cate:edit',
			edit: 'b:learn:cate:delete'
		},
		art: {
			add: 'b:learn:list:add',
			del: 'b:learn:list:delete',
			edit: 'b:learn:list:edit',
			top: 'b:learn:list:top'
		},
		comment: {
			show: 'b:learn:comment:show',
			del: 'b:learn:comment:delete'
		},
		recycle: {
			reduction: 'b:learn:recycle:reduction',
			del: 'b:learn:recycle:delete'
		}
	},		

	// 课程
	course: {
		status: 'b:course:status',
		display: 'b:course:display',
		info: 'b:course:info',
		tag: 'b:course:tag',
		cate: {
			add: 'b:course:cate:add',
			del: 'b:course:cate:edit',
			edit: 'b:course:cate:delete'
		},
		art: {
			add: 'b:course:list:add',
			del: 'b:course:list:delete',
			edit: 'b:course:list:edit',
			top: 'b:course:list:top'
		},
		comment: {
			show: 'b:course:comment:show',
			del: 'b:course:comment:delete'
		},
		recycle: {
			reduction: 'b:course:recycle:reduction',
			del: 'b:course:recycle:delete'
		}
	},	

	// 问答
	questions: {
		status: 'b:questions:status',
		display: 'b:questions:display',
		info: 'b:questions:info',
		tag: 'b:questions:tag',
		cate: {
			add: 'b:questions:cate:add',
			del: 'b:questions:cate:edit',
			edit: 'b:questions:cate:delete'
		},
		art: {
			add: 'b:questions:list:add',
			del: 'b:questions:list:delete',
			edit: 'b:questions:list:edit',
			top: 'b:questions:list:top'
		},
		comment: {
			show: 'b:questions:comment:show',
			del: 'b:questions:comment:delete'
		},
		recycle: {
			reduction: 'b:questions:recycle:reduction',
			del: 'b:questions:recycle:delete'
		}
	},

	// 导航
	haosite: {
		status: 'b:haosite:status',
		display: 'b:haosite:display',
		info: 'b:haosite:info',
		tag: 'b:haosite:tag',
		cate: {
			add: 'b:haosite:cate:add',
			del: 'b:haosite:cate:edit',
			edit: 'b:haosite:cate:delete'
		},
		art: {
			add: 'b:haosite:list:add',
			del: 'b:haosite:list:delete',
			edit: 'b:haosite:list:edit',
			top: 'b:haosite:list:top'
		},
		recycle: {
			reduction: 'b:haosite:recycle:reduction',
			del: 'b:haosite:recycle:delete'
		}
	},	

	// 博客
	blog: {
		status: 'b:blog:status',
		display: 'b:blog:display',
		info: 'b:blog:info',
		tag: 'b:blog:tag',
		cate: {
			add: 'b:blog:cate:add',
			del: 'b:blog:cate:edit',
			edit: 'b:blog:cate:delete'
		},
		art: {
			add: 'b:blog:list:add',
			del: 'b:blog:list:delete',
			edit: 'b:blog:list:edit',
			top: 'b:blog:list:top'
		},
		comment: {
			show: 'b:blog:comment:show',
			del: 'b:blog:comment:delete'
		},
		recycle: {
			reduction: 'b:blog:recycle:reduction',
			del: 'b:blog:recycle:delete'
		}
	},
	// 数字藏品
	digital: {
		status: 'b:digital:status',
		display: 'b:digital:display',
		info: 'b:digital:info',
		tag: 'b:digital:tag',
		cate: {
			add: 'b:digital:cate:add',
			del: 'b:digital:cate:edit',
			edit: 'b:digital:cate:delete'
		},
		art: {
			add: 'b:digital:list:add',
			del: 'b:digital:list:delete',
			edit: 'b:digital:list:edit',
			top: 'b:digital:list:top'
		},
		comment: {
			show: 'b:digital:comment:show',
			del: 'b:digital:comment:delete'
		},
		recycle: {
			reduction: 'b:digital:recycle:reduction',
			del: 'b:digital:recycle:delete'
		}
	},
	// 设计
	design: {
		status: 'b:design:status',
		display: 'b:design:display',
		info: 'b:design:info',
		tag: 'b:design:tag',
		cate: {
			add: 'b:design:cate:add',
			del: 'b:design:cate:edit',
			edit: 'b:design:cate:delete'
		},
		art: {
			add: 'b:design:list:add',
			del: 'b:design:list:delete',
			edit: 'b:design:list:edit',
			top: 'b:design:list:top'
		},
		comment: {
			show: 'b:design:comment:show',
			del: 'b:design:comment:delete'
		},
		recycle: {
			reduction: 'b:design:recycle:reduction',
			del: 'b:design:recycle:delete'
		}
	},
	// 办公
	office: {
		status: 'b:office:status',
		display: 'b:office:display',
		info: 'b:office:info',
		tag: 'b:office:tag',
		cate: {
			add: 'b:office:cate:add',
			del: 'b:office:cate:edit',
			edit: 'b:office:cate:delete'
		},
		art: {
			add: 'b:office:list:add',
			del: 'b:office:list:delete',
			edit: 'b:office:list:edit',
			top: 'b:office:list:top'
		},
		comment: {
			show: 'b:office:comment:show',
			del: 'b:office:comment:delete'
		},
		recycle: {
			reduction: 'b:office:recycle:reduction',
			del: 'b:office:recycle:delete'
		}
	},	
	// 词语
	words: {
		status: 'b:words:status',
		display: 'b:words:display',
		info: 'b:words:info',
		tag: 'b:words:tag',
		cate: {
			add: 'b:words:cate:add',
			del: 'b:words:cate:edit',
			edit: 'b:words:cate:delete'
		},
		art: {
			add: 'b:words:list:add',
			del: 'b:words:list:delete',
			edit: 'b:words:list:edit',
			top: 'b:words:list:top'
		},
		comment: {
			show: 'b:words:comment:show',
			del: 'b:words:comment:delete'
		},
		recycle: {
			reduction: 'b:words:recycle:reduction',
			del: 'b:words:recycle:delete'
		}
	},		
}


const authorized: any = {
	basic,
	statics,
	link,
	partner,
	announcement,
	slideshow,
	messageBoard,
	feedback,
	navigation,
	appstore,
	collection,
	customize,
	user,
	service,
	spread,
	advertisement,
	channel
}

export default authorized
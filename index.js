function catcher(...args) {
	
	if (args.length>1) {
		return args.map(mw=>catcher(mw))
	}
	let mw = args[0]
	if (mw.length>3) {

		throw new Error('cannot catch middleware without length <=3',mw)
	}
	return (req,res,next)=>{
		try {
			let p =  mw(req,res,next)
			if (p && p.catch) 
				p.catch(err=> {
					next(err)
				})
		} catch (err) {
			console.error('catcher caught an immediate error',err)
			next(err)
		}
	}
}

module.exports = catcher
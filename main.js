let tool = {
	//10转2进制
	toBinary(n){
		return (+n).toString(2);
	},
	//2转10进制
	toDecimalism(n){
		return parseInt(n,2);
	}
};

//重置内容
// 返回： [重置内容, 对照表]
let _close = (text) => {
	let _map = [...new Set(text.replace(/\s/g,"").split(""))];	//去除字符串重复项
	let _mapC = [];	//对照表
	let _resTxt = text;	//输出文本



	//创建对照表
	_map.forEach( (v,i) => {
		_mapC.push(tool.toBinary(i));
	});


	//进行替换
	//先替换掉0和1(避免冲突)
	_resTxt = _resTxt.replace(/0/g,"{mark}0{mark}").replace(/1/g,"{mark}1{mark}");

	_map.forEach( (v,i) => {
		v = v.replace("\\", "\\\\").replace("*", "\\*")
            .replace("+", "\\+").replace("|", "\\|")
            .replace("{", "\\{").replace("}", "\\}")
            .replace("(", "\\(").replace(")", "\\)")
            .replace("^", "\\^").replace("$", "\\$")
            .replace("[", "\\[").replace("]", "\\]")
            .replace("?", "\\?").replace(",", "\\,")
            .replace(".", "\\.").replace("&", "\\&");

        if(/[01]/.test(v)){
        	v = "\\{mark\\}"+v+"\\{mark\\}";
        }
		_resTxt = _resTxt.replace(new RegExp(v,"g")," "+_mapC[i]+" ");
	});
	// console.log(_resTxt);
	return [_resTxt,_map,_mapC];
}
//恢复内容
// 将_close返回的信息传入即可
let _open = (a) => {
	let _text = a[0],
		_map = a[1],
		_mapC = a[2];

	// console.log(_text,_map,_mapC);

	_mapC.forEach( (v,i) => {
		_text = _text.replace(new RegExp("\\s"+v+"\\s","g"), _map[tool.toDecimalism(v)]);
	});

	return _text;
}

let res = _close("66666");

let _res = _open(res);

console.log(` c：${res[0]} , o:${_res} `);

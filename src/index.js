  const injectElement = (target='', block = {}, options={}) => {
    const element = document.getElementsByTagName("bump-slot");
    // console.log(target?.style)
    const fontSize = block?.options?.fontSize?block.options.fontSize:options.fontSize?options.fontSize:'5vh'
    const color = block?.options?.color?block.options.color:options.color?options.color:'white'
    const fontFamily = block?.options?.fontFamily?block.options.fontFamily:options.fontFamily?options.fontFamily:'Helvetica'
    const clickable = block?.options?.clickable?block.options.clickable:options.clickable?options.clickable:false
    const maxWidth = block?.options?.maxWidth?block.options.maxWidth:options.maxWidth?options.maxWidth:'inherit'
    const textAlign = block?.options?.textAlign?block.options.textAlign:options.textAlign?options.textAlign:'center'
    const x = block?.options?.xOffset?block.options.xOffset:options.xOffset?options.xOffset:50
    const y = block?.options?.yOffset?block.options.yOffset:options.yOffset?options.yOffset:50
    const margin = ` ${y<=50?100-(y*2):0}vh ${x<=50?100-(x*2):0}vw ${y>50?(y*2)-100:0}vh ${x>50?(x*2)-100:0}vw`
    const insert = block.display?block.display:"&nbsp;";
    const wrapClassName = block?.options?.class?block.options.class:options.class?options.class:''
    if(element.length){
      element[0].parentNode.removeChild(element[0])
    }
    const bumpSlot = document.createElement('bump-slot')

    bumpSlot.innerHTML = `
    <div style="position: fixed; 
    top:0; left:0; 
    width: 100%; 
    height: 100%; 
    display: table; 
    pointer-events: ${clickable?"auto":"none"}">
      <div style="display: table-cell; vertical-align: middle; text-align: center;"> 
        <div id="bump-slot" 
        style="
          display: inline-block; 
          margin:${margin};
          font-family: ${fontFamily}; 
          font-size:${fontSize}; 
          color: ${color};
          text-align: ${textAlign};
          max-width: ${maxWidth};
        ">
          <div class="${wrapClassName}">
            ${insert}
          </div>
        </div> 
      </div> 
    </div> `;
    document.body.appendChild(bumpSlot)
  }

  const getTargetElement = (target) => {
    return target.includes('.')?document.getElementsByClassName(target.replace('.',''))[0]:target.includes('#')?document.getElementById(target.replace('#','')):document.getElementsByTagName('body');
  }
  const isSwimming = (block,target,options={})=>{
    const bs = document.getElementById("bump-slot")
    const windowYOffset = window.pageYOffset;
    let yOffset = block?.options?.yOffset?block.options.yOffset:options.yOffset?options.yOffset:50
    let percentYOffset = (yOffset-50)/100;
    const topOfBlock = target.offsetTop;
    const bottomOfBlock = target.offsetTop + target.offsetHeight;
    const floatingTourTop = bs.offsetTop;
    const floatingTourBottom = bs.offsetTop + bs.offsetHeight;
    const absTopOfBlock = topOfBlock-floatingTourTop+(window.innerHeight)*(percentYOffset);
    const absBotOfBlock = bottomOfBlock-floatingTourBottom+(window.innerHeight)*(percentYOffset);

    if(!(absTopOfBlock<=windowYOffset&&absBotOfBlock>=windowYOffset)){return false}

    const dec = 1-((absBotOfBlock - windowYOffset)/(absBotOfBlock - absTopOfBlock))
    const isSwimming = Math.round(dec*100);
    
    return isSwimming
  }
  

  const hassegments = (bump)=>{
    return bump.segments&&bump.segments.length>0
  }

   const segmentIsString = (segment)=>{
    return typeof segment == 'string'
  }

  const prepBump = (bump)=>{
    //find percents to display each block

    if(!hassegments(bump)){
      bump.segments=[{from:0,to:100,display:bump.display,options:bump.options?bump.options:{}}];
      return bump;
    }

    
    let totalPercent = 0;
    let distPercent = 0;
    let np = 0;
    for(let i = 0; i < bump.segments.length; i++){
      if(segmentIsString(bump.segments[i])){
        bump.segments[i] = {display:bump.segments[i]}
      }
      np+=bump.segments[i].percent?0:1;
      totalPercent += bump.segments[i].percent?bump.segments[i].percent:0
    }
    distPercent = totalPercent>=100&&np>0?2:Math.abs((100-totalPercent)/np)
    
    if(totalPercent<100) totalPercent = 100

    let tpp = 0;

    for(let j = 0; j < bump.segments.length; j++){
      const block = bump.segments[j] 
      block.from = tpp;
      block.to = tpp+=block.percent?((block.percent/totalPercent)*100):((distPercent/totalPercent)*100);
      bump.segments[j] = block;
    }

    return bump
  }

  const swimThru = (bump)=>{
    let injected = false;
    const target = getTargetElement(bump.target)

    for(let i=0;i<bump.segments.length;i++){
      let s = isSwimming(bump.segments[i],target,bump.options);

      if(s > bump.segments[i].from && s <=bump.segments[i].to){
        let options = {};
        if(bump.segments[i].options) options = bump.segments[i].options;
        injectElement(target,bump.segments[i],bump.options);
        injected = true
        return true ;
      }
    }
    if(!injected){
      injectElement(target);
    }
  }

  const swim = (obj) => {
    //adding an empty bump prevents weird blinking issue; 
    // TODO: fix the root cause of this issue.
    let bumps = [];

    if(!Array.isArray(obj)){
      bumps.push(obj) 
    }else{
      bumps = [{target:'body'},...obj]
    }

    for(let j=0;j<bumps.length;j++){
      if(swimThru(prepBump(bumps[j]))) return  
    }
  }

  function init(obj){
    injectElement();

    window.addEventListener('load', (event) => {
      swim(obj);
    });

    window.addEventListener('scroll', (event) => {
      swim(obj);
    });
  }
        
  export {
    init
  }
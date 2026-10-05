const catalogue = [
 ['cm1','chiangmai','nature','ดอยสุเทพยามเช้า','ชมเมืองจากมุมสูง สูดอากาศเย็นบนดอย',50,'2 ชม.','⛰️','#a7bcb2','#789880','#416d59'],
 ['cm2','chiangmai','cafe','กาแฟย่านนิมมาน','จิบกาแฟแก้วโปรด ในย่านเล็ก ๆ ที่มีชีวิตชีวา',180,'1 ชม.','☕','#c7b296','#b99671','#796c50'],
 ['cm3','chiangmai','culture','เดินเล่นเมืองเก่า','ค่อย ๆ เดินผ่านวัด ตรอกเล็ก และเรื่องราวของเมือง',0,'2 ชม.','🏯','#c9b4a0','#bd967a','#936f57'],
 ['cm4','chiangmai','nature','น้ำตกแม่สา','ฟังเสียงน้ำ พักใจใต้ร่มไม้สีเขียว',100,'3 ชม.','🌿','#aec5bd','#81a49a','#477e71'],
 ['cm5','chiangmai','cafe','มื้อเย็นแบบคนเมือง','ข้าวซอยร้อน ๆ กับอาหารเหนือเต็มโต๊ะ',250,'1 ชม.','🍜','#d5bc91','#c2a56a','#91804e'],
 ['cm6','chiangmai','culture','สตูดิโอเซรามิก','ลองปั้นดินให้เป็นของที่ระลึกชิ้นเดียวในโลก',650,'2 ชม.','🏺','#cbb8aa','#b69982','#86745f'],
 ['bk1','bangkok','nature','สวนเบญจกิติ','เดินริมบึงบนทางเดินสีเขียวกลางเมือง',0,'2 ชม.','🌳','#abc4b4','#88a987','#547b5b'],
 ['bk2','bangkok','cafe','คาเฟ่ย่านเจริญกรุง','พักดื่มกาแฟระหว่างเดินสำรวจตึกเก่า',200,'1 ชม.','☕','#c7b296','#b99671','#796c50'],
 ['bk3','bangkok','culture','หอศิลป์กรุงเทพฯ','ใช้เวลาช้า ๆ กับนิทรรศการและงานสร้างสรรค์',0,'2 ชม.','🎨','#b9b5c6','#a195ae','#71647b'],
 ['bk4','bangkok','nature','บางกระเจ้า','ปั่นจักรยานใต้ต้นไม้ ในคุ้งน้ำใกล้เมือง',150,'3 ชม.','🚲','#aec5bd','#81a49a','#477e71'],
 ['bk5','bangkok','cafe','อร่อยที่เยาวราช','แบ่งกันชิมของอร่อยในค่ำคืนที่คึกคัก',350,'2 ชม.','🍜','#d5bc91','#c2a56a','#91804e'],
 ['bk6','bangkok','culture','มิวเซียมสยาม','สนุกกับการเรียนรู้เรื่องราวของความเป็นไทย',100,'2 ชม.','🏛️','#cbb8aa','#b69982','#86745f'],
 ['hh1','huahin','nature','เช้าที่ชายหาด','เดินเท้าเปล่าริมทะเล ดูฟ้าเปลี่ยนสี',0,'2 ชม.','🌊','#abc9cb','#82aaa7','#507f83'],
 ['hh2','huahin','cafe','คาเฟ่ริมทะเล','กาแฟ ขนม และวิวทะเลตรงหน้า',220,'1 ชม.','☕','#c7b296','#b99671','#796c50'],
 ['hh3','huahin','culture','ตลาดซิเคด้า','เลือกชมงานศิลป์และของทำมือช่วงสุดสัปดาห์',0,'2 ชม.','🎨','#b9b5c6','#a195ae','#71647b'],
 ['hh4','huahin','nature','เขาตะเกียบ','เดินขึ้นไปชมวิวชายฝั่งจากบนเขา',50,'2 ชม.','⛰️','#a7bcb2','#789880','#416d59'],
 ['hh5','huahin','cafe','มื้อเย็นตลาดโต้รุ่ง','เลือกชิมอาหารทะเลและของอร่อยในตลาด',400,'2 ชม.','🍤','#d5bc91','#c2a56a','#91804e'],
 ['hh6','huahin','culture','สถานีรถไฟหัวหิน','เก็บภาพสถาปัตยกรรมคลาสสิกของเมือง',0,'1 ชม.','🚂','#cbb8aa','#b69982','#86745f']
].map(([id,city,type,name,description,cost,duration,icon,sky,hill,front])=>({id,city,type,name,description,cost,duration,icon,sky,hill,front}));
const key='weekend-studio-v1';
const initial=()=>({city:'chiangmai',days:2,name:'ทริปเติมพลังของฉัน',items:[]});
const cities={chiangmai:'เชียงใหม่',bangkok:'กรุงเทพฯ',huahin:'หัวหิน'};
const categories={nature:'ธรรมชาติ',cafe:'คาเฟ่ & อาหาร',culture:'ศิลปะ & วัฒนธรรม'};
let state=initial(), activeDay=1, filter='all', timer;
const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat('th-TH').format(n);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(timer);timer=setTimeout(()=>$('toast').classList.remove('show'),2600);}
try{
 const saved=JSON.parse(localStorage.getItem(key));
 if(saved && Object.hasOwn(cities,saved.city) && [1,2,3].includes(saved.days) && typeof saved.name==='string' && Array.isArray(saved.items)) {
  state={city:saved.city,days:saved.days,name:saved.name.slice(0,80),items:saved.items.filter(i=>i && typeof i.uid==='string' && typeof i.name==='string' && i.name.length<=80 && Number.isFinite(i.cost) && i.cost>=0 && i.cost<=1000000 && Number.isInteger(i.day) && i.day>=1 && i.day<=saved.days).map(i=>({uid:i.uid,name:i.name,cost:i.cost,day:i.day}))};
 }
}catch{toast('อ่านข้อมูลเดิมไม่ได้ เริ่มแผนใหม่ให้แล้ว');}
function save(){try{localStorage.setItem(key,JSON.stringify(state));}catch{toast('บันทึกในเครื่องไม่ได้ แผนยังใช้ได้ในหน้านี้');}}
function renderCards(){
 const list=catalogue.filter(c=>c.city===state.city && (filter==='all'||c.type===filter));
 $('result-count').textContent=`${list.length} ไอเดีย`;
 $('cards').innerHTML=list.map(c=>`<article class="card"><div class="art" style="--sky:${c.sky};--hill:${c.hill};--front:${c.front}" aria-hidden="true"><span class="art-label">${c.type.toUpperCase()} / ${cities[c.city]}</span><span class="sun"></span><span class="art-icon">${c.icon}</span></div><div class="card-body"><div class="card-meta">${categories[c.type]} · ${c.duration}</div><h3>${c.name}</h3><p>${c.description}</p><div class="card-bottom"><span class="price">${c.cost ? '฿'+money(c.cost):'ฟรี'} <small>${c.cost?' / คน':''}</small></span><button class="add" data-add="${c.id}" aria-label="เพิ่ม ${c.name} ในวันที่ ${activeDay}">+ ใส่ทริป</button></div></div></article>`).join('');
}
function renderPlan(){
 $('day-tabs').innerHTML=Array.from({length:state.days},(_,i)=>`<button class="day-tab ${activeDay===i+1?'active':''}" data-day="${i+1}" aria-pressed="${activeDay===i+1}">วันที่ ${i+1}</button>`).join('');
 const list=state.items.filter(i=>i.day===activeDay);
 $('plan-list').innerHTML=list.length?list.map((i,n)=>`<div class="plan-item"><span class="step">${n+1}</span><div class="item-content"><div class="item-name">${escape(i.name)}</div><div class="item-price">${i.cost?'฿'+money(i.cost):'ไม่มีค่าใช้จ่าย'}</div></div><div class="item-actions"><button class="icon-button" data-up="${escape(i.uid)}" aria-label="เลื่อน ${escape(i.name)} ขึ้น" ${n===0?'disabled':''}>↑</button><button class="icon-button" data-remove="${escape(i.uid)}" aria-label="ลบ ${escape(i.name)}">×</button></div></div>`).join(''):`<div class="empty"><span>✳</span>วันนี้ยังมีที่ว่างสำหรับความสุข<br>เลือกกิจกรรม แล้วกด “+ ใส่ทริป”</div>`;
 $('activity-count').textContent=`${state.items.length} กิจกรรม`;
 $('total').textContent='฿'+money(state.items.reduce((sum,i)=>sum+i.cost,0));
}
function render(){ $('city').value=state.city;$('days').value=state.days;$('trip-name').value=state.name;renderCards();renderPlan(); }
$('cards').addEventListener('click',e=>{const button=e.target.closest('[data-add]');if(!button)return;const c=catalogue.find(c=>c.id===button.dataset.add);state.items.push({uid:crypto.randomUUID(),name:c.name,cost:c.cost,day:activeDay});save();renderPlan();toast(`เพิ่มในวันที่ ${activeDay} แล้ว`);});
$('day-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-day]');if(!b)return;activeDay=Number(b.dataset.day);renderPlan();renderCards();});
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('.filter').forEach(c=>{c.classList.toggle('active',c===b);c.setAttribute('aria-pressed',String(c===b));});renderCards();}));
$('city').addEventListener('change',e=>{state.city=e.target.value;save();renderCards();});
$('days').addEventListener('change',e=>{const days=Number(e.target.value);if(state.items.some(i=>i.day>days)&&!confirm('กิจกรรมของวันที่เกินจะย้ายไปวันสุดท้าย ต้องการลดจำนวนวันหรือไม่?')){$('days').value=state.days;return;}state.days=days;state.items.forEach(i=>i.day=Math.min(i.day,days));activeDay=Math.min(activeDay,days);save();renderPlan();renderCards();});
$('trip-name').addEventListener('input',e=>{state.name=e.target.value;save();});
$('plan-list').addEventListener('click',e=>{const remove=e.target.closest('[data-remove]');const up=e.target.closest('[data-up]');if(remove){state.items=state.items.filter(i=>i.uid!==remove.dataset.remove);}else if(up){const index=state.items.findIndex(i=>i.uid===up.dataset.up);let previous=index-1;while(previous>=0&&state.items[previous].day!==activeDay)previous--;if(previous>=0)[state.items[index],state.items[previous]]=[state.items[previous],state.items[index]];}else return;save();renderPlan();});
$('custom-form').addEventListener('submit',e=>{e.preventDefault();const name=$('custom-name').value.trim(),cost=Number($('custom-cost').value);if(!name||!Number.isInteger(cost)||cost<0||cost>1000000){toast('กรอกชื่อกิจกรรมและค่าใช้จ่ายที่ถูกต้อง');return;}state.items.push({uid:crypto.randomUUID(),name,cost,day:activeDay});$('custom-form').reset();save();renderPlan();toast('เพิ่มกิจกรรมของคุณแล้ว');});
$('reset').addEventListener('click',()=>{if(!confirm('ล้างแผนปัจจุบันและเริ่มใหม่หรือไม่?'))return;state=initial();activeDay=1;save();render();toast('พร้อมสำหรับทริปใหม่แล้ว');});
$('export').addEventListener('click',()=>{const lines=[state.name||'ทริปวันหยุด',`จุดหมาย: ${cities[state.city]}`,`ระยะเวลา: ${state.days} วัน`,''];for(let day=1;day<=state.days;day++){lines.push(`วันที่ ${day}`);const items=state.items.filter(i=>i.day===day);lines.push(...(items.length?items.map((i,n)=>`${n+1}. ${i.name} — ฿${money(i.cost)}`):['ยังไม่มีกิจกรรม']),'');}lines.push(`งบรวมโดยประมาณ: ฿${money(state.items.reduce((sum,i)=>sum+i.cost,0))}`,'ไม่รวมที่พักและการเดินทาง · ข้อมูลกิจกรรมและราคาเป็นตัวอย่าง');const url=URL.createObjectURL(new Blob(['\uFEFF'+lines.join('\n')],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='weekend-plan.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('ดาวน์โหลดแผนแล้ว');});
render();

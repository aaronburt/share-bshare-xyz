const player = videojs('my-video');
const expandButton = player.controlBar.addChild("button");
const expandButtonDom = expandButton.el();
expandButtonDom.innerHTML = '<i class="fa-solid fa-maximize"></i>';
expandButtonDom.onclick = () => { toggleClass('container-class', 'container-class'); }  
const shareOptions = { socials: ['fb', 'tw', 'reddit', 'messenger', 'telegram', 'whatsapp'], url: window.location.href }
player.share(shareOptions);
player.persistvolume({});
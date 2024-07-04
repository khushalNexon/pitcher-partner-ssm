import{r as h,h as V,_ as r,p as X,q as A,j as t,t as Y,F as Z,i as H,v as S,w as R,P as p,x as u}from"./index-189ad134.js";import{g as v,b as ee,u as oe}from"./DataGrid-d3a715dd.js";const I="Modal";function te(e){return v(I,e)}ee(I,["root","hidden","backdrop"]);const se=["children","closeAfterTransition","container","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onKeyDown","open","onTransitionEnter","onTransitionExited","slotProps","slots"],ae=e=>{const{open:o,exited:a}=e;return H({root:["root",!o&&a&&"hidden"],backdrop:["backdrop"]},oe(te))},le=h.forwardRef(function(o,a){var s;const{children:i,closeAfterTransition:f=!1,container:O,disableAutoFocus:y=!1,disableEnforceFocus:g=!1,disableEscapeKeyDown:$=!1,disablePortal:k=!1,disableRestoreFocus:E=!1,disableScrollLock:G=!1,hideBackdrop:N=!1,keepMounted:C=!1,onBackdropClick:P,open:F,slotProps:T={},slots:B={}}=o,U=V(o,se),w=r({},o,{closeAfterTransition:f,disableAutoFocus:y,disableEnforceFocus:g,disableEscapeKeyDown:$,disablePortal:k,disableRestoreFocus:E,disableScrollLock:G,hideBackdrop:N,keepMounted:C}),{getRootProps:K,getBackdropProps:L,getTransitionProps:z,portalRef:W,isTopModal:q,exited:D,hasTransition:m}=X(r({},w,{rootRef:a})),b=r({},w,{exited:D,hasTransition:m}),M=ae(b),d={};if(i.props.tabIndex===void 0&&(d.tabIndex="-1"),m){const{onEnter:n,onExited:c}=z();d.onEnter=n,d.onExited=c}const j=(s=B.root)!=null?s:"div",J=A({elementType:j,externalSlotProps:T.root,externalForwardedProps:U,getSlotProps:K,className:M.root,ownerState:b}),x=B.backdrop,Q=A({elementType:x,externalSlotProps:T.backdrop,getSlotProps:n=>L(r({},n,{onClick:c=>{P&&P(c),n!=null&&n.onClick&&n.onClick(c)}})),className:M.backdrop,ownerState:b});return!C&&!F&&(!m||D)?null:t.jsx(Y,{ref:W,container:O,disablePortal:k,children:t.jsxs(j,r({},J,{children:[!N&&x?t.jsx(x,r({},Q)):null,t.jsx(Z,{disableEnforceFocus:g,disableAutoFocus:y,disableRestoreFocus:E,isEnabled:q,open:F,children:h.cloneElement(i,d)})]}))})}),me=[{field:"clientId",headerName:"Client ID",valueGetter:(e,o)=>(e==null?void 0:e.split("_")[1])??e},{field:"abnNo",headerName:"ABN No",editable:!1},{field:"name",headerName:"Full Name",editable:!1},{field:"email",headerName:"Email",type:"email",editable:!1},{field:"employeeNumbers",headerName:"No. Of Employees",type:"number",editable:!1,valueGetter:(e,o)=>o.employees.length}],be=[{field:"clientId",headerName:"Client ID",valueGetter:e=>(e==null?void 0:e.split("_")[1])??e},{field:"employeeId",headerName:"Employee ID",valueGetter:e=>(e==null?void 0:e.split("_")[1])??e},{field:"abnNo",headerName:"Employee ABN No",editable:!1},{field:"name",headerName:"Employee Full Name",editable:!1},{field:"email",headerName:"Employee Email",type:"email",editable:!1},{field:"shareOptions",headerName:"Share Options",valueGetter:e=>(e==null?void 0:e.length)??0}];function ne({isOpen:e,handleToggle:o,children:a}){const[s,i]=S.useState(!1),f=()=>{i(!1),o(!1)};return h.useEffect(()=>{i(e)},[e]),t.jsx(re,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:s,onClose:f,closeAfterTransition:!0,slots:{backdrop:ie},children:t.jsx(R,{in:s,children:t.jsx(ce,{sx:de,children:a})})})}const _=S.forwardRef((e,o)=>{const{open:a,...s}=e;return t.jsx(R,{in:a,children:t.jsx("div",{ref:o,...s})})});_.propTypes={open:p.bool};const l={50:"#F3F6F9",100:"#E5EAF2",200:"#DAE2ED",300:"#C7D0DD",400:"#B0B8C4",500:"#9DA8B7",600:"#6B7A90",700:"#434D5B",800:"#303740",900:"#1C2025"},re=u(le)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`,ie=u(_)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`,de={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400},ce=u("div")(({theme:e})=>`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${e.palette.mode==="dark"?l[900]:"#fff"};
  border-radius: 8px;
  border: 1px solid ${e.palette.mode==="dark"?l[700]:l[200]};
  box-shadow: 0 4px 12px
    ${e.palette.mode==="dark"?"rgb(0 0 0 / 0.5)":"rgb(0 0 0 / 0.2)"};
  padding: 24px;
  color: ${e.palette.mode==="dark"?l[50]:l[900]};

  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-bottom: 8px;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${e.palette.mode==="dark"?l[400]:l[800]};
    margin-bottom: 4px;
  }
`);ne.propTypes={children:p.node,isOpen:p.bool,handleToggle:p.func};export{ne as T,me as c,be as e};

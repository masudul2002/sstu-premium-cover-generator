/* =====================================
   IDS
===================================== */

const ids = [

"university",
"department",
"faculty",
"semester",
"session",
"degree",
"assignment",
"course",
"code",
"student",
"studentSemester",
"studentYear",
"studentSession",
"studentId",
"studentDepartment",
"teacher",
"designation",
"submissionDate"

];

/* =====================================
   AUTO DATE
===================================== */

const subDateInput = document.getElementById('submissionDate');
if(subDateInput) {
    subDateInput.value = new Date().toLocaleDateString('en-US', {
        year:'numeric',
        month:'long',
        day:'numeric'
    });
}

/* =====================================
   SUPERSCRIPT
===================================== */

function formatSuperscript(text){

return text

.replace(/1st/g,'1<sup>st</sup>')
.replace(/2nd/g,'2<sup>nd</sup>')
.replace(/3rd/g,'3<sup>rd</sup>')
.replace(/4th/g,'4<sup>th</sup>');
}

function generateQR(){

    const qrContainer = document.getElementById("qrcode");
    if(!qrContainer) return;

    /* CLEAR OLD */
    qrContainer.innerHTML = "";

    /* ELEMENTS */
    const student = document.getElementById('student');
    const studentId = document.getElementById('studentId');
    const studentSession = document.getElementById('studentSession');
    const studentDepartment = document.getElementById('studentDepartment');
    const code = document.getElementById('code');
    const university = document.getElementById('university');

    /* COMPILE DATA */
    const qrData = 
    `Student: ${student.value}\nID: ${studentId.value}\nSession: ${studentSession.value}\nDept: ${studentDepartment.value}\nCourse: ${code.value}\nUni: ${university.value}`;

    /* GENERATE */
    new QRCode(qrContainer, {
        text: qrData,
        width: 88,
        height: 88,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.M
    });
}

/* =====================================
   UPDATE
===================================== */

function updatePreview(){

    /* UI Elements Cache */
    const pUni = document.getElementById('pUniversity');
    const pDept = document.getElementById('pDepartment');
    const pFac = document.getElementById('pFaculty');
    const pTop = document.getElementById('pTopInfo');
    const pAssign = document.getElementById('pAssignment');
    const pCrse = document.getElementById('pCourse');
    const pCd = document.getElementById('pCode');
    const pStud = document.getElementById('pStudent');
    const pStudSem = document.getElementById('pStudentSemester');
    const pStudYr = document.getElementById('pStudentYear');
    const pStudSes = document.getElementById('pStudentSession');
    const pStudId = document.getElementById('pStudentId');
    const pStudDept = document.getElementById('pStudentDepartment');
    const pTchr = document.getElementById('pTeacher');
    const pDesig = document.getElementById('pDesignation');
    const pSubD = document.getElementById('pSubmissionDate');

    /* Form Values */
    const university = document.getElementById('university');
    const department = document.getElementById('department');
    const faculty = document.getElementById('faculty');
    const semester = document.getElementById('semester');
    const session = document.getElementById('session');
    const degree = document.getElementById('degree');
    const assignment = document.getElementById('assignment');
    const course = document.getElementById('course');
    const code = document.getElementById('code');
    const student = document.getElementById('student');
    const studentSemester = document.getElementById('studentSemester');
    const studentYear = document.getElementById('studentYear');
    const studentSession = document.getElementById('studentSession');
    const studentId = document.getElementById('studentId');
    const studentDepartment = document.getElementById('studentDepartment');
    const teacher = document.getElementById('teacher');
    const designation = document.getElementById('designation');
    const submissionDate = document.getElementById('submissionDate');

    if(pUni) pUni.innerText = university.value;
    if(pDept) pDept.innerText = department.value;
    if(pFac) pFac.innerText = faculty.value;
    
    if(pTop) {
        pTop.innerHTML = `
        Semester:
        ${formatSuperscript(semester.value)}
        &nbsp;&nbsp; | &nbsp;&nbsp;
        Session:
        ${session.value}
        &nbsp;&nbsp; | &nbsp;&nbsp;
        ${degree.value}
        `;
    }

    if(pAssign) pAssign.innerText = assignment.value;
    if(pCrse) pCrse.innerText = course.value;
    if(pCd) pCd.innerText = code.value;
    if(pStud) pStud.innerText = student.value;
    
    if(pStudSem) pStudSem.innerHTML = formatSuperscript(studentSemester.value);
    if(pStudYr) pStudYr.innerHTML = formatSuperscript(studentYear.value);
    
    if(pStudSes) pStudSes.innerText = studentSession.value;
    if(pStudId) pStudId.innerText = studentId.value;
    if(pStudDept) pStudDept.innerText = studentDepartment.value;
    if(pTchr) pTchr.innerText = teacher.value;
    if(pDesig) pDesig.innerText = designation.value;
    if(pSubD) pSubD.innerText = submissionDate.value;

    generateQR();
    saveData();
    adjustScale();
}

/* =====================================
   SAVE
===================================== */

function saveData(){
    ids.forEach(id=>{
        const el = document.getElementById(id);
        if(el) {
            localStorage.setItem(id, el.value);
        }
    });

    const themeSelect = document.getElementById('theme');
    if(themeSelect){
        localStorage.setItem('theme', themeSelect.value);
    }
}

/* =====================================
   THEME
===================================== */

function applyTheme(color){
    const root = document.documentElement.style;

    if(color==="green"){
        root.setProperty('--theme','#7fb347');
        root.setProperty('--theme-dark','#679535');
        root.setProperty('--theme-light','#dfe8d6');
    } else if(color==="blue"){
        root.setProperty('--theme','#4b86ff');
        root.setProperty('--theme-dark','#2d68de');
        root.setProperty('--theme-light','#dce7ff');
    } else if(color==="red"){
        root.setProperty('--theme','#db5b5b');
        root.setProperty('--theme-dark','#bb3c3c');
        root.setProperty('--theme-light','#f7dddd');
    } else if(color==="purple"){
        root.setProperty('--theme','#9a67ea');
        root.setProperty('--theme-dark','#7b4ec7');
        root.setProperty('--theme-light','#ece1ff');
    }
}

/* =====================================
   LOAD
===================================== */

function loadData(){

    ids.forEach(id=>{
        const value = localStorage.getItem(id);
        const el = document.getElementById(id);
        if(value && el){
            el.value = value;
        }
    });

    const savedTheme = localStorage.getItem('theme');
    const themeSelect = document.getElementById('theme');
    if(savedTheme){
        if(themeSelect) themeSelect.value = savedTheme;
        applyTheme(savedTheme);
    }

    const logoPreview = document.getElementById('logoPreview');
    const watermarkLogo = document.getElementById('watermarkLogo');
    
    if(logoPreview) logoPreview.src = 'SSTU_LOGO.jpg';
    if(watermarkLogo) watermarkLogo.src = 'SSTU_LOGO.jpg';

    updatePreview();
}

/* =====================================
   LISTENER
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    ids.forEach(id=>{
        const el = document.getElementById(id);
        if(el) {
            el.addEventListener('input', updatePreview);
        }
    });

    const themeSelect = document.getElementById('theme');
    if(themeSelect){
        themeSelect.addEventListener('change', function(){
            applyTheme(this.value);
            saveData();
        });
    }
    
    /* INIT AFTER LOAD */
    loadData();
    setTimeout(adjustScale, 150);
});

/* =====================================
   PDF
===================================== */

async function downloadPDF(){

    const element = document.getElementById("a4-page");
    const wrapper = document.querySelector(".preview-wrapper");

    if(!element) return;

    /* STORE ORIGINAL STATE */
    const originalTransform = element.style.transform;
    const originalPosition = element.style.position;

    /* RESET STATE FOR PDF CAPTURE */
    window.scrollTo(0, 0); /* FORCE SCROLL TO TOP TO PREVENT OFFSET CUTOFF */
    element.style.transform = "none";
    element.style.position = "relative"; /* Forces standard layout for snapshot */
    element.style.top = "0";
    element.style.left = "0";
    element.style.margin = "0 auto";
    element.style.boxShadow = "none";
    
    if(wrapper && window.innerWidth <= 900) {
        wrapper.style.height = "auto"; 
    }

    const options = {
        margin:0,
        filename:"SSTU-Cover-Page.pdf",
        image:{ type:"jpeg", quality:1 },
        html2canvas:{
            scale:2, 
            useCORS:true,
            letterRendering:true,
            backgroundColor:"#ffffff",
            scrollX: 0,
            scrollY: 0,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight
        },
        jsPDF:{ unit:"px", format:[794,1123], orientation:"portrait" }
    };

    try {
        await html2pdf().set(options).from(element).save();
    } catch (error) {
        console.error(error);
        alert("Failed to generate PDF.");
    } finally {
        /* RESTORE */
        element.style.transform = originalTransform;
        adjustScale();
    }
}

/* =====================================
   DYNAMIC RESPONSIVE SCALING
===================================== */

function adjustScale() {
    const page = document.getElementById("a4-page");
    const wrapper = document.querySelector(".preview-wrapper");
    
    if (!page || !wrapper) return;

    /* DEFINED CONSTANTS FOR A4 DOCUMENT */
    const pageW = 794;
    const pageH = 1123;

    if (window.innerWidth <= 900) {
        /* MOBILE RESET */
        page.style.position = "relative";
        page.style.top = "auto";
        page.style.left = "auto";
        page.style.margin = "0 auto";

        /* MOBILE VIEW: SCALE WIDTH ONLY AND FLOW HEIGHT */
        const targetW = window.innerWidth - 40;
        const scaleRatio = Math.min(1, targetW / pageW);
        
        page.style.transform = `scale(${scaleRatio})`;
        page.style.transformOrigin = "top center";
        
        const scaledHeight = Math.ceil(pageH * scaleRatio);
        wrapper.style.height = `${scaledHeight + 30}px`;
    } else {
        /* PC VIEW: ACCURATE BOUNDING RECT CALCULATION */
        const rect = wrapper.getBoundingClientRect();
        
        /* Safe dynamic container sizing with safe-min-fallback to window inner metrics */
        const availW = rect.width > 100 ? rect.width - 40 : window.innerWidth - 450;
        const availH = rect.height > 100 ? rect.height - 40 : window.innerHeight - 60;

        const ratioW = availW / pageW;
        const ratioH = availH / pageH;
        
        /* MAXIMIZE SPACE UTILIZATION: Min bound enforces document fits screen flawlessly */
        const bestScale = Math.min(1, ratioW, ratioH); 
        
        /* ABSOLUTE CENTERING ALGORITHM FOR IMMUTABLE VISUAL CONSISTENCY */
        page.style.position = "absolute";
        page.style.top = "50%";
        page.style.left = "50%";
        page.style.margin = "0";
        page.style.transform = `translate(-50%, -50%) scale(${bestScale})`;
        page.style.transformOrigin = "center center";
        
        /* Release manual wrapper height locks */
        wrapper.style.height = "100%";
    }
}

window.addEventListener("resize", adjustScale);

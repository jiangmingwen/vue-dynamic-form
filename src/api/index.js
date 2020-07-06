export default {
    GET_DIC: {
        //获取字典
        value: "/api/Dictionary/GetDictionaryJson",
        gateway_key: "SERVER_API_DATACENTER", //基础数据API
    },
    GET_KZDIC: "/sportsexamination/beexaminationcommon/getdictionary", //获取体考字典
    getexaminationandrecordlist: "/sportsexamination/beexamination/getexaminationandrecordlist", //获取考试报名列表
    getmodelbyid: "/sportsexamination/beexaminationstudent/getmodelbyid", //根据主键id获取单个实体-考生
    studentreport: "/sportsexamination/beexaminationstudent/studentreport", //C端 学生确认报名
    getbmlslist: "/sportsexamination/beexamination/getexaminationandrecordhistorylist", //C端 获取考试报名历史
    // 考试报名历史
    getcurrentstudent: "/sportsexamination/beexaminationstudent/getcurrentstudent", //C端 获取考生基本信息
    getvolunteerreport: "/volunteer/studentsdeclareinformation/getvolunteerreport", //C端 获取考生志愿填报列表
    selectvolunteerreport: "/volunteer/studentsdeclareinformation/selectvolunteerreport", //C端 获取考生已填志愿填报列表
    volunteerinsert: "/volunteer/studentsdeclareinformation/insert", //C端 保存考生志愿填报数据
    dropdowndatalist: "/volunteer/batchrulesschoolmajor/getdropdowndatalist", //C端 获取学校和专业list
    getxdlist: "/rs/enrollmentsection/getlist", //C端 获取入学学段列表

    getmodelbysectionenum: "/rs/enrollmentrecord/getmodelbysectionenum",

    //根据招生记录code 来查找学生信息
    getStudentInfo: '/volunteer/studentsdeclareinformation/getstudentinfo',
    // 获取数据中心学校列表
    GetSchoolList: {
        value: "/api/School/GetSchoolPageList",
        gateway_key: "SERVER_API_DATACENTER", //基础数据API
    },
    GetGradePageList: {
        value: '/api/Grade/GetGradePageList', //获取年级
        gateway_key: 'SERVER_API_DATACENTER'
    },
    GetClassPageList: {
        value: '/api/Classes/GetClassPageList',
        gateway_key: 'SERVER_API_DATACENTER'
    },
    Upload: { //上传头像
        value: '/FileService/Upload',
        gateway_key: 'SERVER_API_OSS'
    },
};
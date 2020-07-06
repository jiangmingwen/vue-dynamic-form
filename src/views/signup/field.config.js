//哪些字段是布尔值
export const booleanKeyList = [
    "Is_Apply_Exempt_Examination",
    "Sf_Ssmz",
    "Sf_Gq_Hqzn",
    "Sf_Twj",
    "Sf_Lzzn",
    "Sf_Jr_Xf",
    "Sf_Ga_Jw",
    "Is_Slow_Examination"
]

//哪些字段是下拉菜单
export const columnsMap = {
    Sex: [],
    Grade_Id: [],
    Class_Id: [],
    Nation_Code: [],
    Is_Unsuitable_Exercise: [],
    Zzmm: [],
    Examinee_Type_Code: [],
    Wyyzdm: [],
    Mzyydj: [],
    Bylbdm: []
}

//哪些字段要用字典
export const DIC_MAP = {
    Sex: "XB",
    Nation_Code: "MZ",
    Is_Unsuitable_Exercise: "BeExaminationStudent_Is_Unsuitable_Exercise_Enum",
    Zzmm: "ZZMM",
    Examinee_Type_Code: "BeExaminationStudent_Examinee_Type_Code_Enum",
    Wyyzdm: "WYYZDM",
    Mzyydj: "MZYYDJ",
    Bylbdm: "BYLBDM",
    Sing_Up_Status: 'BeExaminationStudent_Sing_Up_Status_Enum',
    Audit_Status: 'BeExaminationStudent_Audit_Status_Enum'
}
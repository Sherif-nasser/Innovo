// frappe.ui.form.on("Appraisal Template", {
//     onload:function(frm){
//     //   console.log(frm.doc);
//     },
//     create_employee_apprisal:function(frm){
//         frappe.model.open_mapped_doc({
//             method: "innovo.serverside.make_appraisal",
//             frm: frm,
//             args: { salary_component: frm.doc.salary_component },
//             run_link_triggers: true
//         });
//     }
// });
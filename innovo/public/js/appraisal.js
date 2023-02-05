
frappe.ui.form.on("Appraisal", {
    onload:function(frm,cdt,cdn){
        var d =locals[cdt][cdn];
        

        if(frappe.get_prev_route()[1] == "Appraisal Template" && frm.doc.docstatus == 0){
            var doctemplatename = frappe.get_prev_route()[2]
            frappe.call({
                async: true,
                method: "innovo.serverside.get_doc_details",
                args:{
                    source_name: doctemplatename
                },
                callback: function(r) {
                    
                },
            });
        }
    },
    before_save:function(frm,cdt,cdn){
        var d = locals[cdt][cdn];

        
        var row_earned_amount = 0;
        var total_money_recieved = 0;
        $.each(frm.doc.goals || [], function(i, row) {
            console.log(row.amount);
            console.log(row.score_percentage)
            row_earned_amount = row.amount * (row.score_percentage / 100);
            total_money_recieved += row_earned_amount 
         
     
        });
        console.log(row_earned_amount);
        console.log(total_money_recieved)
        d.percentage = total_money_recieved;
        
        frm.refresh_field("percentage");
    },
    on_submit:function(frm,cdt,cdn){
        var d = locals[cdt][cdn];
        var employee = d.employee;
        var S_component = d.salary_component;
        var amount = d.percentage;
        var start_date = d.start_date;
        var end_date = d.end_date;

        if(d.percentage){
            console.log("start");
            frappe.call({
                method: "innovo.serverside.update_additional_salary",
                args: {
                    emplyee: employee,
                    salary_component: S_component,
                    amount : parseFloat(amount),
                    start_date : start_date,
                    end_date : end_date
                },
                callback: function(r) {
                    console.log(r.message);
                   
                }
            });
        }
        
    }
    
})

frappe.ui.form.on("Appraisal Goal", {
    score:function(frm,cdt,cdn){
        var d = locals[cdt][cdn];
        var x = d.score /5;
        var score_percentage =  (x * 100);
        d.score_percentage =  score_percentage;
        frm.refresh();
    },
    score_percentage:function(frm){
        frm.refresh_field("score_percentage");
    }
    
})

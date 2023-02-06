
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
        var total_money_recieved = 0.00;
        var total_percentage = 0.00;
        var total_lines = 0;
        var all_lines_percentage = 0.00;
        $.each(frm.doc.goals || [], function(i, row) {
            row_earned_amount = row.amount * (row.score_percentage / 100);
            total_money_recieved += row_earned_amount;
            total_percentage += row.score_percentage;
            total_lines += row.idx;
        });
        console.log(total_lines -1 );
        all_lines_percentage = total_percentage / ((total_lines-1) * 100) * 100;
        d.percentage = total_money_recieved;
        d.total_percentage = all_lines_percentage;
        d.total_score = 5;
         
        frm.refresh_field("percentage");
        frm.refresh_field("total_percentage");
        frm.refresh_field("total_score");
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
    // score:function(frm,cdt,cdn){
    //     var d = locals[cdt][cdn];
    //     var x = d.score /5;
    //     var score_percentage =  (x * 100);
    //     d.score_percentage =  score_percentage;
    //     frm.refresh();
    // },
    // score_percentage:function(frm){
        
    //     frm.refresh_field("score_percentage");
    // }

    
})

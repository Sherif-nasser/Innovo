import json
import erpnext

import frappe
from frappe import _, msgprint
from frappe.desk.notifications import clear_doctype_notifications
from frappe.model.mapper import get_mapped_doc
from erpnext.stock.doctype.item.item import get_item_defaults
from frappe.utils import cint, cstr, flt
from frappe.utils import cint, cstr, flt, get_link_to_form, getdate, new_line_sep, nowdate


@frappe.whitelist()
def update_additional_salary(emplyee,salary_component,amount,ratio):


    doc = frappe.new_doc('Additional Salary')
    doc.employee = emplyee
    doc.amount = float(amount)
    doc.salary_component = salary_component
    doc.kpi_ration = ratio

    return doc.insert()

@frappe.whitelist()
def make_appraisal(source_name,args=None):
    ## amount_ in Appraisal Template Goal
    ## 
    doclist = get_mapped_doc(
		"Appraisal Template", ## from_doctype,
		source_name, ## from_docname,
		{  ## table_maps,
			"Appraisal Template": {
				"doctype": "Appraisal",
				"validation": {"docstatus": ["=", 0]},
			},
			"Appraisal Template Goal": {
				"doctype": "Appraisal Goal",
				"field_map": [
					["amount_", "amount"],
					["per_weightage", "per_weightage"],
				],
			
			},
		},
	)

    return doclist



@frappe.whitelist()
def get_doc_details(source_name):
    source_doc = frappe.get_doc("Appraisal Template", source_name)
    return source_doc
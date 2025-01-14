
interface Table {
    name: string;
    pk_type: string;
    pk_name: string;
}

export interface DmlModel {
    folder: string;
    table_catalog: string;
    table_schema: string;
    schema_create: string;
    table: Table;
}
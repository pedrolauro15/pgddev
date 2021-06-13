
import { BaseService } from '../base/base.service';

export class R2jService extends BaseService {

    tag = 'r2j';

    template = [`
create or replace function {{schema_create}}.dmlapi_{{table_name}}_{{tag}}(
    fr_data {{table_schema}}.{{table_name}}
)
returns jsonb
    language plpgsql
AS $function$
------------------------------------------------------------------
-- LIVNOW: LIV Noop Of Work
------------------------------------------------------------------
-- (c) Copyright {{ano}} Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright {{ano}} desenroladev.com.br
------------------------------------------------------------------
-- {{table_schema}}.{{table_name}}: record to jsonb
------------------------------------------------------------------
declare
    lv_jsonb jsonb;
begin
    lv_jsonb := row_to_json(fr_data,  -- record
                            true);    -- pretty_bool
    return lv_jsonb;
end;
$function$
;`];

}

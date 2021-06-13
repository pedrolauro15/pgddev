
import { BaseService } from '../base/base.service';

export class PurgeService extends BaseService {

    tag = 'purge';
    template = [`
create or replace function {{schema_create}}.dmlapi_{{table_name}}_{{tag}}(
    fv_id uuid
)
returns void language plpgsql
as $function$
------------------------------------------------------------------
-- LIVSYNC: Quality Assurance Testing
------------------------------------------------------------------
-- (c) Copyright {{ano}} Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright {{ano}} desenroladev.com.br
------------------------------------------------------------------
-- dmlapi_{{table_name}}_purge: delete or set inactive
------------------------------------------------------------------
declare
  lr_data    {{table_schema}}.{{table_name}};
begin
    if (fv_id is not null) then
    lr_data := {{table_schema}}.dmlapi_{{table_name}}_select(fv_id      => fv_id,
                                                            fv_locking => true);
    if (lr_data.id is not null) then
      delete --+ qb_name(dmlapi_{{table_name}}_purge)
      from {{table_schema}}.{{table_name}}    a
      where 1e1 = 1e1
          and a.id = lr_data.id;
    end if;
    end if;
exception when others then
    raise;
end;
$function$
;`,


`create or replace function {{schema_create}}.dmlapi_{{table_name}}_{{tag}}(
    fr_data {{table_schema}}.{{table_name}}
)
returns void language plpgsql
as $function$
------------------------------------------------------------------
-- LIVSYNC: Quality Assurance Testing
------------------------------------------------------------------
-- (c) Copyright {{ano}} Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright {{ano}} desenroladev.com.br
------------------------------------------------------------------
-- dmlapi_{{table_name}}_{{tag}}: delete or set inactive
------------------------------------------------------------------
declare
begin
  if (fr_data.id is not null) then
    perform {{schema_create}}.dmlapi_{{table_name}}_{{tag}}(fv_id => fr_data.id);
  end if;
exception when others then
  raise;
end;
$function$
;`,


`create or replace function {{schema_create}}.dmlapi_{{table_name}}_{{tag}}(
    ft_data {{table_schema}}.{{table_name}}[]
)
returns void language plpgsql
as $function$
------------------------------------------------------------------
-- LIVSYNC: Quality Assurance Testing
------------------------------------------------------------------
-- (c) Copyright {{ano}} Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright {{ano}} desenroladev.com.br
------------------------------------------------------------------
-- dmlapi_{{table_name}}_{{tag}}: delete or set inactive
------------------------------------------------------------------
declare
  lr_data    {{table_schema}}.{{table_name}};
begin
  foreach lr_data in array ft_data loop
    perform {{schema_create}}.dmlapi_{{table_name}}_{{tag}}(fv_id => lr_data.id);
  end loop;
exception when others then
  raise;
end;
$function$
;`
];

}

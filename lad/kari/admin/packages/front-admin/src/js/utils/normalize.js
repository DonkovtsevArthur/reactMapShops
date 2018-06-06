import { normalize, schema } from 'normalizr'
// import { omit } from 'lodash/omit'

export function normalizeEntity({ data, entities = 'field', key = 'id' }) {
	const entity = new schema.Entity(entities, {}, { idAttribute: key })
	const mySchema = { [entities]: [entity] }
	const res = normalize({ [entities]: data }, mySchema)
	return { data: res.entities[entities], list: res.result[entities] }
}

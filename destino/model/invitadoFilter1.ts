/**
 * pruebaloopback
 * pruebaloopback
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: fer.borgognoni@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { InvitadoIncludeFilterItems } from './invitadoIncludeFilterItems';
import { InvitadoFields } from './invitadoFields';


export interface InvitadoFilter1 { 
    offset?: number;
    limit?: number;
    skip?: number;
    order?: string | Array<string>;
    where?: { [key: string]: object; };
    fields?: InvitadoFields;
    include?: Array<InvitadoIncludeFilterItems>;
}


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


/**
 * (tsType: Omit<Invitado, \'id\'>, schemaOptions: { title: \'NewInvitado\', exclude: [ \'id\' ] })
 */
export interface NewInvitado { 
    nombre: string;
    email?: string;
    creador: boolean;
    eventoId?: string;
}


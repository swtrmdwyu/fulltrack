import { useContext, useEffect, useRef, useState } from "react";
import MenuLink from  "../../interfaces/MenuLink";
import Navbar from "../../Components/Navbar";
import Menu from "../../Components/Menu";
import Sidebar from "../../Components/Sidebar";
import DividerBox from "../../Components/DividerBox";
import Searchbar from "../../Components/Searchbar";
import VehicleCard from "../../Components/VehicleCard";
import { MapContainer, MenuContainer, NavContainer, SideBarContainer, StyledDiv, VehiclesCardsContainer } from "./style";
import "../../i18n/config";
import { useTranslation } from "react-i18next"
import Vehicle from "../../interfaces/Vehicle";
import Map from "../../Components/Map";
import { AuthContext } from "../../Contexts/AuthContext";
import getVehicles from "../../services/getVehicles";
import getClients from "../../services/getClients";
import getAddress, { AddressRequestParams } from "../../services/getAddress";
import { Address } from "../../interfaces/Address";
import Client from "../../interfaces/Client";
import { FormatedVehicle } from "../../interfaces/FormatedVehicle";


export default function Home() {
  const { t } = useTranslation();
  const {authTokens} = useContext(AuthContext);
  const [resizeMap, setResizeMap] = useState(false);
  const [searchValue, setSearchValue ] = useState("");
  const [vehicles, setVehicles] = useState<FormatedVehicle[] | []>(
    [
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:32",
          "direction": 143,
          "ativo": {
              "color": "",
              "plate": "FPR-8428",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 9336881,
              "description": "01316",
              "consume": 0,
              "producer": "",
              "ativo_name": "01316",
              "odometer": 49288923
          },
          "validate": 1,
          "lat_lng": [
              -23.220585,
              -46.87997
          ],
          "ativo_id": 208635,
          "client_id": 86155,
          "speed": {
              "val": 58,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Vila Maringá, Jundiaí - SP, 13210-811, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:45:27",
          "direction": 0,
          "ativo": {
              "color": "BRANCO",
              "plate": "FAB-5809",
              "fuel": "3",
              "model": "9.160 / MARCOPOLO SENIOR ON",
              "type": 4,
              "horimeter": 36809582,
              "description": "01296",
              "consume": 0,
              "producer": "Volkswagem",
              "ativo_name": "01296",
              "odometer": 246462396
          },
          "validate": 1,
          "lat_lng": [
              -23.141113,
              -46.917012
          ],
          "ativo_id": 208641,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-040, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:47",
          "direction": 146,
          "ativo": {
              "color": "",
              "plate": "ESU5C53",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 7099650,
              "description": "08726",
              "consume": 0,
              "producer": "",
              "ativo_name": "08726",
              "odometer": 39251706
          },
          "validate": 1,
          "lat_lng": [
              -23.191497,
              -46.875549
          ],
          "ativo_id": 208646,
          "client_id": 86155,
          "speed": {
              "val": 32,
              "unit_measurement": "km/h"
          },
          "address": "Centro, Jundiaí - SP, 13201-017, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:58:53",
          "direction": 0,
          "ativo": {
              "color": "BRANCO",
              "plate": "FQF-3929",
              "fuel": "3",
              "model": "9.160 / MARCOPOLO SENIOR ON",
              "type": 4,
              "horimeter": 21975653,
              "description": "1356",
              "consume": 0,
              "producer": "Volkswagem",
              "ativo_name": "1356",
              "odometer": 251642397
          },
          "validate": 1,
          "lat_lng": [
              -23.346265,
              -46.743874
          ],
          "ativo_id": 208648,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Taubaté, 142, Serpa, Caieiras - SP, 07716-045, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:02:20",
          "direction": 0,
          "ativo": {
              "color": "BRANCO",
              "plate": "FSG-1858",
              "fuel": "3",
              "model": "17.230 / COMIL CAMPIONE R",
              "type": 4,
              "horimeter": 52231704,
              "description": "10836",
              "consume": 0,
              "producer": "Volkswagem",
              "ativo_name": "10836 ",
              "odometer": 1011296384
          },
          "validate": 1,
          "lat_lng": [
              -22.556809,
              -47.369497
          ],
          "ativo_id": 218767,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:30",
          "direction": 348,
          "ativo": {
              "color": "BRANCO",
              "plate": "FCA-2379 ",
              "fuel": "3",
              "model": "17.230 / COMIL CAMPIONE R",
              "type": 4,
              "horimeter": 0,
              "description": "10846",
              "consume": 0,
              "producer": "Volkswagem",
              "ativo_name": "10846",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.680295,
              -47.292644
          ],
          "ativo_id": 221826,
          "client_id": 87222,
          "speed": {
              "val": 18,
              "unit_measurement": "km/h"
          },
          "address": "Limeira - SP, 13480-070, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:32",
          "direction": 299,
          "ativo": {
              "color": "BRANCO",
              "plate": "GHQ-3228",
              "fuel": "3",
              "model": "17.230 / MARCOPOLO IDEALE R",
              "type": 4,
              "horimeter": 47526194,
              "description": "10816",
              "consume": 0,
              "producer": "Volkswagem",
              "ativo_name": "10816",
              "odometer": 738741738
          },
          "validate": 1,
          "lat_lng": [
              -22.679995,
              -47.295129
          ],
          "ativo_id": 221841,
          "client_id": 87222,
          "speed": {
              "val": 42,
              "unit_measurement": "km/h"
          },
          "address": "Limeira - SP, 13480-070, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:35:14",
          "direction": 0,
          "ativo": {
              "color": "BRANCO",
              "plate": " GAQ-9768  ",
              "fuel": "3",
              "model": "17.230 / CAIO SOLAR",
              "type": 4,
              "horimeter": 0,
              "description": "10136 ",
              "consume": 0,
              "producer": "Volkswagem",
              "ativo_name": "10136 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.602139,
              -47.425984
          ],
          "ativo_id": 222169,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Cento e Dezoito, 316A, Jardim Manacá, Limeira - SP, 13481-869, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:28",
          "direction": 293,
          "ativo": {
              "color": "",
              "plate": "FEI-1665",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 5488006,
              "description": "09266",
              "consume": 0,
              "producer": "",
              "ativo_name": "09266",
              "odometer": 32303906
          },
          "validate": 1,
          "lat_lng": [
              -22.599024,
              -47.437234
          ],
          "ativo_id": 236399,
          "client_id": 87222,
          "speed": {
              "val": 39,
              "unit_measurement": "km/h"
          },
          "address": "Rua Amélio Pelizari, Jardim Jequitibás, Limeira - SP, 13482-337, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:58:37",
          "direction": 0,
          "ativo": {
              "color": "BRANCO",
              "plate": " FRZ-4784 ",
              "fuel": "3",
              "model": "415 / SPRINTER",
              "type": 4,
              "horimeter": 0,
              "description": "1096",
              "consume": 0,
              "producer": "Mercedes Benz",
              "ativo_name": "1096 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.557097,
              -47.369501
          ],
          "ativo_id": 237143,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:48:46",
          "direction": 256,
          "ativo": {
              "color": "",
              "plate": "FVZ-0304",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01516",
              "consume": 0,
              "producer": "",
              "ativo_name": "01516",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.073327,
              -46.693062
          ],
          "ativo_id": 245247,
          "client_id": 92460,
          "speed": {
              "val": 62,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Edgar Máximo Zambotto, Jarinu - SP, 13240-000, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:42",
          "direction": 211,
          "ativo": {
              "color": "BRANCO",
              "plate": "FEJ-4499",
              "fuel": "3",
              "model": "17.230 / COMIL CAMPIONE 3.25",
              "type": 4,
              "horimeter": 0,
              "description": "10716",
              "consume": 0,
              "producer": "Volkswagem",
              "ativo_name": "10716",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.228581,
              -46.874574
          ],
          "ativo_id": 269752,
          "client_id": 86155,
          "speed": {
              "val": 4,
              "unit_measurement": "km/h"
          },
          "address": "53, Vila Maringá, Jundiaí - SP, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:23",
          "direction": 140,
          "ativo": {
              "color": "BRANCO",
              "plate": "GCE-7335",
              "fuel": "3",
              "model": "OF 1722 / MARCOPOLO IDEALE R",
              "type": 4,
              "horimeter": 0,
              "description": "10876",
              "consume": 0,
              "producer": "Volkswagem",
              "ativo_name": "10876",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.246511,
              -46.855983
          ],
          "ativo_id": 270395,
          "client_id": 86155,
          "speed": {
              "val": 15,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Victório Baradel, 365, Jardim Santa Gertrudes, Jundiaí - SP, 13205-260, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:58:49",
          "direction": 197,
          "ativo": {
              "color": "",
              "plate": "GHP-8360",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01306",
              "consume": 0,
              "producer": "",
              "ativo_name": "01306",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.101521,
              -46.721625
          ],
          "ativo_id": 271868,
          "client_id": 92460,
          "speed": {
              "val": 62,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Edgar Máximo Zambotto, Jarinu - SP, 13240-000, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:37:43",
          "direction": 0,
          "ativo": {
              "color": "BRANCA",
              "plate": "   FQL4B91",
              "fuel": "3",
              "model": "O500 RS / IRIZAR PB I6",
              "type": 4,
              "horimeter": 0,
              "description": "09346 ",
              "consume": 0,
              "producer": "Mercedes Benz",
              "ativo_name": "09346 ",
              "odometer": 323633300
          },
          "validate": 1,
          "lat_lng": [
              -23.142062,
              -46.917686
          ],
          "ativo_id": 301233,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Cecap, Jundiaí - SP, 13214-730, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:36",
          "direction": 144,
          "ativo": {
              "color": "",
              "plate": "FYQ-2079",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01416",
              "consume": 0,
              "producer": "",
              "ativo_name": "01416",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.168615,
              -46.904741
          ],
          "ativo_id": 303170,
          "client_id": 86155,
          "speed": {
              "val": 49,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, Hortolândia, Jundiaí - SP, 13214-040, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:39",
          "direction": 165,
          "ativo": {
              "color": "",
              "plate": "EQN-4540",
              "fuel": "",
              "model": "",
              "type": 2,
              "horimeter": 0,
              "description": "00064",
              "consume": 0,
              "producer": "",
              "ativo_name": "00064",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.260656,
              -46.866509
          ],
          "ativo_id": 303357,
          "client_id": 86155,
          "speed": {
              "val": 90,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Jundiaí - SP, 07750-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:59:52",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "CSK-2662 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10256 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "10256 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.556624,
              -47.368872
          ],
          "ativo_id": 311908,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Jardim Nova Limeira, Limeira - SP, 13486-850, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:47:20",
          "direction": 244,
          "ativo": {
              "color": "",
              "plate": "GFR-8547",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10686",
              "consume": 0,
              "producer": "",
              "ativo_name": "10686",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.145744,
              -46.708042
          ],
          "ativo_id": 312029,
          "client_id": 92460,
          "speed": {
              "val": 37,
              "unit_measurement": "km/h"
          },
          "address": "Estrada Municipal Atílio Squizato, Jarinu - SP, 13240-000, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:02:02",
          "direction": 123,
          "ativo": {
              "color": "",
              "plate": " EFO-9261",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08976",
              "consume": 0,
              "producer": "",
              "ativo_name": "08976",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.210772,
              -46.892445
          ],
          "ativo_id": 314186,
          "client_id": 86155,
          "speed": {
              "val": 88,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Vila Maringá, Jundiaí - SP, 13213-055, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:51:10",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GHQ-4489",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01396",
              "consume": 0,
              "producer": "",
              "ativo_name": "01396",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.14599,
              -46.991417
          ],
          "ativo_id": 314695,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Profa. Lorena Elizabeth P., 159, Novo Horizonte, Jundiaí - SP, 13212-544, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:00:48",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GJP-6336",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01476",
              "consume": 0,
              "producer": "",
              "ativo_name": "01476",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.136696,
              -47.076961
          ],
          "ativo_id": 314868,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Alfredo Domingos Rotondo, Itupeva - SP, 13295-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:43:31",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "PQP-2406",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01546",
              "consume": 0,
              "producer": "",
              "ativo_name": "01546",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141578,
              -46.916943
          ],
          "ativo_id": 315204,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Cecap, Jundiaí - SP, 13214-730, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:33",
          "direction": 126,
          "ativo": {
              "color": "",
              "plate": "GYS-6686",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10786",
              "consume": 0,
              "producer": "",
              "ativo_name": "10786",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.446605,
              -47.545529
          ],
          "ativo_id": 316233,
          "client_id": 87222,
          "speed": {
              "val": 21,
              "unit_measurement": "km/h"
          },
          "address": "Rua Um, Santa Gertrudes - SP, 13510-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "21/02/2024 14:52:46",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "CSK-2743",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10026",
              "consume": 0,
              "producer": "",
              "ativo_name": "10026",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.897778,
              -47.171919
          ],
          "ativo_id": 324520,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Espetinho do Tio Ze, Rua Vergílio Pompeu de Camargo, 389, Jardim Santa Izabel, Hortolândia - SP, 13185-210, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "20/02/2024 09:38:48",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " CSK-2733",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09876",
              "consume": 0,
              "producer": "",
              "ativo_name": "09876",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.897797,
              -47.172044
          ],
          "ativo_id": 327106,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Vergílio Pompeu de Camargo, 617, Jardim Santa Izabel, Hortolândia - SP, 13185-210, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:56:57",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "PQS-3906",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10966",
              "consume": 0,
              "producer": "",
              "ativo_name": "10966",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141344,
              -46.917318
          ],
          "ativo_id": 329343,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, 3115, Cecap, Jundiaí - SP, 13214-788, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:41",
          "direction": 216,
          "ativo": {
              "color": "",
              "plate": "ESU-5952",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09116",
              "consume": 0,
              "producer": "",
              "ativo_name": "09116",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.592397,
              -47.515249
          ],
          "ativo_id": 330697,
          "client_id": 87222,
          "speed": {
              "val": 11,
              "unit_measurement": "km/h"
          },
          "address": "Iracemápolis - SP, 13495-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:59:20",
          "direction": 344,
          "ativo": {
              "color": "",
              "plate": "  EKU-8488 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01646  ",
              "consume": 0,
              "producer": "",
              "ativo_name": "01646  ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.315529,
              -46.823661
          ],
          "ativo_id": 331016,
          "client_id": 86155,
          "speed": {
              "val": 77,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia dos Bandeirantes, Cajamar - SP, 07750-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:36:26",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FTV-9703  B",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09356",
              "consume": 0,
              "producer": "",
              "ativo_name": "09356",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.682254,
              -47.302271
          ],
          "ativo_id": 335919,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Agropalma, Limeira - SP, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 08:33:16",
          "direction": 285,
          "ativo": {
              "color": "",
              "plate": "FPL-4558 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01526 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "01526 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.162599,
              -47.01596
          ],
          "ativo_id": 336663,
          "client_id": 86155,
          "speed": {
              "val": 44,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vice-Prefeito Hermenegildo Tonolli, Novo Horizonte, Jundiaí - SP, 13213-086, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:38:19",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FXC-9399",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01366",
              "consume": 0,
              "producer": "",
              "ativo_name": "01366",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.148925,
              -46.844899
          ],
          "ativo_id": 336670,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Humberto Cereser, 3793, Jundiaí - SP, 13218-711, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:30",
          "direction": 119,
          "ativo": {
              "color": "",
              "plate": "GDD-0588",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10746",
              "consume": 0,
              "producer": "",
              "ativo_name": "10746",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.323945,
              -46.846295
          ],
          "ativo_id": 341810,
          "client_id": 86155,
          "speed": {
              "val": 86,
              "unit_measurement": "km/h"
          },
          "address": "Via Anhanguera, Cajamar - SP, 07750-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:43",
          "direction": 163,
          "ativo": {
              "color": "",
              "plate": "BSZ-7527",
              "fuel": "",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "01676",
              "consume": 0,
              "producer": "",
              "ativo_name": "01676",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.610134,
              -47.411986
          ],
          "ativo_id": 346278,
          "client_id": 87222,
          "speed": {
              "val": 36,
              "unit_measurement": "km/h"
          },
          "address": "Rua Oito de Março, Jardim Res Ernesto Kuhl, Limeira - SP, 13481-819, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:36",
          "direction": 33,
          "ativo": {
              "color": "",
              "plate": "EUP-3910",
              "fuel": "",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "01686",
              "consume": 0,
              "producer": "",
              "ativo_name": "01686",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.544149,
              -47.404668
          ],
          "ativo_id": 346279,
          "client_id": 87222,
          "speed": {
              "val": 40,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Engenheiro Antônio Eugenio Lucato, Parque Res Anavec, Limeira - SP, 13485-003, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:59:40",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJX-8823",
              "fuel": "",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "01656",
              "consume": 0,
              "producer": "",
              "ativo_name": "01656",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.557058,
              -47.369475
          ],
          "ativo_id": 346281,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:30",
          "direction": 334,
          "ativo": {
              "color": "",
              "plate": "FVY-2275",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01666",
              "consume": 0,
              "producer": "",
              "ativo_name": "01666",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.602477,
              -47.415972
          ],
          "ativo_id": 346378,
          "client_id": 87222,
          "speed": {
              "val": 34,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Doutor Antônio de Luna, 405, Parque Residencial Aeroporto, Limeira - SP, 13481-500, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:49:09",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EXJ-6738",
              "fuel": "1",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "11046",
              "consume": 0,
              "producer": "",
              "ativo_name": "11046",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141804,
              -46.917647
          ],
          "ativo_id": 347257,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Nelson Martinho, Cecap, Jundiaí - SP, 13214-718, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:29",
          "direction": 328,
          "ativo": {
              "color": "",
              "plate": "DFT-7E04",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11196",
              "consume": 0,
              "producer": "",
              "ativo_name": "11196",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.142547,
              -46.915618
          ],
          "ativo_id": 351345,
          "client_id": 86155,
          "speed": {
              "val": 57,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-765, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:37:13",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "PQP-2736",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01596",
              "consume": 0,
              "producer": "",
              "ativo_name": "01596",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141177,
              -46.917019
          ],
          "ativo_id": 368876,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-040, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:45",
          "direction": 311,
          "ativo": {
              "color": "",
              "plate": "PQS-3166",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10926",
              "consume": 0,
              "producer": "",
              "ativo_name": "10926",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.199499,
              -46.892302
          ],
          "ativo_id": 376284,
          "client_id": 86155,
          "speed": {
              "val": 32,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Coleta Ferraz Castro, 120, Anhangabaú, Jundiaí - SP, 13208-280, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:42:10",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " DPE-0924 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "07936 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "07936 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.172914,
              -46.919363
          ],
          "ativo_id": 376365,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Alamo Rent a Car, Retiro, Jundiaí - SP, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:25",
          "direction": 112,
          "ativo": {
              "color": "",
              "plate": "PQU-6784",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10986",
              "consume": 0,
              "producer": "",
              "ativo_name": "10986",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.247697,
              -46.854759
          ],
          "ativo_id": 377119,
          "client_id": 86155,
          "speed": {
              "val": 19,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Victório Baradel, 110, Jardim Santa Gertrudes, Jundiaí - SP, 13205-260, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:42",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "PQS-3346",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10946",
              "consume": 0,
              "producer": "",
              "ativo_name": "10946",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.14194,
              -46.917406
          ],
          "ativo_id": 377462,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Cecap, Jundiaí - SP, 13214-730, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:02:07",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GDU-6290 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10736",
              "consume": 0,
              "producer": "",
              "ativo_name": "10736",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141744,
              -46.917572
          ],
          "ativo_id": 377556,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Nelson Martinho, Cecap, Jundiaí - SP, 13214-718, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:31",
          "direction": 29,
          "ativo": {
              "color": "",
              "plate": "FUD-4773",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09496",
              "consume": 0,
              "producer": "",
              "ativo_name": "09496",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.197708,
              -46.855728
          ],
          "ativo_id": 378221,
          "client_id": 86155,
          "speed": {
              "val": 14,
              "unit_measurement": "km/h"
          },
          "address": "Rua São José dos Campos, 376, Vila Nambi, Jundiaí - SP, 13219-110, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "27/02/2024 03:23:30",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "CSK-2665",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10266",
              "consume": 0,
              "producer": "",
              "ativo_name": "10266",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141537,
              -46.917118
          ],
          "ativo_id": 378611,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, 3115, Cecap, Jundiaí - SP, 13214-788, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:38",
          "direction": 33,
          "ativo": {
              "color": "",
              "plate": "FNB-6467",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10826",
              "consume": 0,
              "producer": "",
              "ativo_name": "10826",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.185617,
              -46.960011
          ],
          "ativo_id": 384932,
          "client_id": 86155,
          "speed": {
              "val": 18,
              "unit_measurement": "km/h"
          },
          "address": "Morada da Serra, Rua Ângelo Darcio Bagne, Eloy Chaves, Jundiaí - SP, 13212-043, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:36",
          "direction": 136,
          "ativo": {
              "color": "",
              "plate": " DEN-3589",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01696",
              "consume": 0,
              "producer": "",
              "ativo_name": "01696",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.461043,
              -47.517445
          ],
          "ativo_id": 392531,
          "client_id": 87222,
          "speed": {
              "val": 18,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Conde Guillerme Prahia, Santa Gertrudes - SP, 13510-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:04",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " DST-8769",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01706",
              "consume": 0,
              "producer": "",
              "ativo_name": "01706",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.55714,
              -47.36939
          ],
          "ativo_id": 392532,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rododiesel Oficina Mecânica, Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:59:08",
          "direction": 284,
          "ativo": {
              "color": "",
              "plate": "OIM-8697",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61223",
              "consume": 0,
              "producer": "",
              "ativo_name": "61223",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.357255,
              -46.965223
          ],
          "ativo_id": 399924,
          "client_id": 157645,
          "speed": {
              "val": 38,
              "unit_measurement": "km/h"
          },
          "address": "171, Mogi Guaçu - SP, 13845-403, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:55",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "OIL5B07",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61206",
              "consume": 0,
              "producer": "",
              "ativo_name": "61206",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.489179,
              -46.980185
          ],
          "ativo_id": 401522,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Sabo Indústria e Comércio de Autopeças, Mogi Mirim - SP, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:46:41",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "ELW-3D34",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61102",
              "consume": 0,
              "producer": "",
              "ativo_name": "61102",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.44972,
              -46.98054
          ],
          "ativo_id": 401935,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 230, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "20/03/2024 16:23:17",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "ELW-3354",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61104",
              "consume": 0,
              "producer": "",
              "ativo_name": "61104",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449778,
              -46.980484
          ],
          "ativo_id": 402065,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 230, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:14",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FFJ-3789",
              "fuel": "1",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "61802",
              "consume": 0,
              "producer": "",
              "ativo_name": "61802",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449413,
              -46.980256
          ],
          "ativo_id": 402861,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 176, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:58:23",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FIW-4G99",
              "fuel": "1",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "61808",
              "consume": 0,
              "producer": "",
              "ativo_name": "61808",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449263,
              -46.979882
          ],
          "ativo_id": 403696,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 181, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:57:05",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FTK-8209",
              "fuel": "1",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "61803",
              "consume": 0,
              "producer": "",
              "ativo_name": "61803",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449847,
              -46.980604
          ],
          "ativo_id": 404277,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Jardim Maria Beatriz, Mogi Mirim - SP, 13803-029, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:56:26",
          "direction": 270,
          "ativo": {
              "color": "",
              "plate": "FYI-2958",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01276",
              "consume": 0,
              "producer": "",
              "ativo_name": "01276",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.149032,
              -47.032969
          ],
          "ativo_id": 406781,
          "client_id": 86155,
          "speed": {
              "val": 20,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Emílio Chechinatto, 3720, Itupeva - SP, 13295-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:54:29",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "  ESP-1688",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01716",
              "consume": 0,
              "producer": "",
              "ativo_name": "01716 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.142143,
              -46.917495
          ],
          "ativo_id": 408062,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Nelson Martinho, Cecap, Jundiaí - SP, 13214-718, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:25",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "OIF-7D07",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61204",
              "consume": 0,
              "producer": "",
              "ativo_name": "61204",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449744,
              -46.980849
          ],
          "ativo_id": 409393,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Padre Roque, 2931, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:41:23",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EZU-9033",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09036",
              "consume": 0,
              "producer": "",
              "ativo_name": "09036",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.281969,
              -46.734365
          ],
          "ativo_id": 412529,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Treze, 463, Francisco Morato - SP, 07991-130, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:10",
          "direction": 150,
          "ativo": {
              "color": "",
              "plate": "GGC3E57",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01746",
              "consume": 0,
              "producer": "",
              "ativo_name": "01746",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.081578,
              -46.634856
          ],
          "ativo_id": 415430,
          "client_id": 92460,
          "speed": {
              "val": 91,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Dom Pedro I, Rio Abaixo, Atibaia - SP, 12952-821, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:45",
          "direction": 34,
          "ativo": {
              "color": "",
              "plate": "FJB-1218",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01456",
              "consume": 0,
              "producer": "",
              "ativo_name": "01456",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.04047,
              -46.557577
          ],
          "ativo_id": 415679,
          "client_id": 92460,
          "speed": {
              "val": 56,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Fernão Dias, Tanque, Atibaia - SP, 12954-000, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:40:19",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FCO7C54",
              "fuel": "",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "00068",
              "consume": 0,
              "producer": "",
              "ativo_name": "00068",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.556913,
              -47.369738
          ],
          "ativo_id": 415904,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:33",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GJT-3E57",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01766",
              "consume": 0,
              "producer": "",
              "ativo_name": "01766",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.185878,
              -46.877121
          ],
          "ativo_id": 432557,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Antônio Frederico Ozanan, Ponte São João, Jundiaí - SP, 13219-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:39:57",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "DMG-2G59",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01786",
              "consume": 0,
              "producer": "",
              "ativo_name": "01786",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.142034,
              -46.917705
          ],
          "ativo_id": 436679,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Cecap, Jundiaí - SP, 13214-730, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:42:26",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "ESU4I18",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08666",
              "consume": 0,
              "producer": "",
              "ativo_name": "08666",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141712,
              -46.917695
          ],
          "ativo_id": 438667,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Nelson Martinho, Cecap, Jundiaí - SP, 13214-718, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:47:06",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " PQP-2546",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01566",
              "consume": 0,
              "producer": "",
              "ativo_name": "01566",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.557083,
              -47.369341
          ],
          "ativo_id": 445714,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rododiesel Oficina Mecânica, Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:55:40",
          "direction": 275,
          "ativo": {
              "color": "",
              "plate": "BJX6C49",
              "fuel": "",
              "model": "",
              "type": 2,
              "horimeter": 0,
              "description": "00066",
              "consume": 0,
              "producer": "",
              "ativo_name": "00066",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.579641,
              -47.401789
          ],
          "ativo_id": 445765,
          "client_id": 87222,
          "speed": {
              "val": 6,
              "unit_measurement": "km/h"
          },
          "address": "Rua Bahia, 700, Jardim Santa Lina, Limeira - SP, 13480-520, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:54:02",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "  ESU4I20  ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08616   ",
              "consume": 0,
              "producer": "",
              "ativo_name": "08616  ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -18.13288,
              -49.073102
          ],
          "ativo_id": 449310,
          "client_id": 175573,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "União Avícola, Buriti Alegre - GO, 75660-000, Brasil",
          "client": "ByBus Buriti"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:45:53",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FQL-0B88",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10866",
              "consume": 0,
              "producer": "",
              "ativo_name": "10866",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.55676,
              -47.368961
          ],
          "ativo_id": 449442,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Jardim Nova Limeira, Limeira - SP, 13486-850, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:25:25",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " BWV-3070",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11006 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11006 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.563636,
              -47.440054
          ],
          "ativo_id": 449735,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ângelo Piccin, Jardim Pérola, Limeira - SP, 13483-211, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "21/03/2024 21:30:41",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EPU-6972 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61026 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "61026 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449776,
              -46.981587
          ],
          "ativo_id": 461989,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "SP-340, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-029, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:01:32",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GEB-2499",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10726",
              "consume": 0,
              "producer": "",
              "ativo_name": "10726",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.690632,
              -47.290585
          ],
          "ativo_id": 463906,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Limeira - SP, 13480-070, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:18",
          "direction": 154,
          "ativo": {
              "color": "",
              "plate": "CPU-4927",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01726",
              "consume": 0,
              "producer": "",
              "ativo_name": "01726",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.154166,
              -46.912761
          ],
          "ativo_id": 465341,
          "client_id": 86155,
          "speed": {
              "val": 53,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-660, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:39",
          "direction": 178,
          "ativo": {
              "color": "",
              "plate": "FEI-1482",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09276",
              "consume": 0,
              "producer": "",
              "ativo_name": "09276",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.563221,
              -47.381011
          ],
          "ativo_id": 467827,
          "client_id": 87222,
          "speed": {
              "val": 59,
              "unit_measurement": "km/h"
          },
          "address": "Anel Viário, Jardim Nova Suíça, Limeira - SP, 13486-014, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:50",
          "direction": 277,
          "ativo": {
              "color": "",
              "plate": "FIG-5919",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01446",
              "consume": 0,
              "producer": "",
              "ativo_name": "01446",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.608225,
              -47.410445
          ],
          "ativo_id": 469430,
          "client_id": 87222,
          "speed": {
              "val": 28,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Inglaterra, 217, Parque Residencial Aeroporto, Limeira - SP, 13481-818, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:41:07",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FYQ-6277",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09446",
              "consume": 0,
              "producer": "",
              "ativo_name": "09446",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.524706,
              -46.576146
          ],
          "ativo_id": 470681,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Vila Maria, São Paulo - SP, 02170-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:56:17",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "PQS-3246",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10936",
              "consume": 0,
              "producer": "",
              "ativo_name": "10936 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.233979,
              -46.866566
          ],
          "ativo_id": 471387,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Studio Cb Filmes, Vila Militar, Jundiaí - SP, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:48:38",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FFW-1274 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11156 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11156 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.245056,
              -47.05237
          ],
          "ativo_id": 472178,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Guarda Municipal de Cabreúva, Cabreúva - SP, 13315-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 07:42:21",
          "direction": 77,
          "ativo": {
              "color": "",
              "plate": "CSK-2715",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10006",
              "consume": 0,
              "producer": "",
              "ativo_name": "10006",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.27874,
              -47.059295
          ],
          "ativo_id": 472665,
          "client_id": 86155,
          "speed": {
              "val": 8,
              "unit_measurement": "km/h"
          },
          "address": "Rua Uruguai, 73, Cabreúva - SP, 13315-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:09",
          "direction": 88,
          "ativo": {
              "color": "",
              "plate": "EGK-9902",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08516",
              "consume": 0,
              "producer": "",
              "ativo_name": "08516",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.131475,
              -46.971001
          ],
          "ativo_id": 472827,
          "client_id": 86155,
          "speed": {
              "val": 36,
              "unit_measurement": "km/h"
          },
          "address": "Avenida da Uva, 3369, Jundiaí - SP, 13213-235, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:24",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "PQP-2616",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01586",
              "consume": 0,
              "producer": "",
              "ativo_name": "01586",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.311183,
              -46.718585
          ],
          "ativo_id": 473155,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Tonico Lenci, Franco da Rocha - SP, 07860-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:36",
          "direction": 302,
          "ativo": {
              "color": "",
              "plate": "HGJ-2E42",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10476",
              "consume": 0,
              "producer": "",
              "ativo_name": "10476",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.557681,
              -47.429411
          ],
          "ativo_id": 475360,
          "client_id": 87222,
          "speed": {
              "val": 28,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Cônego Manoel Alves, 949, Jardim Res Morro Azul, Limeira - SP, 13484-494, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:34",
          "direction": 104,
          "ativo": {
              "color": "",
              "plate": "OWI-5017",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10656",
              "consume": 0,
              "producer": "",
              "ativo_name": "10656",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.619932,
              -47.411977
          ],
          "ativo_id": 477345,
          "client_id": 87222,
          "speed": {
              "val": 21,
              "unit_measurement": "km/h"
          },
          "address": "Rua Geraldo de Campos, 298, Jardim Lagoa Nova, Limeira - SP, 13481-766, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:37:08",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EFO-9279",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08886",
              "consume": 0,
              "producer": "",
              "ativo_name": "08886",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.556745,
              -47.368877
          ],
          "ativo_id": 480505,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Jardim Nova Limeira, Limeira - SP, 13486-850, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:47",
          "direction": 8,
          "ativo": {
              "color": "",
              "plate": " PQP-2496",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01556",
              "consume": 0,
              "producer": "",
              "ativo_name": "01556",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.564356,
              -47.388558
          ],
          "ativo_id": 480671,
          "client_id": 87222,
          "speed": {
              "val": 11,
              "unit_measurement": "km/h"
          },
          "address": "Rua Vereador Samuel Berto, 506, Vila Camargo, Limeira - SP, 13486-075, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:41",
          "direction": 330,
          "ativo": {
              "color": "",
              "plate": " GHE2B98 ",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00073 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "00073 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.084788,
              -46.632712
          ],
          "ativo_id": 483680,
          "client_id": 92460,
          "speed": {
              "val": 114,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Dom Pedro I, Rio Abaixo, Atibaia - SP, 12952-821, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:54:26",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FMD5G24",
              "fuel": "",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "00074",
              "consume": 0,
              "producer": "",
              "ativo_name": "00074",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449811,
              -46.980991
          ],
          "ativo_id": 484692,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "SP-340, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-029, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "13/03/2024 10:07:56",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GDR-6511 ",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00041",
              "consume": 0,
              "producer": "",
              "ativo_name": "00041",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.946943,
              -47.28028
          ],
          "ativo_id": 488123,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Paschoal de Lucas, 150, Monte Mor - SP, 13190-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:29",
          "direction": 200,
          "ativo": {
              "color": "",
              "plate": "PUU-2482",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11406",
              "consume": 0,
              "producer": "",
              "ativo_name": "11406",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.607478,
              -47.421929
          ],
          "ativo_id": 488136,
          "client_id": 87222,
          "speed": {
              "val": 35,
              "unit_measurement": "km/h"
          },
          "address": "Rua Vicente Bombini, 455, Jardim Lago, Limeira - SP, 13481-620, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:07",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "PUU-8419",
              "fuel": "1",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "11416",
              "consume": 0,
              "producer": "",
              "ativo_name": "11416",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -21.579456,
              -48.375824
          ],
          "ativo_id": 488810,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Benedicta de Oliveira Santos, Matão - SP, 15996-208, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:41",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "CSK-2863",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10616",
              "consume": 0,
              "producer": "",
              "ativo_name": "10616",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.574618,
              -47.420751
          ],
          "ativo_id": 488953,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Antônio Palermo, Jardim Maria Bruschi Modeneis, Limeira - SP, 13482-300, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:30:16",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FTU-1E45",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11446",
              "consume": 0,
              "producer": "",
              "ativo_name": "11446",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.210145,
              -46.810247
          ],
          "ativo_id": 490231,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Particular, 373, Várzea Paulista - SP, 13223-025, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:01:39",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "OWI-5061",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10666",
              "consume": 0,
              "producer": "",
              "ativo_name": "10666",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.557039,
              -47.369183
          ],
          "ativo_id": 490583,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rododiesel Oficina Mecânica, Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:18",
          "direction": 280,
          "ativo": {
              "color": "",
              "plate": "CPB-3090",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11126",
              "consume": 0,
              "producer": "",
              "ativo_name": "11126",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.544233,
              -47.399217
          ],
          "ativo_id": 490610,
          "client_id": 87222,
          "speed": {
              "val": 57,
              "unit_measurement": "km/h"
          },
          "address": "Anel Viário, Parque Res Anavec, Limeira - SP, 13485-090, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:39:33",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GHG-3138",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10796",
              "consume": 0,
              "producer": "",
              "ativo_name": "10796",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141982,
              -46.917353
          ],
          "ativo_id": 491866,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Nelson Martinho, Cecap, Jundiaí - SP, 13214-718, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:39:15",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "DPL-6539",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11116",
              "consume": 0,
              "producer": "",
              "ativo_name": "11116",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.556746,
              -47.369534
          ],
          "ativo_id": 492461,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:14",
          "direction": 34,
          "ativo": {
              "color": "",
              "plate": "  PQS-3946",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10976",
              "consume": 0,
              "producer": "",
              "ativo_name": "10976",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.207995,
              -46.862703
          ],
          "ativo_id": 492867,
          "client_id": 86155,
          "speed": {
              "val": 8,
              "unit_measurement": "km/h"
          },
          "address": "Rua Itanhaém, 30, Agapeama, Jundiaí - SP, 13203-423, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:03:50",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EHB-0498",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11136",
              "consume": 0,
              "producer": "",
              "ativo_name": "11136",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.681183,
              -47.292581
          ],
          "ativo_id": 493120,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Ajinomoto do Brasil, Limeira - SP, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:31:37",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FRU-4544 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "1116 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "1116 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.727537,
              -47.327008
          ],
          "ativo_id": 493323,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua 7, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:31",
          "direction": 78,
          "ativo": {
              "color": "",
              "plate": "HFD6F96",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11266",
              "consume": 0,
              "producer": "",
              "ativo_name": "11266",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.177467,
              -46.897217
          ],
          "ativo_id": 496442,
          "client_id": 86155,
          "speed": {
              "val": 39,
              "unit_measurement": "km/h"
          },
          "address": "Vila Municipal, Jundiaí - SP, 13201-140, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:50:57",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " FEI-1477",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09296",
              "consume": 0,
              "producer": "",
              "ativo_name": "09296",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141816,
              -46.917306
          ],
          "ativo_id": 496504,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Cecap, Jundiaí - SP, 13214-730, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:52:46",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FFW-1283 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11146 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11146 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.184676,
              -46.904525
          ],
          "ativo_id": 496744,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Retiro, Jundiaí - SP, 13209-770, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:42",
          "direction": 178,
          "ativo": {
              "color": "",
              "plate": "EZU-8985",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08956",
              "consume": 0,
              "producer": "",
              "ativo_name": "08956",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141722,
              -46.916468
          ],
          "ativo_id": 499162,
          "client_id": 86155,
          "speed": {
              "val": 6,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-788, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:46:57",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " GAV-6A97 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11506 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11506 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.065115,
              -46.684361
          ],
          "ativo_id": 499433,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Edgar Máximo Zambotto, Ponte Alta, Atibaia - SP, 12952-817, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:38:52",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GBI6J26",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00076",
              "consume": 0,
              "producer": "",
              "ativo_name": "00076",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.557094,
              -47.369767
          ],
          "ativo_id": 499945,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:24",
          "direction": 346,
          "ativo": {
              "color": "",
              "plate": " FEI-1664 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "9236 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "9236 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.566689,
              -47.415662
          ],
          "ativo_id": 500358,
          "client_id": 87222,
          "speed": {
              "val": 19,
              "unit_measurement": "km/h"
          },
          "address": "Via Antônio Cruanes Filho, Vila Santa Joséfa, Limeira - SP, 13480-672, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:48",
          "direction": 12,
          "ativo": {
              "color": "",
              "plate": "CSK-2I57",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10626",
              "consume": 0,
              "producer": "",
              "ativo_name": "10626",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.622114,
              -47.426999
          ],
          "ativo_id": 500442,
          "client_id": 87222,
          "speed": {
              "val": 20,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Doutor Lauro Corrêa da Silva, Residencial Interlagos, Limeira - SP, 13482-896, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:53:23",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "CSK-2861",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10586",
              "consume": 0,
              "producer": "",
              "ativo_name": "10586",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.619147,
              -47.410268
          ],
          "ativo_id": 500683,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Carlos Gugelmo Júnior, 335, Jardim Lagoa Nova, Limeira - SP, 13481-774, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:45:41",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " CSK2I60",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10576",
              "consume": 0,
              "producer": "",
              "ativo_name": "10576",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.556664,
              -47.369503
          ],
          "ativo_id": 500910,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:36:17",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "CSK2I56",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10606",
              "consume": 0,
              "producer": "",
              "ativo_name": "10606",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.628936,
              -47.43428
          ],
          "ativo_id": 501489,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Valentim Pascotto, Residencial Palmeira Real, Limeira - SP, 13481-456, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:59:10",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "HJI-0330 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "9776",
              "consume": 0,
              "producer": "",
              "ativo_name": "9776 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -21.585406,
              -48.359389
          ],
          "ativo_id": 503292,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Via Ruggero Baldan, 273, Matão - SP, 15997-410, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:01:45",
          "direction": 51,
          "ativo": {
              "color": "",
              "plate": "CUH-6A90",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11456",
              "consume": 0,
              "producer": "",
              "ativo_name": "11456",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.997001,
              -46.516024
          ],
          "ativo_id": 503850,
          "client_id": 92460,
          "speed": {
              "val": 63,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Fernão Dias, Taboão, Bragança Paulista - SP, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:01:30",
          "direction": 263,
          "ativo": {
              "color": "",
              "plate": "EOF-6315",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10896",
              "consume": 0,
              "producer": "",
              "ativo_name": "10896",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.185976,
              -46.933307
          ],
          "ativo_id": 504803,
          "client_id": 86155,
          "speed": {
              "val": 55,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Marginal, 1423, Aeroporto, Jundiaí - SP, 13215-085, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:01:14",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "ECU-3458",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11036",
              "consume": 0,
              "producer": "",
              "ativo_name": "11036",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.556546,
              -47.369132
          ],
          "ativo_id": 505615,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Jardim Nova Limeira, Limeira - SP, 13486-850, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:32",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EPU-4945 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61024 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "61024 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.14159,
              -46.917167
          ],
          "ativo_id": 509966,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, 3115, Cecap, Jundiaí - SP, 13214-788, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:42:57",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " HJI-0328",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09706",
              "consume": 0,
              "producer": "",
              "ativo_name": "09706",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.459799,
              -47.452478
          ],
          "ativo_id": 516257,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida do Barro Preto, Cordeirópolis - SP, 13490-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:27",
          "direction": 1,
          "ativo": {
              "color": "",
              "plate": " FRW-7869 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11256 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11256 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.452425,
              -46.980072
          ],
          "ativo_id": 522247,
          "client_id": 157645,
          "speed": {
              "val": 20,
              "unit_measurement": "km/h"
          },
          "address": "Rua Antônio Guerreiro Perez, 500, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-010, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:01:33",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FTI-1838 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11226 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11226 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449536,
              -46.980583
          ],
          "ativo_id": 522249,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 220, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:44",
          "direction": 140,
          "ativo": {
              "color": "",
              "plate": "   HFD6F92",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11376 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11376 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.17929,
              -46.885778
          ],
          "ativo_id": 522960,
          "client_id": 86155,
          "speed": {
              "val": 1,
              "unit_measurement": "km/h"
          },
          "address": "Avenida União dos Ferroviários, 234, Centro, Jundiaí - SP, 13201-160, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:51:55",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FKP-5B26",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01736",
              "consume": 0,
              "producer": "",
              "ativo_name": "01736",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.142064,
              -46.917596
          ],
          "ativo_id": 526377,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Cecap, Jundiaí - SP, 13214-730, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:38:32",
          "direction": 222,
          "ativo": {
              "color": "",
              "plate": "FYT1B35",
              "fuel": "",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "00078",
              "consume": 0,
              "producer": "",
              "ativo_name": "00078",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.556912,
              -47.369571
          ],
          "ativo_id": 528612,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:48:19",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " GYS-6907",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61111 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "61111 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.151189,
              -47.004663
          ],
          "ativo_id": 530148,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua João Aparecido Fernandes dos Santos, Novo Horizonte, Jundiaí - SP, 13213-118, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:33",
          "direction": 47,
          "ativo": {
              "color": "",
              "plate": "HJI-0325",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09726",
              "consume": 0,
              "producer": "",
              "ativo_name": "09726",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.56044,
              -47.374307
          ],
          "ativo_id": 536581,
          "client_id": 87222,
          "speed": {
              "val": 29,
              "unit_measurement": "km/h"
          },
          "address": "Rua General Rondon, Vila Labaki, Limeira - SP, 13486-442, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:19",
          "direction": 22,
          "ativo": {
              "color": "",
              "plate": "  EMD8H59",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "52005",
              "consume": 0,
              "producer": "",
              "ativo_name": "52005",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.081324,
              -47.223315
          ],
          "ativo_id": 536715,
          "client_id": 202880,
          "speed": {
              "val": 40,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Engenheiro Fábio Roberto Barnabé, 1169, Indaiatuba - SP, 13330-315, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:42:50",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " BSZ5B49",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "52007",
              "consume": 0,
              "producer": "",
              "ativo_name": "52007",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.121898,
              -47.244993
          ],
          "ativo_id": 536718,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua José de Campos, 1152, Indaiatuba - SP, 13348-373, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:01:55",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GFE-8069\t",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51804",
              "consume": 0,
              "producer": "",
              "ativo_name": "51804",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.117618,
              -47.241291
          ],
          "ativo_id": 536720,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua João de Campos Bueno, 651, Indaiatuba - SP, 13348-463, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:25",
          "direction": 152,
          "ativo": {
              "color": "",
              "plate": "FDP-1F78",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "52109",
              "consume": 0,
              "producer": "",
              "ativo_name": "52109",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141121,
              -46.916553
          ],
          "ativo_id": 536892,
          "client_id": 86155,
          "speed": {
              "val": 33,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Marginal, 101, Cecap, Jundiaí - SP, 13214-765, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:51:56",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EYC0H91",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "52106",
              "consume": 0,
              "producer": "",
              "ativo_name": "52106",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.277573,
              -46.75587
          ],
          "ativo_id": 537714,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Joaquim Nabuco, 104, Francisco Morato - SP, 07916-100, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:49:32",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EEB-8H69",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 16740,
              "description": "52102",
              "consume": 0,
              "producer": "",
              "ativo_name": "52102",
              "odometer": 99981
          },
          "validate": 1,
          "lat_lng": [
              -23.291967,
              -46.732611
          ],
          "ativo_id": 537990,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Atlanta, 29, Francisco Morato - SP, 07995-030, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:56:36",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "MEU-4C48",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "52107",
              "consume": 0,
              "producer": "",
              "ativo_name": "52107 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.252672,
              -46.741479
          ],
          "ativo_id": 538029,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Trinta e Quatro, 12, Francisco Morato - SP, 07950-090, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:38:52",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GCY2F39",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "52103",
              "consume": 0,
              "producer": "",
              "ativo_name": "52103",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.09902,
              -47.237653
          ],
          "ativo_id": 541044,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Domingos Ferrarezzi, 721, Indaiatuba - SP, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:55:05",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "CUB-9713",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00921",
              "consume": 0,
              "producer": "",
              "ativo_name": "00921",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.163908,
              -47.275193
          ],
          "ativo_id": 541414,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Altena, 281, Distrito Industrial, Salto - SP, 13329-610, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:01:00",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "CUB-9712",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00919",
              "consume": 0,
              "producer": "",
              "ativo_name": "00919",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.143643,
              -47.235942
          ],
          "ativo_id": 541540,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Esmeralda Martini Paula, 312, Indaiatuba - SP, 13347-636, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:15",
          "direction": 200,
          "ativo": {
              "color": "",
              "plate": "FJT-7D07",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "52105",
              "consume": 0,
              "producer": "",
              "ativo_name": "52105",
              "odometer": 1724000
          },
          "validate": 1,
          "lat_lng": [
              -22.403465,
              -46.95047
          ],
          "ativo_id": 543316,
          "client_id": 157645,
          "speed": {
              "val": 40,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Deputado Nagib Chaib, Jardim Copacabana, Mogi Mirim - SP, 13807-735, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:22",
          "direction": 338,
          "ativo": {
              "color": "",
              "plate": "ELJ8C69",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "52104",
              "consume": 0,
              "producer": "",
              "ativo_name": "52104",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.459323,
              -46.979689
          ],
          "ativo_id": 543765,
          "client_id": 157645,
          "speed": {
              "val": 15,
              "unit_measurement": "km/h"
          },
          "address": "Rua Antônio Guerreiro Perez, 1187, Jardim Maria Bonati Bordignon, Mogi Mirim - SP, 13803-010, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:37:47",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GCN9B74 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01796 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "01796 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.170102,
              -46.886798
          ],
          "ativo_id": 545339,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Raul Pompéia, 348, Vila Rio Branco, Jundiaí - SP, 13215-420, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:25",
          "direction": 349,
          "ativo": {
              "color": "",
              "plate": "GDS-4949",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51805",
              "consume": 0,
              "producer": "",
              "ativo_name": "51805",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.143029,
              -47.235768
          ],
          "ativo_id": 545809,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Esmeralda Martini Paula, 347, Indaiatuba - SP, 13347-636, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:01:52",
          "direction": 12,
          "ativo": {
              "color": "",
              "plate": "FSE8A04",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11686",
              "consume": 0,
              "producer": "",
              "ativo_name": "11686",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.220331,
              -46.859688
          ],
          "ativo_id": 546246,
          "client_id": 86155,
          "speed": {
              "val": 45,
              "unit_measurement": "km/h"
          },
          "address": "Rua Filomena Ricci, 580, Jardim do Lago, Jundiaí - SP, 13203-700, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:20",
          "direction": 304,
          "ativo": {
              "color": "",
              "plate": "GDW4G38",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11566",
              "consume": 0,
              "producer": "",
              "ativo_name": "11566",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.140961,
              -46.917193
          ],
          "ativo_id": 546377,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-040, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:24",
          "direction": 21,
          "ativo": {
              "color": "",
              "plate": "FEI1E81 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "9256 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "9256 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.543938,
              -47.416561
          ],
          "ativo_id": 547508,
          "client_id": 87222,
          "speed": {
              "val": 20,
              "unit_measurement": "km/h"
          },
          "address": "Avenida José Polato, 336, Jardim Laranjeiras, Limeira - SP, 13484-135, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "23/03/2024 09:13:23",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "CSK-2714",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09966",
              "consume": 0,
              "producer": "",
              "ativo_name": "09966",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.460093,
              -46.439308
          ],
          "ativo_id": 547618,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Meca, 98, Pimentas, Guarulhos - SP, 07210-110, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:24",
          "direction": 346,
          "ativo": {
              "color": "",
              "plate": "PUU2E67",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11236",
              "consume": 0,
              "producer": "",
              "ativo_name": "11236",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.68028,
              -47.292644
          ],
          "ativo_id": 547636,
          "client_id": 87222,
          "speed": {
              "val": 19,
              "unit_measurement": "km/h"
          },
          "address": "Limeira - SP, 13480-070, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:58:15",
          "direction": 74,
          "ativo": {
              "color": "",
              "plate": "GHQ0F87",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11626",
              "consume": 0,
              "producer": "",
              "ativo_name": "11626",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.58539,
              -47.437975
          ],
          "ativo_id": 548058,
          "client_id": 87222,
          "speed": {
              "val": 25,
              "unit_measurement": "km/h"
          },
          "address": "Rua Guilherme Dibbern, Res San Martino, Limeira - SP, 13482-217, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:00:24",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "CSK-2712",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09896",
              "consume": 0,
              "producer": "",
              "ativo_name": "09896",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.556395,
              -47.369139
          ],
          "ativo_id": 548100,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Jardim Nova Limeira, Limeira - SP, 13486-850, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:18",
          "direction": 5,
          "ativo": {
              "color": "",
              "plate": " CSK2H52 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10306",
              "consume": 0,
              "producer": "",
              "ativo_name": "10306 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.57947,
              -47.396259
          ],
          "ativo_id": 548143,
          "client_id": 87222,
          "speed": {
              "val": 31,
              "unit_measurement": "km/h"
          },
          "address": "Rua Conselheiro Cipriano de S. Oliveira, Oscar Antônio Breda, Limeira - SP, 13480-369, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:28:57",
          "direction": 92,
          "ativo": {
              "color": "",
              "plate": "GHC4A93",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11556",
              "consume": 0,
              "producer": "",
              "ativo_name": "11556",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.207136,
              -46.816159
          ],
          "ativo_id": 549145,
          "client_id": 86155,
          "speed": {
              "val": 56,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Duque de Caxias, Várzea Paulista - SP, 13223-025, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:43",
          "direction": 297,
          "ativo": {
              "color": "",
              "plate": "CUI5F18",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11646",
              "consume": 0,
              "producer": "",
              "ativo_name": "11646",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.680569,
              -47.292499
          ],
          "ativo_id": 549221,
          "client_id": 87222,
          "speed": {
              "val": 19,
              "unit_measurement": "km/h"
          },
          "address": "Ajinomoto do Brasil, Limeira - SP, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:43",
          "direction": 34,
          "ativo": {
              "color": "",
              "plate": "EQZ7F98",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11526",
              "consume": 0,
              "producer": "",
              "ativo_name": "11526",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.124759,
              -46.564635
          ],
          "ativo_id": 549271,
          "client_id": 92460,
          "speed": {
              "val": 6,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Dona Gertudes, 1010, Alvinópolis, Atibaia - SP, 12942-540, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:56:37",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "OQM-4476",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10646",
              "consume": 0,
              "producer": "",
              "ativo_name": "10646",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.556701,
              -47.369726
          ],
          "ativo_id": 549735,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ângelo Santa Rosa, 235, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:21:31",
          "direction": 155,
          "ativo": {
              "color": "",
              "plate": "  GXM-9185 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51111",
              "consume": 0,
              "producer": "",
              "ativo_name": "51111",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.184526,
              -46.904343
          ],
          "ativo_id": 551350,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Luís Gonzaga M. Guimarães, Retiro, Jundiaí - SP, 13209-770, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:00:55",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GHR8E07",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11596",
              "consume": 0,
              "producer": "",
              "ativo_name": "11596",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.065208,
              -46.684417
          ],
          "ativo_id": 551618,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Edgar Máximo Zambotto, Ponte Alta, Atibaia - SP, 12952-817, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:47",
          "direction": 247,
          "ativo": {
              "color": "",
              "plate": "GIG6J48",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11616",
              "consume": 0,
              "producer": "",
              "ativo_name": "11616",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.115595,
              -46.564959
          ],
          "ativo_id": 551819,
          "client_id": 92460,
          "speed": {
              "val": 31,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Prof. Carlos Alberto de C. Pinto, 442, Alvinópolis, Atibaia - SP, 12942-530, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:39:56",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FPQ-2639",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01426",
              "consume": 0,
              "producer": "",
              "ativo_name": "01426",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.06478,
              -46.684185
          ],
          "ativo_id": 554610,
          "client_id": 92460,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Edgar Máximo Zambotto, Ponte Alta, Atibaia - SP, 12952-817, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:49:54",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FQJ3E95",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11786",
              "consume": 0,
              "producer": "",
              "ativo_name": "11786",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141247,
              -46.917295
          ],
          "ativo_id": 561474,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-040, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 13:31:40",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "SSR-6131",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11806",
              "consume": 0,
              "producer": "",
              "ativo_name": "11806",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.222334,
              -46.842311
          ],
          "ativo_id": 561618,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Potiguara, Várzea Paulista - SP, 13225-090, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:30",
          "direction": 161,
          "ativo": {
              "color": "",
              "plate": "FSG6E17",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11796",
              "consume": 0,
              "producer": "",
              "ativo_name": "11796",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.197285,
              -46.903777
          ],
          "ativo_id": 562026,
          "client_id": 86155,
          "speed": {
              "val": 72,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Anhangabaú, Jundiaí - SP, 13213-055, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:57:12",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FSK9E31",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11776",
              "consume": 0,
              "producer": "",
              "ativo_name": "11776",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141485,
              -46.916883
          ],
          "ativo_id": 562286,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Cecap, Jundiaí - SP, 13214-730, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:46",
          "direction": 2,
          "ativo": {
              "color": "",
              "plate": "FRW7G91",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11766",
              "consume": 0,
              "producer": "",
              "ativo_name": "11766",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.197396,
              -46.881426
          ],
          "ativo_id": 563170,
          "client_id": 86155,
          "speed": {
              "val": 30,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Doutor Odil Campos de Sáes, 193, Vianelo, Jundiaí - SP, 13202-475, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:38:55",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EZK-9875",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08506",
              "consume": 0,
              "producer": "",
              "ativo_name": "08506",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.239587,
              -46.837748
          ],
          "ativo_id": 563986,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Campo Grande, Várzea Paulista - SP, 13220-001, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:41:23",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GZM-9997",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10076",
              "consume": 0,
              "producer": "",
              "ativo_name": "10076",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.55636,
              -47.369316
          ],
          "ativo_id": 564775,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Jardim Nova Limeira, Limeira - SP, 13486-850, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:37",
          "direction": 279,
          "ativo": {
              "color": "",
              "plate": "CUI7D08",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11636",
              "consume": 0,
              "producer": "",
              "ativo_name": "11636",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.680646,
              -47.292465
          ],
          "ativo_id": 564818,
          "client_id": 87222,
          "speed": {
              "val": 18,
              "unit_measurement": "km/h"
          },
          "address": "Ajinomoto do Brasil, Limeira - SP, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:02:04",
          "direction": 256,
          "ativo": {
              "color": "",
              "plate": "HFD6F66",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11316",
              "consume": 0,
              "producer": "",
              "ativo_name": "11316",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.589041,
              -47.3832
          ],
          "ativo_id": 564980,
          "client_id": 87222,
          "speed": {
              "val": 28,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Campinas, Conjunto Res Sabiás, Limeira - SP, 13480-664, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:58:38",
          "direction": 144,
          "ativo": {
              "color": "",
              "plate": "CSK-2706",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09956",
              "consume": 0,
              "producer": "",
              "ativo_name": "09956",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.184284,
              -46.904204
          ],
          "ativo_id": 565227,
          "client_id": 87222,
          "speed": {
              "val": 24,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Luís Gonzaga M. Guimarães, Retiro, Jundiaí - SP, 13209-770, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:44:41",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " HGJ-2521",
              "fuel": "3",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10496",
              "consume": 0,
              "producer": "",
              "ativo_name": "10496",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.597285,
              -47.419455
          ],
          "ativo_id": 565939,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Hélio Guzela, Jardim Residencial Roseira, Limeira - SP, 13482-139, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:40:24",
          "direction": 332,
          "ativo": {
              "color": "",
              "plate": "CSK-2745",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09916",
              "consume": 0,
              "producer": "",
              "ativo_name": "09916",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.64009,
              -47.328641
          ],
          "ativo_id": 568850,
          "client_id": 87222,
          "speed": {
              "val": 87,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Limeira - SP, 13486-850, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:23",
          "direction": 83,
          "ativo": {
              "color": "",
              "plate": " CSK-2689",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09636",
              "consume": 0,
              "producer": "",
              "ativo_name": "09636",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.155786,
              -47.05577
          ],
          "ativo_id": 570207,
          "client_id": 86155,
          "speed": {
              "val": 25,
              "unit_measurement": "km/h"
          },
          "address": "Rua Emancipadores do Município, Itupeva - SP, 13295-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:48:49",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "DGY-7838",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11216",
              "consume": 0,
              "producer": "",
              "ativo_name": "11216",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.56353,
              -47.440179
          ],
          "ativo_id": 571816,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ângelo Piccin, Jardim Pérola, Limeira - SP, 13483-211, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:23",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " PQP-2786\t",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01606",
              "consume": 0,
              "producer": "",
              "ativo_name": "01606",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.401067,
              -46.97119
          ],
          "ativo_id": 582041,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Pedro Botesi, Jardim Silvania, Mogi Mirim - SP, 13806-635, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:37",
          "direction": 352,
          "ativo": {
              "color": "",
              "plate": "GGV5H54",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01806",
              "consume": 0,
              "producer": "",
              "ativo_name": "01806",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.371932,
              -46.937524
          ],
          "ativo_id": 583261,
          "client_id": 157645,
          "speed": {
              "val": 20,
              "unit_measurement": "km/h"
          },
          "address": "Avenida dos Trabalhadores, Mogi Guaçu - SP, 13840-190, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:51:56",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EPU4J33",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61015",
              "consume": 0,
              "producer": "",
              "ativo_name": "61015",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449771,
              -46.980817
          ],
          "ativo_id": 583389,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Padre Roque, 2931, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:40",
          "direction": 251,
          "ativo": {
              "color": "",
              "plate": "PQP-2586",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01576",
              "consume": 0,
              "producer": "",
              "ativo_name": "01576",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.558396,
              -47.387004
          ],
          "ativo_id": 583612,
          "client_id": 87222,
          "speed": {
              "val": 52,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Major José Levy Sobrinho, Jardim Piza, Limeira - SP, 13486-190, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:01:58",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FXC5J64",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01826",
              "consume": 0,
              "producer": "",
              "ativo_name": "01826",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.175633,
              -46.983812
          ],
          "ativo_id": 583614,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vice-Prefeito Hermenegildo Tonolli, Novo Horizonte, Jundiaí - SP, 13213-086, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "15/04/2023 03:09:21",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "Marca Po",
              "fuel": "1",
              "model": "",
              "type": 16,
              "horimeter": 0,
              "description": "Marca Ponto 2",
              "consume": 0,
              "producer": "",
              "ativo_name": "Marca Ponto 2",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.956719,
              -47.113179
          ],
          "ativo_id": 583775,
          "client_id": 196231,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua da Ceramica, 245, Jardim Capivari, Campinas - SP, Brasil",
          "client": "TransNetti"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:26",
          "direction": 84,
          "ativo": {
              "color": "",
              "plate": "  EZU-9061",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09026",
              "consume": 0,
              "producer": "",
              "ativo_name": "09026",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.50877,
              -46.699992
          ],
          "ativo_id": 583826,
          "client_id": 86155,
          "speed": {
              "val": 54,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Marginal Tietê, Lapa, São Paulo - SP, 05307-200, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:59:18",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "  DLW-5859 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11076 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11076 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.288941,
              -46.735144
          ],
          "ativo_id": 585440,
          "client_id": 86155,
          "speed": {
              "val": 1,
              "unit_measurement": "km/h"
          },
          "address": "Rua Geraldo Augusto Cândido, 270, Francisco Morato - SP, 07950-150, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:42:32",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " GDU-5380",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10766",
              "consume": 0,
              "producer": "",
              "ativo_name": "10766",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.234186,
              -46.866541
          ],
          "ativo_id": 585773,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Deposito Casas Bahia Jundiai, Vila Militar, Jundiaí - SP, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "13/03/2024 00:39:15",
          "direction": 94,
          "ativo": {
              "color": "",
              "plate": "  ELY-2102",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01636",
              "consume": 0,
              "producer": "",
              "ativo_name": "01636",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.43731,
              -46.934759
          ],
          "ativo_id": 591471,
          "client_id": 157645,
          "speed": {
              "val": 29,
              "unit_measurement": "km/h"
          },
          "address": "Rua José Poletini, 782, Jardim Lago, Mogi Mirim - SP, 13802-046, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:39:38",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " GYS-6691 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10236 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "10236 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.557021,
              -47.369274
          ],
          "ativo_id": 599396,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rododiesel Oficina Mecânica, Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:40:23",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " SED5I71 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11716 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11716 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141608,
              -46.91697
          ],
          "ativo_id": 599981,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Cecap, Jundiaí - SP, 13214-730, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:01",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FSE7C48 ",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01126 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "01126 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.35912,
              -46.912005
          ],
          "ativo_id": 601233,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Paula Bueno, 340, Mogi Guaçu - SP, 13841-061, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:41",
          "direction": 192,
          "ativo": {
              "color": "",
              "plate": " DVT7E02",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11206",
              "consume": 0,
              "producer": "",
              "ativo_name": "11206",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.357836,
              -47.16136
          ],
          "ativo_id": 601389,
          "client_id": 87222,
          "speed": {
              "val": 61,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Professor Zeferino Vaz, Conchal - SP, 13835-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:41",
          "direction": 288,
          "ativo": {
              "color": "",
              "plate": "HFD6G01",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11286",
              "consume": 0,
              "producer": "",
              "ativo_name": "11286",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.602,
              -47.427661
          ],
          "ativo_id": 601968,
          "client_id": 87222,
          "speed": {
              "val": 21,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ismail Sperancin, Jardim Manacá, Limeira - SP, 13481-689, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:40",
          "direction": 45,
          "ativo": {
              "color": "",
              "plate": " GIR-6939\t",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01376",
              "consume": 0,
              "producer": "",
              "ativo_name": "01376",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.556136,
              -47.381678
          ],
          "ativo_id": 601971,
          "client_id": 87222,
          "speed": {
              "val": 56,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Major José Levy Sobrinho, Chácara Boa Vista, Limeira - SP, 13486-190, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:26:47",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " GFV-8489",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "51808",
              "consume": 0,
              "producer": "",
              "ativo_name": "51808",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.347299,
              -46.921818
          ],
          "ativo_id": 602273,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ernestina Bulgarelli, 291, Mogi Guaçu - SP, 13848-361, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:38:23",
          "direction": 222,
          "ativo": {
              "color": "",
              "plate": "HJG-2450",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10546",
              "consume": 0,
              "producer": "",
              "ativo_name": "10546",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.583848,
              -47.175815
          ],
          "ativo_id": 602482,
          "client_id": 87222,
          "speed": {
              "val": 22,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Magdalena Sandeverino Grosso, 732, Artur Nogueira - SP, 13160-350, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:44:56",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " FLZ1E51 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61241 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "61241  ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.14166,
              -46.917441
          ],
          "ativo_id": 602711,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Nelson Martinho, Cecap, Jundiaí - SP, 13214-718, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:31:28",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FUF0G28",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61240",
              "consume": 0,
              "producer": "",
              "ativo_name": "61240",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.234699,
              -46.866645
          ],
          "ativo_id": 603054,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Vila Militar, Jundiaí - SP, 13206-105, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:38",
          "direction": 14,
          "ativo": {
              "color": "",
              "plate": "FBT-2568",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51319",
              "consume": 0,
              "producer": "",
              "ativo_name": "51319",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.178033,
              -47.265049
          ],
          "ativo_id": 607050,
          "client_id": 202880,
          "speed": {
              "val": 40,
              "unit_measurement": "km/h"
          },
          "address": "Rua das Nações Unidas, Jardim Panorama, Salto - SP, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:43",
          "direction": 322,
          "ativo": {
              "color": "",
              "plate": "ESU-5855",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51322",
              "consume": 0,
              "producer": "",
              "ativo_name": "51322",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.206576,
              -47.285356
          ],
          "ativo_id": 607188,
          "client_id": 202880,
          "speed": {
              "val": 32,
              "unit_measurement": "km/h"
          },
          "address": "Avenida dos Trabalhadores, 309, Jardim Marília, Salto - SP, 13323-000, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "20/03/2024 01:40:47",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "BKU-1205",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11016",
              "consume": 0,
              "producer": "",
              "ativo_name": "11016",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449856,
              -46.981753
          ],
          "ativo_id": 607368,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Jardim Maria Beatriz, Mogi Mirim - SP, 13803-029, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "28/12/2023 23:53:58",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJW-8545",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51316",
              "consume": 0,
              "producer": "",
              "ativo_name": "51316",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.200636,
              -47.287731
          ],
          "ativo_id": 607449,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua General Glicério, 567, Vila Nova, Salto - SP, 13322-070, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:38:54",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJW-8531",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51307",
              "consume": 0,
              "producer": "",
              "ativo_name": "51307",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.143259,
              -47.235807
          ],
          "ativo_id": 607512,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Esmeralda Martini Paula, 284, Indaiatuba - SP, 13347-636, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:26",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJW-8487",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51309",
              "consume": 0,
              "producer": "",
              "ativo_name": "51309",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.143618,
              -47.23615
          ],
          "ativo_id": 607632,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Esmeralda Martini Paula, 298, Indaiatuba - SP, 13347-636, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:44:21",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJW-8495",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51314",
              "consume": 0,
              "producer": "",
              "ativo_name": "51314",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.228788,
              -47.266234
          ],
          "ativo_id": 607945,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua João Leme do Prado, 833, Jardim Santa Efigênia, Salto - SP, 13323-472, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:37",
          "direction": 83,
          "ativo": {
              "color": "",
              "plate": "BFZ8B51",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51326",
              "consume": 0,
              "producer": "",
              "ativo_name": "51326",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.179388,
              -47.296957
          ],
          "ativo_id": 608073,
          "client_id": 202880,
          "speed": {
              "val": 81,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Hélio Steffen, Residencial São Gabriel, Salto - SP, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:55:29",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "ESU5I45",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51325",
              "consume": 0,
              "producer": "",
              "ativo_name": "51325",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.16376,
              -47.27512
          ],
          "ativo_id": 608209,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Altena, 281, Distrito Industrial, Salto - SP, 13329-610, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:01:17",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "ETU-2571",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51320",
              "consume": 0,
              "producer": "",
              "ativo_name": "51320",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.143346,
              -47.235739
          ],
          "ativo_id": 608907,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Esmeralda Martini Paula, 364, Indaiatuba - SP, 13347-636, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:20",
          "direction": 54,
          "ativo": {
              "color": "",
              "plate": " LSS4I71 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51303",
              "consume": 0,
              "producer": "",
              "ativo_name": "51303",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.391329,
              -47.348799
          ],
          "ativo_id": 609008,
          "client_id": 202880,
          "speed": {
              "val": 14,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Paraná, Jardim Novo Mundo, Itu - SP, 18035-590, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:02:14",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "LSS4I70",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51304",
              "consume": 0,
              "producer": "",
              "ativo_name": "51304",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.258144,
              -47.325459
          ],
          "ativo_id": 609062,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Calêndula, Fazenda Vila Real de Itu, Itu - SP, 13312-116, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:39:09",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "LMJ7G44",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51306",
              "consume": 0,
              "producer": "",
              "ativo_name": "51306",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449817,
              -46.980596
          ],
          "ativo_id": 609451,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 232, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 13:29:26",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GJH-6098",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01466",
              "consume": 0,
              "producer": "",
              "ativo_name": "01466",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.727122,
              -47.326922
          ],
          "ativo_id": 609606,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua 7, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:46",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJW-8534",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51315",
              "consume": 0,
              "producer": "",
              "ativo_name": "51315",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.179741,
              -47.265916
          ],
          "ativo_id": 609666,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Remigio Dalla Vecchia, 178, Jardim Nair Maria, Salto - SP, 13322-270, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:33",
          "direction": 221,
          "ativo": {
              "color": "",
              "plate": "  SYQ0B68 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11746 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11746 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.4715,
              -46.96865
          ],
          "ativo_id": 609840,
          "client_id": 157645,
          "speed": {
              "val": 64,
              "unit_measurement": "km/h"
          },
          "address": "Anel Viário Prefeito Jamil Bacar, Mogi Mirim - SP, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:39",
          "direction": 345,
          "ativo": {
              "color": "",
              "plate": " FUD6D86",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11756",
              "consume": 0,
              "producer": "",
              "ativo_name": "11756",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.368139,
              -46.919353
          ],
          "ativo_id": 609841,
          "client_id": 157645,
          "speed": {
              "val": 17,
              "unit_measurement": "km/h"
          },
          "address": "Estrada Policarpo Albino Canato, 686, Mogi Guaçu - SP, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "14/01/2024 13:44:09",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GFS7D66",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61235",
              "consume": 0,
              "producer": "",
              "ativo_name": "61235",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141392,
              -46.917018
          ],
          "ativo_id": 610156,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, 3115, Cecap, Jundiaí - SP, 13214-788, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:39:03",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FBT-2567",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51321",
              "consume": 0,
              "producer": "",
              "ativo_name": "51321",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.213763,
              -47.279883
          ],
          "ativo_id": 610197,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Piracicaba, 506, Jardim Marília, Salto - SP, 13323-024, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:44",
          "direction": 26,
          "ativo": {
              "color": "",
              "plate": "ESU-5854",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51323",
              "consume": 0,
              "producer": "",
              "ativo_name": "51323",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.202943,
              -47.295268
          ],
          "ativo_id": 610273,
          "client_id": 202880,
          "speed": {
              "val": 22,
              "unit_measurement": "km/h"
          },
          "address": "Rua Sete de Setembro, 261, Centro, Salto - SP, 13320-040, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:50:02",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJW-8493",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51313",
              "consume": 0,
              "producer": "",
              "ativo_name": "51313",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.1875,
              -47.276561
          ],
          "ativo_id": 610345,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua das Nações Unidas, Jardim Panorama, Salto - SP, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:25",
          "direction": 20,
          "ativo": {
              "color": "",
              "plate": "FRQ-9584",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09516",
              "consume": 0,
              "producer": "",
              "ativo_name": "09516",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.574356,
              -47.385275
          ],
          "ativo_id": 610392,
          "client_id": 87222,
          "speed": {
              "val": 39,
              "unit_measurement": "km/h"
          },
          "address": "Rua João d'Adona, 782, Jardim Nova Suíça, Limeira - SP, 13486-015, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:29",
          "direction": 23,
          "ativo": {
              "color": "",
              "plate": "EJW-8532",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51318",
              "consume": 0,
              "producer": "",
              "ativo_name": "51318",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.164191,
              -47.265325
          ],
          "ativo_id": 610634,
          "client_id": 202880,
          "speed": {
              "val": 72,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Eng. Ermênio de Oliveira Penteado, Distrito Industrial, Salto - SP, 13329-400, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:28",
          "direction": 312,
          "ativo": {
              "color": "",
              "plate": " FYM3J66",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11606",
              "consume": 0,
              "producer": "",
              "ativo_name": "11606",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.126265,
              -46.590196
          ],
          "ativo_id": 610768,
          "client_id": 92460,
          "speed": {
              "val": 36,
              "unit_measurement": "km/h"
          },
          "address": "Rua Brincos de Princesa, Caetetuba, Atibaia - SP, 12951-170, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:25:42",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJW-8524",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51317",
              "consume": 0,
              "producer": "",
              "ativo_name": "51317",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.213323,
              -47.308906
          ],
          "ativo_id": 610787,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida dos Peixes, 242, Salto de São José, Salto - SP, 13324-280, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:02:38",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "   GJL3J06",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11546",
              "consume": 0,
              "producer": "",
              "ativo_name": "11546",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.043118,
              -46.67038
          ],
          "ativo_id": 610875,
          "client_id": 92460,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Bruker do Brasil, Ponte Alta, Atibaia - SP, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:57:15",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJW-8486",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51308",
              "consume": 0,
              "producer": "",
              "ativo_name": "51308",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.163622,
              -47.274994
          ],
          "ativo_id": 611223,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Altena, 281, Distrito Industrial, Salto - SP, 13329-610, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:31",
          "direction": 329,
          "ativo": {
              "color": "",
              "plate": "ESU-5846",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51324",
              "consume": 0,
              "producer": "",
              "ativo_name": "51324",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.178792,
              -47.311611
          ],
          "ativo_id": 611333,
          "client_id": 202880,
          "speed": {
              "val": 18,
              "unit_measurement": "km/h"
          },
          "address": "Jardim São Judas Tadeu, Salto - SP, 13327-300, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:01:22",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FYA1E44",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09486",
              "consume": 0,
              "producer": "",
              "ativo_name": "09486",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.1411,
              -46.917036
          ],
          "ativo_id": 612277,
          "client_id": 92460,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-040, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:49:45",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "  GIE-8970",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10806",
              "consume": 0,
              "producer": "",
              "ativo_name": "10806",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.490866,
              -47.463018
          ],
          "ativo_id": 616184,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Paulo Sérgio Lopes da Silva, Cordeirópolis - SP, 13490-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:59:05",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJW-8489",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51310",
              "consume": 0,
              "producer": "",
              "ativo_name": "51310",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.189355,
              -47.287096
          ],
          "ativo_id": 617456,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Anselmo Duarte, 282, Jardim Primavera, Salto - SP, 13321-420, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:39:46",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " FDR-1615",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10696",
              "consume": 0,
              "producer": "",
              "ativo_name": "10696",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.459938,
              -47.452523
          ],
          "ativo_id": 617583,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida do Barro Preto, Cordeirópolis - SP, 13490-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:48",
          "direction": 308,
          "ativo": {
              "color": "",
              "plate": "EJW-8491",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51311",
              "consume": 0,
              "producer": "",
              "ativo_name": "51311",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.154015,
              -47.263857
          ],
          "ativo_id": 617804,
          "client_id": 202880,
          "speed": {
              "val": 14,
              "unit_measurement": "km/h"
          },
          "address": "Lojas Cem S.A, Distrito Industrial, Salto - SP, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:57:53",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJW-8492",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51312",
              "consume": 0,
              "producer": "",
              "ativo_name": "51312",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.179516,
              -47.261926
          ],
          "ativo_id": 617855,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Remigio Dalla Vecchia, 570, Jardim Nair Maria, Salto - SP, 13322-270, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:40",
          "direction": 106,
          "ativo": {
              "color": "",
              "plate": "DAJ-3294",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10156",
              "consume": 0,
              "producer": "",
              "ativo_name": "10156",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.453937,
              -47.525165
          ],
          "ativo_id": 619654,
          "client_id": 87222,
          "speed": {
              "val": 49,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Constantine Peruchi, Santa Gertrudes - SP, 13510-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:49",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " GGA-0126 ",
              "fuel": "",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "00080",
              "consume": 0,
              "producer": "",
              "ativo_name": "00080",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.476594,
              -47.201335
          ],
          "ativo_id": 621912,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Professor Zeferino Vaz, Engenheiro Coelho - SP, 13165-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:16",
          "direction": 76,
          "ativo": {
              "color": "",
              "plate": "PUS2D48",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11386",
              "consume": 0,
              "producer": "",
              "ativo_name": "11386",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.577671,
              -47.501339
          ],
          "ativo_id": 622851,
          "client_id": 87222,
          "speed": {
              "val": 40,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Doutor João Mendes da Silva Junior, Iracemápolis - SP, 13495-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:19:35",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "KPI7J88    ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11876",
              "consume": 0,
              "producer": "",
              "ativo_name": "11876",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.21022,
              -46.810321
          ],
          "ativo_id": 624525,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Particular, 373, Várzea Paulista - SP, 13223-025, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:59",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "LQS4C74  ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11906  ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11906  ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.329103,
              -46.71026
          ],
          "ativo_id": 625242,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Tapuias, 760, Franco da Rocha - SP, 07858-230, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:29",
          "direction": 55,
          "ativo": {
              "color": "",
              "plate": " KPI7D27",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11886",
              "consume": 0,
              "producer": "",
              "ativo_name": "11886",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.196684,
              -46.879086
          ],
          "ativo_id": 625364,
          "client_id": 86155,
          "speed": {
              "val": 37,
              "unit_measurement": "km/h"
          },
          "address": "Rua Moisés Abaid, 191, Vila Arens, Jundiaí - SP, 13202-500, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:56",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "LQS4H97",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11916",
              "consume": 0,
              "producer": "",
              "ativo_name": "11916",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.26076,
              -46.730491
          ],
          "ativo_id": 625929,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Lázaro Vicente Paranhos, 720, Francisco Morato - SP, 07952-200, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:34",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "HFD8F80",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11356",
              "consume": 0,
              "producer": "",
              "ativo_name": "11356",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.556766,
              -47.368853
          ],
          "ativo_id": 627824,
          "client_id": 87222,
          "speed": {
              "val": 2,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Jardim Nova Limeira, Limeira - SP, 13486-850, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:46:35",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "HQJ-2501",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11996",
              "consume": 0,
              "producer": "",
              "ativo_name": "11996",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.473938,
              -47.418672
          ],
          "ativo_id": 628195,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua João Peruchi, Cordeirópolis - SP, 13490-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:35:13",
          "direction": 257,
          "ativo": {
              "color": "",
              "plate": "DAJ-3325",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10176",
              "consume": 0,
              "producer": "",
              "ativo_name": "10176",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.569105,
              -47.373933
          ],
          "ativo_id": 633178,
          "client_id": 87222,
          "speed": {
              "val": 18,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Prf. Sebastião Nogueira de Lima, Parque Hippolyto, Limeira - SP, 13486-494, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:36:18",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EQU5A68",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01210",
              "consume": 0,
              "producer": "",
              "ativo_name": "01210",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.174252,
              -46.92641
          ],
          "ativo_id": 639446,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida João Antônio Meccatti, 1145, Casa Branca, Jundiaí - SP, 13211-223, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:37",
          "direction": 302,
          "ativo": {
              "color": "",
              "plate": "PUS2D78",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11396",
              "consume": 0,
              "producer": "",
              "ativo_name": "11396",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.68,
              -47.295182
          ],
          "ativo_id": 645849,
          "client_id": 87222,
          "speed": {
              "val": 41,
              "unit_measurement": "km/h"
          },
          "address": "Limeira - SP, 13480-070, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:35:51",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EQU-5088",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01225",
              "consume": 0,
              "producer": "",
              "ativo_name": "01225",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141219,
              -46.917249
          ],
          "ativo_id": 650184,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-040, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:20",
          "direction": 156,
          "ativo": {
              "color": "",
              "plate": "CSK-2751",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09856",
              "consume": 0,
              "producer": "",
              "ativo_name": "09856",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.564432,
              -47.376189
          ],
          "ativo_id": 650274,
          "client_id": 87222,
          "speed": {
              "val": 16,
              "unit_measurement": "km/h"
          },
          "address": "Rua Flaviano Elisbon, 168, Jardim Boa Esperança, Limeira - SP, 13486-466, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:39",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GXM9B84",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51110 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "51110 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141187,
              -46.917245
          ],
          "ativo_id": 653785,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-040, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:02:59",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " FZU-2779",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01406",
              "consume": 0,
              "producer": "",
              "ativo_name": "01406",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.065105,
              -46.684553
          ],
          "ativo_id": 654204,
          "client_id": 92460,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Bueno Polpas, Jarinu - SP, 13240-000, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:59:49",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FKR1E94",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11586",
              "consume": 0,
              "producer": "",
              "ativo_name": "11586",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.044174,
              -46.671306
          ],
          "ativo_id": 655391,
          "client_id": 92460,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Firma, Ponte Alta, Atibaia - SP, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:42:17",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GYW-6530",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51009",
              "consume": 0,
              "producer": "",
              "ativo_name": "51009",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.188289,
              -46.981769
          ],
          "ativo_id": 656988,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Dom Gabriel Paulino Bueno Couto, Medeiros, Jundiaí - SP, 13212-240, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:49:47",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GFQ-8360 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10706 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "10706 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.443338,
              -47.545845
          ],
          "ativo_id": 657317,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua 2 F, Vila Paulista, Rio Claro - SP, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:41",
          "direction": 26,
          "ativo": {
              "color": "",
              "plate": "HGJ2E45",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10446",
              "consume": 0,
              "producer": "",
              "ativo_name": "10446",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.202762,
              -46.830857
          ],
          "ativo_id": 657835,
          "client_id": 86155,
          "speed": {
              "val": 16,
              "unit_measurement": "km/h"
          },
          "address": "Rua São José do Rio Pardo, 62, Várzea Paulista - SP, 13222-040, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:43:48",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GXM9B79",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51113",
              "consume": 0,
              "producer": "",
              "ativo_name": "51113",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.340084,
              -46.954681
          ],
          "ativo_id": 657926,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Renascença, 30, Mogi Guaçu - SP, 13846-135, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:45",
          "direction": 241,
          "ativo": {
              "color": "",
              "plate": "FRX1I25",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61251",
              "consume": 0,
              "producer": "",
              "ativo_name": "61251",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.361509,
              -46.941294
          ],
          "ativo_id": 658289,
          "client_id": 157645,
          "speed": {
              "val": 31,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Emília Marchi Martini, 195, Mogi Guaçu - SP, 13840-090, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:17",
          "direction": 41,
          "ativo": {
              "color": "",
              "plate": " GXM-8973",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09006",
              "consume": 0,
              "producer": "",
              "ativo_name": "09006",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.556817,
              -47.408726
          ],
          "ativo_id": 660101,
          "client_id": 87222,
          "speed": {
              "val": 4,
              "unit_measurement": "km/h"
          },
          "address": "Rua Major Antônio Augusto Botelho, 172, Centro, Limeira - SP, 13480-753, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:44:00",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "ELW3D72  ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61105 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "61105 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.234678,
              -46.866736
          ],
          "ativo_id": 661647,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Deposito Casas Bahia Jundiai, Vila Militar, Jundiaí - SP, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:59:07",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJV5H92",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12076",
              "consume": 0,
              "producer": "",
              "ativo_name": "12076",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141414,
              -46.917446
          ],
          "ativo_id": 662971,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, 3115, Cecap, Jundiaí - SP, 13214-788, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:52:29",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJV5H89",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12066",
              "consume": 0,
              "producer": "",
              "ativo_name": "12066",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.300448,
              -47.134169
          ],
          "ativo_id": 663190,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Piqui, 153, Cabreúva - SP, 13315-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "16/03/2024 07:37:08",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJV-5791",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12056",
              "consume": 0,
              "producer": "",
              "ativo_name": "12056",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.226713,
              -46.842487
          ],
          "ativo_id": 663886,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Pará, 42, Várzea Paulista - SP, 13225-130, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:20:02",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJV5H93",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12086",
              "consume": 0,
              "producer": "",
              "ativo_name": "12086",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.210252,
              -46.810293
          ],
          "ativo_id": 664685,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Particular, 353, Várzea Paulista - SP, 13223-025, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:21",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "   EOC-399",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11026",
              "consume": 0,
              "producer": "",
              "ativo_name": "11026",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141871,
              -46.91727
          ],
          "ativo_id": 665077,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Cecap, Jundiaí - SP, 13214-730, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:36",
          "direction": 135,
          "ativo": {
              "color": "",
              "plate": "HBG-4068",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10386",
              "consume": 0,
              "producer": "",
              "ativo_name": "10386",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.550029,
              -47.430957
          ],
          "ativo_id": 670411,
          "client_id": 87222,
          "speed": {
              "val": 25,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Libertino Pizani, Res Terras de São Bento I, Limeira - SP, 13484-666, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:41",
          "direction": 201,
          "ativo": {
              "color": "",
              "plate": "HGJ-2454",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10436",
              "consume": 0,
              "producer": "",
              "ativo_name": "10436",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.558538,
              -47.442986
          ],
          "ativo_id": 670804,
          "client_id": 87222,
          "speed": {
              "val": 16,
              "unit_measurement": "km/h"
          },
          "address": "Jardim São Francisco, Limeira - SP, 13483-281, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:58:51",
          "direction": 324,
          "ativo": {
              "color": "",
              "plate": "HGJ-2416",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10466",
              "consume": 0,
              "producer": "",
              "ativo_name": "10466",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.550909,
              -47.166416
          ],
          "ativo_id": 671602,
          "client_id": 87222,
          "speed": {
              "val": 19,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ricardo Tagliari, 660, Artur Nogueira - SP, 13160-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:31",
          "direction": 180,
          "ativo": {
              "color": "",
              "plate": "GYS6G87",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10776",
              "consume": 0,
              "producer": "",
              "ativo_name": "10776",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.196014,
              -46.886179
          ],
          "ativo_id": 674374,
          "client_id": 86155,
          "speed": {
              "val": 43,
              "unit_measurement": "km/h"
          },
          "address": "Rua Bom Jesus de Pirapora, 396, Vianelo, Jundiaí - SP, 13207-270, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:37",
          "direction": 85,
          "ativo": {
              "color": "",
              "plate": "LMR-4E30",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12136",
              "consume": 0,
              "producer": "",
              "ativo_name": "12136",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.888271,
              -47.232338
          ],
          "ativo_id": 675589,
          "client_id": 196231,
          "speed": {
              "val": 24,
              "unit_measurement": "km/h"
          },
          "address": "Rua Eusébio de Queiroz, 1735, Jardim Amanda I, Hortolândia - SP, 13188-002, Brasil",
          "client": "TransNetti"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:42",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "  DPE-7655",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08096",
              "consume": 0,
              "producer": "",
              "ativo_name": "08096",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.564975,
              -47.398768
          ],
          "ativo_id": 676462,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Siqueira Campos, 71, Centro, Limeira - SP, 13480-220, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:54:46",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "CYN4B81 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61261 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "61261 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.278474,
              -46.741422
          ],
          "ativo_id": 684987,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Efijota, Rua dos Miosótis, 83, Francisco Morato - SP, 07990-070, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:02:32",
          "direction": 64,
          "ativo": {
              "color": "",
              "plate": " LTL-7F73",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12146",
              "consume": 0,
              "producer": "",
              "ativo_name": "12146",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.848926,
              -47.213451
          ],
          "ativo_id": 686381,
          "client_id": 196231,
          "speed": {
              "val": 24,
              "unit_measurement": "km/h"
          },
          "address": "Avenida São Francisco de Assis, 1620, Vila Real, Hortolândia - SP, 13183-090, Brasil",
          "client": "TransNetti"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:35",
          "direction": 63,
          "ativo": {
              "color": "",
              "plate": "FRV4F93",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10856",
              "consume": 0,
              "producer": "",
              "ativo_name": "10856",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.355643,
              -46.939856
          ],
          "ativo_id": 690359,
          "client_id": 157645,
          "speed": {
              "val": 31,
              "unit_measurement": "km/h"
          },
          "address": "Rua João Murilo, 563, Mogi Guaçu - SP, 13847-031, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:26",
          "direction": 77,
          "ativo": {
              "color": "",
              "plate": "FTF2E59",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11346",
              "consume": 0,
              "producer": "",
              "ativo_name": "11346",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.353654,
              -46.919432
          ],
          "ativo_id": 690362,
          "client_id": 157645,
          "speed": {
              "val": 25,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Emília Marchi Martini, Mogi Guaçu - SP, 13848-020, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:36",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EFO9267",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09046",
              "consume": 0,
              "producer": "",
              "ativo_name": "09046",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.310397,
              -46.71576
          ],
          "ativo_id": 690786,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Estação Campo Limpo Paulista, 215, Franco da Rocha - SP, 07865-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:28",
          "direction": 87,
          "ativo": {
              "color": "",
              "plate": "HJI-0236",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09686",
              "consume": 0,
              "producer": "",
              "ativo_name": "09686",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.571772,
              -47.367555
          ],
          "ativo_id": 691571,
          "client_id": 87222,
          "speed": {
              "val": 25,
              "unit_measurement": "km/h"
          },
          "address": "Rua Encarnação Carrasco Arias, Parque Hippolyto, Limeira - SP, 13486-504, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:43:20",
          "direction": 339,
          "ativo": {
              "color": "",
              "plate": "FRW-2860",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70032",
              "consume": 0,
              "producer": "",
              "ativo_name": "70032",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.589728,
              -47.367013
          ],
          "ativo_id": 691666,
          "client_id": 87222,
          "speed": {
              "val": 32,
              "unit_measurement": "km/h"
          },
          "address": "Jardim Glória, Limeira - SP, 13487-211, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:00:09",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FFY-3139 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70031 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "70031 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.568911,
              -47.363141
          ],
          "ativo_id": 691744,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Licav, Limeira - SP, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:56:44",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "BTB-8926",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70012",
              "consume": 0,
              "producer": "",
              "ativo_name": "70012",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.569066,
              -47.362886
          ],
          "ativo_id": 694296,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Licav, Limeira - SP, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:12",
          "direction": 104,
          "ativo": {
              "color": "",
              "plate": "LMN-7I66",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12156",
              "consume": 0,
              "producer": "",
              "ativo_name": "12156",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.893114,
              -47.126579
          ],
          "ativo_id": 694851,
          "client_id": 196231,
          "speed": {
              "val": 68,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Robert Bosch, Parque Via Norte, Campinas - SP, 13064-765, Brasil",
          "client": "TransNetti"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:43",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "HGJ-2459",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10526",
              "consume": 0,
              "producer": "",
              "ativo_name": "10526",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.557362,
              -47.368843
          ],
          "ativo_id": 696120,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Lim-340, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:52:04",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "DYJ6E69",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70510",
              "consume": 0,
              "producer": "",
              "ativo_name": "70510",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.727054,
              -47.327232
          ],
          "ativo_id": 697841,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Bandeirantes, 4100, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:44:38",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "BQT8H09 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70520",
              "consume": 0,
              "producer": "",
              "ativo_name": "70520",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.733223,
              -47.4049
          ],
          "ativo_id": 697939,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Estrada da Cachoeira, Cohab Angelo Giubina, Santa Bárbara d'Oeste - SP, 13453-225, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:44:02",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "BSX0F79",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70540",
              "consume": 0,
              "producer": "",
              "ativo_name": "70540",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.733785,
              -47.383261
          ],
          "ativo_id": 697978,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Belém, 733, Loteamento Planalto do Sol, Santa Bárbara d'Oeste - SP, 13454-420, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:01:17",
          "direction": 339,
          "ativo": {
              "color": "",
              "plate": "EMF-1259",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70100",
              "consume": 0,
              "producer": "",
              "ativo_name": "70100",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.75563,
              -47.321546
          ],
          "ativo_id": 700292,
          "client_id": 136081,
          "speed": {
              "val": 20,
              "unit_measurement": "km/h"
          },
          "address": "Rua Cabo Oswaldo de Moraes, 847, Nova América, Americana - SP, 13466-030, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:33",
          "direction": 234,
          "ativo": {
              "color": "",
              "plate": "DZC-1309",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70110",
              "consume": 0,
              "producer": "",
              "ativo_name": "70110",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.726888,
              -47.299318
          ],
          "ativo_id": 700420,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Paschoal Ardito, 1220, Vila Bertini, Americana - SP, 13473-010, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:40:19",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "DML3E69",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70500",
              "consume": 0,
              "producer": "",
              "ativo_name": "70500",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.738385,
              -47.364705
          ],
          "ativo_id": 700512,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Alfredo Contatto, 925, Lagoa Seca, Santa Bárbara d'Oeste - SP, 13454-233, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:23",
          "direction": 56,
          "ativo": {
              "color": "",
              "plate": "FPZ-9820",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70030",
              "consume": 0,
              "producer": "",
              "ativo_name": "70030",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.727041,
              -47.326896
          ],
          "ativo_id": 700765,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua 7, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:27",
          "direction": 129,
          "ativo": {
              "color": "",
              "plate": "FPD-3268",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70033",
              "consume": 0,
              "producer": "",
              "ativo_name": "70033",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.734163,
              -47.387228
          ],
          "ativo_id": 700867,
          "client_id": 136081,
          "speed": {
              "val": 19,
              "unit_measurement": "km/h"
          },
          "address": "Rua Retorno, Planalto do Sol II, Santa Bárbara d'Oeste - SP, 13453-810, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:01:33",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FFI-6173",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70019",
              "consume": 0,
              "producer": "",
              "ativo_name": "70019",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.761029,
              -47.458332
          ],
          "ativo_id": 700943,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Luiz de Queiroz, Santa Bárbara d'Oeste - SP, 13412-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:58:36",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "BTB-8592",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70020",
              "consume": 0,
              "producer": "",
              "ativo_name": "70020",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.760989,
              -47.458754
          ],
          "ativo_id": 701432,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Luiz de Queiroz, Santa Bárbara d'Oeste - SP, 13412-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:36",
          "direction": 191,
          "ativo": {
              "color": "",
              "plate": "FTK0C69",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11336",
              "consume": 0,
              "producer": "",
              "ativo_name": "11336",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.45551,
              -46.982751
          ],
          "ativo_id": 701590,
          "client_id": 157645,
          "speed": {
              "val": 68,
              "unit_measurement": "km/h"
          },
          "address": "159, Mogi Mirim - SP, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:16",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " FCH-0957",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70034",
              "consume": 0,
              "producer": "",
              "ativo_name": "70034",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.704773,
              -47.371672
          ],
          "ativo_id": 701989,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Rogério Zanaga de Camargo, 506, Jardim das Orquídeas, Americana - SP, 13470-802, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:26",
          "direction": 353,
          "ativo": {
              "color": "",
              "plate": "FBV-8870",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70029",
              "consume": 0,
              "producer": "",
              "ativo_name": "70029",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.757515,
              -47.364358
          ],
          "ativo_id": 702058,
          "client_id": 136081,
          "speed": {
              "val": 18,
              "unit_measurement": "km/h"
          },
          "address": "Rua do Ouro, 1173, Jardim Pântano, Santa Bárbara d'Oeste - SP, 13456-447, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:01:26",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "CNR1C69",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70140",
              "consume": 0,
              "producer": "",
              "ativo_name": "70140",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.727051,
              -47.326858
          ],
          "ativo_id": 703111,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua 7, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:15",
          "direction": 178,
          "ativo": {
              "color": "",
              "plate": "FSU-6240",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70028",
              "consume": 0,
              "producer": "",
              "ativo_name": "70028",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.678308,
              -47.310982
          ],
          "ativo_id": 703188,
          "client_id": 136081,
          "speed": {
              "val": 73,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Limeira - SP, 13486-199, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:57:15",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " BTB-8993",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70005",
              "consume": 0,
              "producer": "",
              "ativo_name": "70005",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.727025,
              -47.327004
          ],
          "ativo_id": 704556,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Terrapavi Terraplenagens e Transportes, Avenida Bandeirantes, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:52:44",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "OIH-7549",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61222 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "61222 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.328566,
              -46.946196
          ],
          "ativo_id": 706058,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua José Augusto Andrade, 407, Mogi Guaçu - SP, 13846-643, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:52:37",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FOM8269",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51807",
              "consume": 0,
              "producer": "",
              "ativo_name": "51807",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.726936,
              -47.327183
          ],
          "ativo_id": 708226,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Terrapavi Terraplenagens e Transportes, Avenida Bandeirantes, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:02:33",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " GDE-1707\t",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01506",
              "consume": 0,
              "producer": "",
              "ativo_name": "01506",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.726974,
              -47.327194
          ],
          "ativo_id": 709663,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Terrapavi Terraplenagens e Transportes, Avenida Bandeirantes, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:49:26",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EGJ-2349",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70045",
              "consume": 0,
              "producer": "",
              "ativo_name": "70045",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.726891,
              -47.327241
          ],
          "ativo_id": 709743,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Terrapavi Terraplenagens e Transportes, Avenida Bandeirantes, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:59:50",
          "direction": 332,
          "ativo": {
              "color": "",
              "plate": "FTG0802",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09396",
              "consume": 0,
              "producer": "",
              "ativo_name": "09396",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.109364,
              -46.70907
          ],
          "ativo_id": 709794,
          "client_id": 92460,
          "speed": {
              "val": 37,
              "unit_measurement": "km/h"
          },
          "address": "Rua Quatro, 398, Jarinu - SP, 13240-000, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:34:55",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EQK8J09",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70050",
              "consume": 0,
              "producer": "",
              "ativo_name": "70050",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.726897,
              -47.327366
          ],
          "ativo_id": 709899,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Terrapavi Terraplenagens e Transportes, Avenida Bandeirantes, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 10:15:17",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "BYX7G49",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70054",
              "consume": 0,
              "producer": "",
              "ativo_name": "70054",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.727493,
              -47.327063
          ],
          "ativo_id": 710698,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua 7, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:58:05",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "QQN-5027",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70049",
              "consume": 0,
              "producer": "",
              "ativo_name": "70049",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.726866,
              -47.327194
          ],
          "ativo_id": 710785,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Terrapavi Terraplenagens e Transportes, Avenida Bandeirantes, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:29:23",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GCA9549",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01336",
              "consume": 0,
              "producer": "",
              "ativo_name": "01336",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.550793,
              -47.452716
          ],
          "ativo_id": 710948,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Mariana Pileggi Kühl, 581, Bairro Geada, Limeira - SP, 13482-197, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:39",
          "direction": 289,
          "ativo": {
              "color": "",
              "plate": "EJL0H39",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70052",
              "consume": 0,
              "producer": "",
              "ativo_name": "70052",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.734635,
              -47.326821
          ],
          "ativo_id": 711188,
          "client_id": 136081,
          "speed": {
              "val": 33,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Bandeirantes, Jardim Santana, Americana - SP, 13478-190, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:58:43",
          "direction": 297,
          "ativo": {
              "color": "",
              "plate": "DZX5F59",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70051",
              "consume": 0,
              "producer": "",
              "ativo_name": "70051",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.697106,
              -47.352193
          ],
          "ativo_id": 711354,
          "client_id": 136081,
          "speed": {
              "val": 28,
              "unit_measurement": "km/h"
          },
          "address": "Avenida São Jerônimo, Morada do Sol, Americana - SP, 13470-310, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:47:34",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EJL-8349",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70044",
              "consume": 0,
              "producer": "",
              "ativo_name": "70044",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.722951,
              -47.365463
          ],
          "ativo_id": 711411,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Portugal, 213, Jardim Europa I, Santa Bárbara d'Oeste - SP, 13455-425, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:42:49",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "DWK-8009",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70048",
              "consume": 0,
              "producer": "",
              "ativo_name": "70048",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.879442,
              -47.121279
          ],
          "ativo_id": 711719,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Aristeu Augusto, 36, Parque Via Norte, Campinas - SP, 13065-230, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "09/03/2024 09:07:29",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FTW-8891",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70023",
              "consume": 0,
              "producer": "",
              "ativo_name": "70023",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.727523,
              -47.326973
          ],
          "ativo_id": 711774,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua 7, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:50:02",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FJG-2499",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70001 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "70001 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.726911,
              -47.327274
          ],
          "ativo_id": 711905,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Terrapavi Terraplenagens e Transportes, Avenida Bandeirantes, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:50",
          "direction": 213,
          "ativo": {
              "color": "",
              "plate": " FWA8B38",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00069",
              "consume": 0,
              "producer": "",
              "ativo_name": "00069",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.358968,
              -46.948733
          ],
          "ativo_id": 713246,
          "client_id": 157645,
          "speed": {
              "val": 9,
              "unit_measurement": "km/h"
          },
          "address": "Rua Espírito Santo, 156, Mogi Guaçu - SP, 13845-245, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:31",
          "direction": 325,
          "ativo": {
              "color": "",
              "plate": "EQT-6940",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70046",
              "consume": 0,
              "producer": "",
              "ativo_name": "70046",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.801916,
              -47.287656
          ],
          "ativo_id": 713864,
          "client_id": 136081,
          "speed": {
              "val": 45,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Ampélio Gazzeta, Nova Odessa - SP, 13460-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:39:22",
          "direction": 163,
          "ativo": {
              "color": "",
              "plate": "FNY-2160",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70022",
              "consume": 0,
              "producer": "",
              "ativo_name": "70022",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.836848,
              -47.218328
          ],
          "ativo_id": 713942,
          "client_id": 136081,
          "speed": {
              "val": 53,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Pedro Pascoal dos Santos, Sumaré - SP, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:25",
          "direction": 341,
          "ativo": {
              "color": "",
              "plate": "FYX-8228",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70024",
              "consume": 0,
              "producer": "",
              "ativo_name": "70024",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.726901,
              -47.327236
          ],
          "ativo_id": 714098,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Terrapavi Terraplenagens e Transportes, Avenida Bandeirantes, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:27",
          "direction": 308,
          "ativo": {
              "color": "",
              "plate": "EZJ4G79",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70130",
              "consume": 0,
              "producer": "",
              "ativo_name": "70130",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.734921,
              -47.326293
          ],
          "ativo_id": 714347,
          "client_id": 136081,
          "speed": {
              "val": 33,
              "unit_measurement": "km/h"
          },
          "address": "Rua Vicente Morelli, 26, Jardim Santana, Americana - SP, 13478-125, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "21/11/2023 20:13:47",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FZT-3332 ",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70027 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "70027 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.726981,
              -47.326951
          ],
          "ativo_id": 715565,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Terrapavi Terraplenagens e Transportes, Avenida Bandeirantes, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:49:04",
          "direction": 179,
          "ativo": {
              "color": "",
              "plate": "EZP-3949",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70042",
              "consume": 0,
              "producer": "",
              "ativo_name": "70042",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.84776,
              -47.163381
          ],
          "ativo_id": 717213,
          "client_id": 136081,
          "speed": {
              "val": 17,
              "unit_measurement": "km/h"
          },
          "address": "Petrobras, Rua Batista Raffi, Área Cura, Sumaré - SP, 13180-530, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:19",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "HFD6F70",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11306",
              "consume": 0,
              "producer": "",
              "ativo_name": "11306",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.14187,
              -46.917663
          ],
          "ativo_id": 722803,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Nelson Martinho, Cecap, Jundiaí - SP, 13214-718, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:44",
          "direction": 165,
          "ativo": {
              "color": "",
              "plate": "FSQ0H57",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11326",
              "consume": 0,
              "producer": "",
              "ativo_name": "11326",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.378169,
              -46.928934
          ],
          "ativo_id": 722808,
          "client_id": 157645,
          "speed": {
              "val": 18,
              "unit_measurement": "km/h"
          },
          "address": "Rua José Cristino de Oliveira Campos, 619, Mogi Guaçu - SP, 13843-054, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:00:34",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GIH8I45",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00083",
              "consume": 0,
              "producer": "",
              "ativo_name": "00083",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.580837,
              -47.407467
          ],
          "ativo_id": 723418,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Maranhão, 885, Vila Rosália, Limeira - SP, 13480-615, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:43:50",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GBF-8289",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00007",
              "consume": 0,
              "producer": "",
              "ativo_name": "00007",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141071,
              -46.917028
          ],
          "ativo_id": 726504,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-040, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:16",
          "direction": 265,
          "ativo": {
              "color": "",
              "plate": "FDL-8010 ",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01455 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "01455 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.344662,
              -46.933573
          ],
          "ativo_id": 730296,
          "client_id": 157645,
          "speed": {
              "val": 14,
              "unit_measurement": "km/h"
          },
          "address": "Rua Antônio Luiz Filho, Mogi Guaçu - SP, 13848-114, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:38:05",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "DAJ3E16",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "06800",
              "consume": 0,
              "producer": "",
              "ativo_name": "06800",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.347936,
              -46.957304
          ],
          "ativo_id": 730301,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Deputado Mário Beni, Mogi Guaçu - SP, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:35",
          "direction": 208,
          "ativo": {
              "color": "",
              "plate": "JJM-3400",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11166",
              "consume": 0,
              "producer": "",
              "ativo_name": "11166",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.233186,
              -46.866466
          ],
          "ativo_id": 730556,
          "client_id": 86155,
          "speed": {
              "val": 19,
              "unit_measurement": "km/h"
          },
          "address": "Studio Cb Filmes, Vila Militar, Jundiaí - SP, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:38",
          "direction": 59,
          "ativo": {
              "color": "",
              "plate": "AOA-7095",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08546",
              "consume": 0,
              "producer": "",
              "ativo_name": "08546",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.238236,
              -46.861827
          ],
          "ativo_id": 731271,
          "client_id": 86155,
          "speed": {
              "val": 19,
              "unit_measurement": "km/h"
          },
          "address": "Auditório Cd Viavarejo Jundiaí, Vila Militar, Jundiaí - SP, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:37:34",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " GBL6E28",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01816",
              "consume": 0,
              "producer": "",
              "ativo_name": "01816",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.065044,
              -46.684623
          ],
          "ativo_id": 731946,
          "client_id": 92460,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Bueno Polpas, Jarinu - SP, 13240-000, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "14/07/2022 23:50:56",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "Ponto 1",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "Marca Ponto 1",
              "consume": 0,
              "producer": "",
              "ativo_name": "Marca Ponto 1",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.727447,
              -47.32726
          ],
          "ativo_id": 733251,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Bandeirantes, 4100, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:02:59",
          "direction": 200,
          "ativo": {
              "color": "",
              "plate": " EZY-9528",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70041",
              "consume": 0,
              "producer": "",
              "ativo_name": "70041",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.801369,
              -47.299071
          ],
          "ativo_id": 734496,
          "client_id": 136081,
          "speed": {
              "val": 23,
              "unit_measurement": "km/h"
          },
          "address": "Rua Octávio Guedes, 220, Nova Odessa - SP, 13460-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:44:31",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GJR0J47",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12186",
              "consume": 0,
              "producer": "",
              "ativo_name": "12186",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.474579,
              -47.458517
          ],
          "ativo_id": 735647,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Pedro A. C. Hespanhol, 381, Cordeirópolis - SP, 13490-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:49:57",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FZO6E97",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12206",
              "consume": 0,
              "producer": "",
              "ativo_name": "12206",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.493206,
              -47.449282
          ],
          "ativo_id": 735683,
          "client_id": 87222,
          "speed": {
              "val": 1,
              "unit_measurement": "km/h"
          },
          "address": "Cei Milton Antônio Vitte, Rua Uardi Abrahão de Campos Toledo, Cordeirópolis - SP, 13490-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:37:49",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "DPS4D82",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00085",
              "consume": 0,
              "producer": "",
              "ativo_name": "00085",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.557036,
              -47.369793
          ],
          "ativo_id": 741019,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:03:02",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EXI6E39",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "52008",
              "consume": 0,
              "producer": "",
              "ativo_name": "52008",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449717,
              -46.980479
          ],
          "ativo_id": 746723,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 226, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:30:57",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GXM9B80 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51109 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "51109 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449733,
              -46.98035
          ],
          "ativo_id": 748933,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 226, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:47:31",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GCH2G06",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "52112",
              "consume": 0,
              "producer": "",
              "ativo_name": "52112",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.188266,
              -46.981964
          ],
          "ativo_id": 749380,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Dom Gabriel Paulino Bueno Couto, Medeiros, Jundiaí - SP, 13212-240, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:48:01",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "  FCX-4219\t",
              "fuel": "1",
              "model": "",
              "type": 16,
              "horimeter": 0,
              "description": "51803 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "51803 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.143569,
              -47.236009
          ],
          "ativo_id": 749925,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Esmeralda Martini Paula, 326, Indaiatuba - SP, 13347-636, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:55:00",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GKH4E27",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01836",
              "consume": 0,
              "producer": "",
              "ativo_name": "01836",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.142072,
              -46.917636
          ],
          "ativo_id": 755275,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Cecap, Jundiaí - SP, 13214-730, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:58:34",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "  GXM9B83",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51112",
              "consume": 0,
              "producer": "",
              "ativo_name": "51112",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449806,
              -46.981266
          ],
          "ativo_id": 755448,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "SP-340, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-029, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "20/03/2024 03:23:18",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " ESU-5857",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08876",
              "consume": 0,
              "producer": "",
              "ativo_name": "08876",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.064738,
              -46.684491
          ],
          "ativo_id": 761513,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Edgar Máximo Zambotto, Ponte Alta, Atibaia - SP, 12952-817, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 11:43:11",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FXW5E75",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 9589311,
              "description": "22000",
              "consume": 0,
              "producer": "",
              "ativo_name": "22000",
              "odometer": 76519290
          },
          "validate": 1,
          "lat_lng": [
              -22.845026,
              -47.166626
          ],
          "ativo_id": 762647,
          "client_id": 196231,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Maria dos Santos Garcia, 54, Área Cura, Sumaré - SP, 13180-625, Brasil",
          "client": "TransNetti"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:44",
          "direction": 266,
          "ativo": {
              "color": "",
              "plate": "FNV-6968",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01266",
              "consume": 0,
              "producer": "",
              "ativo_name": "01266",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.545915,
              -47.387335
          ],
          "ativo_id": 763872,
          "client_id": 87222,
          "speed": {
              "val": 27,
              "unit_measurement": "km/h"
          },
          "address": "Jardim Hortência, Limeira - SP, 13485-082, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:42",
          "direction": 356,
          "ativo": {
              "color": "",
              "plate": "FYK4D36",
              "fuel": "",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "01856",
              "consume": 0,
              "producer": "",
              "ativo_name": "01856",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.755193,
              -47.383318
          ],
          "ativo_id": 765916,
          "client_id": 136081,
          "speed": {
              "val": 27,
              "unit_measurement": "km/h"
          },
          "address": "Rua Vereador Sérgio Leopoldino Alves, 254, Cidade Industrial, Santa Bárbara d'Oeste - SP, 13456-166, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:57:19",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GJO4J06 ",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01846",
              "consume": 0,
              "producer": "",
              "ativo_name": "01846",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.065181,
              -46.684624
          ],
          "ativo_id": 767264,
          "client_id": 92460,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Morangão Sucos,Lanches e Frutas, Rodovia Edgar Máximo Zambotto, Jarinu - SP, 12952-817, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:17",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FZF9H25",
              "fuel": "",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "00086",
              "consume": 0,
              "producer": "",
              "ativo_name": "00086",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.116811,
              -46.561761
          ],
          "ativo_id": 769253,
          "client_id": 92460,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Banco 24horas, Rua Doutor Eurico de Souza Pereira, Alvinópolis, Atibaia - SP, 12942-490, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 08:17:46",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FRJ0H45",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61248",
              "consume": 0,
              "producer": "",
              "ativo_name": "61248",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.6598,
              -46.706387
          ],
          "ativo_id": 779090,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Benedito Fernandes, 107, Santo Amaro, São Paulo - SP, 04746-110, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:54:58",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FRD1F97",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61249",
              "consume": 0,
              "producer": "",
              "ativo_name": "61249",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.659985,
              -46.706312
          ],
          "ativo_id": 779175,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Benedito Fernandes, 133, Santo Amaro, São Paulo - SP, 04746-110, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:56:36",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FRS5B97",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61250",
              "consume": 0,
              "producer": "",
              "ativo_name": "61250",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.66521,
              -46.706065
          ],
          "ativo_id": 779177,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Otávio Castro Filho, 31, Campo Grande, São Paulo - SP, 04696-300, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "24/03/2024 02:54:02",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FSN0H34",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61253",
              "consume": 0,
              "producer": "",
              "ativo_name": "61253",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141536,
              -46.917541
          ],
          "ativo_id": 779178,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Centro de Convivência da Afresp - Jundiaí, Rua Nelson Martinho, Cecap, Jundiaí - SP, 13214-718, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:54:59",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FQR6A76",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61258",
              "consume": 0,
              "producer": "",
              "ativo_name": "61258",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.659845,
              -46.70628
          ],
          "ativo_id": 779179,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Benedito Fernandes, 107, Santo Amaro, São Paulo - SP, 04746-110, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "15/03/2024 10:54:45",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "CSK-2664",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51004",
              "consume": 0,
              "producer": "",
              "ativo_name": "51004",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.44977,
              -46.980821
          ],
          "ativo_id": 779887,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Padre Roque, 2931, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:53:22",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GGW-6516",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 6585906,
              "description": "01326",
              "consume": 0,
              "producer": "",
              "ativo_name": "01326",
              "odometer": 41526357
          },
          "validate": 1,
          "lat_lng": [
              -23.14219,
              -46.917516
          ],
          "ativo_id": 781026,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Nelson Martinho, Cecap, Jundiaí - SP, 13214-718, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:58:33",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EZU-8941",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08896",
              "consume": 0,
              "producer": "",
              "ativo_name": "08896",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.064741,
              -46.684479
          ],
          "ativo_id": 781027,
          "client_id": 92460,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Edgar Máximo Zambotto, Ponte Alta, Atibaia - SP, 12952-817, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:01:56",
          "direction": 45,
          "ativo": {
              "color": "",
              "plate": "EDL-6228",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11086",
              "consume": 0,
              "producer": "",
              "ativo_name": "11086",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.145673,
              -46.707901
          ],
          "ativo_id": 782012,
          "client_id": 86155,
          "speed": {
              "val": 25,
              "unit_measurement": "km/h"
          },
          "address": "Rua Santa Maria, Jarinu - SP, 13240-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:47:58",
          "direction": 89,
          "ativo": {
              "color": "",
              "plate": "FJE-4173",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70021",
              "consume": 0,
              "producer": "",
              "ativo_name": "70021",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.722628,
              -47.332844
          ],
          "ativo_id": 784191,
          "client_id": 136081,
          "speed": {
              "val": 30,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Europa, Jardim Guanabara, Americana - SP, 13472-573, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:50:51",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FLZ-5199",
              "fuel": "1",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "70025",
              "consume": 0,
              "producer": "",
              "ativo_name": "70025",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.72685,
              -47.327372
          ],
          "ativo_id": 784226,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Terrapavi Terraplenagens e Transportes, Avenida Bandeirantes, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:21:14",
          "direction": 22,
          "ativo": {
              "color": "",
              "plate": "FUC2D87",
              "fuel": "",
              "model": "",
              "type": 19,
              "horimeter": 0,
              "description": "01866",
              "consume": 0,
              "producer": "",
              "ativo_name": "01866",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.725871,
              -47.317624
          ],
          "ativo_id": 784548,
          "client_id": 136081,
          "speed": {
              "val": 40,
              "unit_measurement": "km/h"
          },
          "address": "Rua São Benedito, 150, Cariobinha, Americana - SP, 13472-390, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:26",
          "direction": 136,
          "ativo": {
              "color": "",
              "plate": "FZC9E96",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61268",
              "consume": 0,
              "producer": "",
              "ativo_name": "61268",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.252898,
              -46.837367
          ],
          "ativo_id": 789050,
          "client_id": 86155,
          "speed": {
              "val": 46,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia General Milton Tavares de Souza, Jundiaí - SP, 13205-005, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:37:07",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " GIC1E76 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61266",
              "consume": 0,
              "producer": "",
              "ativo_name": "61266",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.563225,
              -46.840537
          ],
          "ativo_id": 789170,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Mc Prestacoes de Servicos Diversos, Rua Mestre Azul Paulista, 777, Vila Dirce, Carapicuíba - SP, 06361-350, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:56:13",
          "direction": 159,
          "ativo": {
              "color": "",
              "plate": "FWL4B76",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61267",
              "consume": 0,
              "producer": "",
              "ativo_name": "61267",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.24324,
              -46.868546
          ],
          "ativo_id": 789206,
          "client_id": 86155,
          "speed": {
              "val": 80,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Jundiaí - SP, 13210-811, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:48:40",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " FZY-8244",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11706",
              "consume": 0,
              "producer": "",
              "ativo_name": "11706",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.760153,
              -47.326747
          ],
          "ativo_id": 789296,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua das Petúnias, 1360, Vila Mathiesen, Americana - SP, 13467-070, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:38:27",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FWX7A95",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11676",
              "consume": 0,
              "producer": "",
              "ativo_name": "11676",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.682341,
              -47.302349
          ],
          "ativo_id": 789986,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Agropalma, Limeira - SP, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:40:22",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FMW-1652",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11696",
              "consume": 0,
              "producer": "",
              "ativo_name": "11696",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.682456,
              -47.302396
          ],
          "ativo_id": 789988,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Agropalma, Limeira - SP, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:40",
          "direction": 322,
          "ativo": {
              "color": "",
              "plate": "CSK-2718",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09846",
              "consume": 0,
              "producer": "",
              "ativo_name": "09846",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.209815,
              -46.831457
          ],
          "ativo_id": 789990,
          "client_id": 86155,
          "speed": {
              "val": 29,
              "unit_measurement": "km/h"
          },
          "address": "Ponte Complexo, Várzea Paulista - SP, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:41:19",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EFV-8J90",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61004",
              "consume": 0,
              "producer": "",
              "ativo_name": "61004",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.143506,
              -47.235971
          ],
          "ativo_id": 790001,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Esmeralda Martini Paula, 326, Indaiatuba - SP, 13347-636, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "23/02/2024 16:34:08",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EXO-5022",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00061",
              "consume": 0,
              "producer": "",
              "ativo_name": "00061",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.580892,
              -47.407498
          ],
          "ativo_id": 793809,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Maranhão, 885, Vila Rosália, Limeira - SP, 13480-615, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:25",
          "direction": 8,
          "ativo": {
              "color": "",
              "plate": "EJW7B98",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61113",
              "consume": 0,
              "producer": "",
              "ativo_name": "61113",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.355841,
              -46.957835
          ],
          "ativo_id": 800635,
          "client_id": 157645,
          "speed": {
              "val": 10,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Paula Aparecida Amorim, 3868, Mogi Guaçu - SP, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:33",
          "direction": 84,
          "ativo": {
              "color": "",
              "plate": "CUB-9715",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "0920 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "0920 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.33528,
              -46.928615
          ],
          "ativo_id": 802464,
          "client_id": 157645,
          "speed": {
              "val": 11,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Alberto Chabregas, 516, Mogi Guaçu - SP, 13848-159, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:33:26",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FP05G85",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01776",
              "consume": 0,
              "producer": "",
              "ativo_name": "01776",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.175485,
              -46.984089
          ],
          "ativo_id": 802895,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vice-Prefeito Hermenegildo Tonolli, Novo Horizonte, Jundiaí - SP, 13213-086, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:18",
          "direction": 17,
          "ativo": {
              "color": "",
              "plate": "FCS6J21",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00088",
              "consume": 0,
              "producer": "",
              "ativo_name": "00088",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.1413,
              -46.917276
          ],
          "ativo_id": 803664,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, 3115, Cecap, Jundiaí - SP, 13214-788, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:38:24",
          "direction": 70,
          "ativo": {
              "color": "",
              "plate": "GBG9I7",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00081",
              "consume": 0,
              "producer": "",
              "ativo_name": "00081",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.143139,
              -47.235953
          ],
          "ativo_id": 804462,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Esmeralda Martini Paula, 309, Indaiatuba - SP, 13347-636, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:06",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GXM9B81 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51114  ",
              "consume": 0,
              "producer": "",
              "ativo_name": "51114 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141429,
              -46.917451
          ],
          "ativo_id": 804559,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, 3115, Cecap, Jundiaí - SP, 13214-788, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:59:52",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EPU4J44",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 17476468,
              "description": "61025",
              "consume": 0,
              "producer": "",
              "ativo_name": "61025",
              "odometer": 214362686
          },
          "validate": 1,
          "lat_lng": [
              -22.348883,
              -46.925371
          ],
          "ativo_id": 805126,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Suécia, Mogi Guaçu - SP, 13848-067, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:21:49",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "DVS6H37",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01407",
              "consume": 0,
              "producer": "",
              "ativo_name": "01407",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.347889,
              -46.957516
          ],
          "ativo_id": 805148,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Oscar Martini, 34, Mogi Guaçu - SP, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "11/03/2024 10:14:53",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GGQ2I83",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "52113",
              "consume": 0,
              "producer": "",
              "ativo_name": "52113",
              "odometer": 22736007
          },
          "validate": 0,
          "lat_lng": [
              -22.466661,
              -46.981576
          ],
          "ativo_id": 805228,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Bela Vista, 149, Jardim Bela Vista, Mogi Mirim - SP, 13803-120, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:00:31",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "BZK7I63\t",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00075",
              "consume": 0,
              "producer": "",
              "ativo_name": "00075",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.812089,
              -47.213195
          ],
          "ativo_id": 806172,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Dva Transportes e Logística, Nova Veneza, Sumaré - SP, 13177-050, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:49",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "LLV6C56",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11856",
              "consume": 0,
              "producer": "",
              "ativo_name": "11856",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -18.13281,
              -49.073231
          ],
          "ativo_id": 807841,
          "client_id": 175573,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "União Avícola, Buriti Alegre - GO, 75660-000, Brasil",
          "client": "ByBus Buriti"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "15/03/2024 21:36:30",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "LQS4A38",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11866 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11866 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -18.852933,
              -48.279603
          ],
          "ativo_id": 807847,
          "client_id": 175573,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Aírton Borges da Silva, Minas Gerais, Uberlândia - MG, 38402-333, Brasil",
          "client": "ByBus Buriti"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:55:19",
          "direction": 349,
          "ativo": {
              "color": "",
              "plate": "LQS4H99",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11896",
              "consume": 0,
              "producer": "",
              "ativo_name": "11896",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -18.132909,
              -49.073137
          ],
          "ativo_id": 807853,
          "client_id": 175573,
          "speed": {
              "val": 3,
              "unit_measurement": "km/h"
          },
          "address": "União Avícola, Buriti Alegre - GO, 75660-000, Brasil",
          "client": "ByBus Buriti"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:54:07",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " LLV6C57",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11926",
              "consume": 0,
              "producer": "",
              "ativo_name": "11926",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -18.132866,
              -49.073203
          ],
          "ativo_id": 807866,
          "client_id": 175573,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "União Avícola, Buriti Alegre - GO, 75660-000, Brasil",
          "client": "ByBus Buriti"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:55:56",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "ESU-4I19",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08636",
              "consume": 0,
              "producer": "",
              "ativo_name": "08636",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.27197,
              -46.741235
          ],
          "ativo_id": 807890,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Brasília, 92, Francisco Morato - SP, 07942-100, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:39:17",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "ESU-4I24",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08646",
              "consume": 0,
              "producer": "",
              "ativo_name": "08646",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.14138,
              -46.917249
          ],
          "ativo_id": 807894,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, 3115, Cecap, Jundiaí - SP, 13214-788, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 08:52:26",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FRN9G39",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61264",
              "consume": 0,
              "producer": "",
              "ativo_name": "61264",
              "odometer": 870110000
          },
          "validate": 1,
          "lat_lng": [
              -22.449745,
              -46.980368
          ],
          "ativo_id": 808103,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 230, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:30",
          "direction": 353,
          "ativo": {
              "color": "",
              "plate": "GHG8H74",
              "fuel": "",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "00089",
              "consume": 0,
              "producer": "",
              "ativo_name": "00089",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449304,
              -46.980029
          ],
          "ativo_id": 809303,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 154, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:44:05",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FUV-4738",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "9546 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "9546 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.489168,
              -46.980343
          ],
          "ativo_id": 810250,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Romário Schincariol, Mogi Mirim - SP, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:30",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "ESU-5833\t",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08806",
              "consume": 0,
              "producer": "",
              "ativo_name": "08806",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141514,
              -46.916742
          ],
          "ativo_id": 811530,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Vereador Geraldo Dias, 3115, Cecap, Jundiaí - SP, 13214-788, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:45:47",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " GYS-6905  ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61106 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "61106 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.347757,
              -46.957406
          ],
          "ativo_id": 811595,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Deputado Mário Beni, Mogi Guaçu - SP, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:44:46",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " BYJ-2700",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00013",
              "consume": 0,
              "producer": "",
              "ativo_name": "00013",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.622321,
              -47.411252
          ],
          "ativo_id": 812315,
          "client_id": 196231,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Carlos Gugelmo Júnior, 717, Jardim Lagoa Nova, Limeira - SP, 13481-774, Brasil",
          "client": "TransNetti"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 11:03:52",
          "direction": 97,
          "ativo": {
              "color": "",
              "plate": " FXK7F82",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00090",
              "consume": 0,
              "producer": "",
              "ativo_name": "00090",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449871,
              -46.980213
          ],
          "ativo_id": 812319,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 230, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:35:56",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FUI-7194",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00054",
              "consume": 0,
              "producer": "",
              "ativo_name": "00054",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.43364,
              -47.18918
          ],
          "ativo_id": 812949,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Pedro Alexandrino, 338, Mairinque - SP, 18120-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:33",
          "direction": 152,
          "ativo": {
              "color": "",
              "plate": "DVS6I78",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 4357580,
              "description": "01537",
              "consume": 0,
              "producer": "",
              "ativo_name": "01537",
              "odometer": 15931327
          },
          "validate": 1,
          "lat_lng": [
              -22.333238,
              -46.924016
          ],
          "ativo_id": 815705,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Antônio Gomes de Souza, 150, Mogi Guaçu - SP, 13848-268, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:41:40",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "DVS6H35",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01447",
              "consume": 0,
              "producer": "",
              "ativo_name": "01447",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.44977,
              -46.981336
          ],
          "ativo_id": 816019,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "SP-340, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-029, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:48",
          "direction": 337,
          "ativo": {
              "color": "",
              "plate": " EJW-7B99",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61114",
              "consume": 0,
              "producer": "",
              "ativo_name": "61114",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.325057,
              -46.932977
          ],
          "ativo_id": 816919,
          "client_id": 157645,
          "speed": {
              "val": 24,
              "unit_measurement": "km/h"
          },
          "address": "Mogi Guaçu - SP, 13840-034, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:11",
          "direction": 231,
          "ativo": {
              "color": "",
              "plate": "  GYS-6908 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61107 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "61107 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.439782,
              -46.941486
          ],
          "ativo_id": 816921,
          "client_id": 157645,
          "speed": {
              "val": 5,
              "unit_measurement": "km/h"
          },
          "address": "Rua Panamá, 211, Vila Dias, Mogi Mirim - SP, 13802-008, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:42:19",
          "direction": 114,
          "ativo": {
              "color": "",
              "plate": "GYS6J10",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 47760,
              "description": "61108",
              "consume": 0,
              "producer": "",
              "ativo_name": "61108",
              "odometer": 823716128
          },
          "validate": 1,
          "lat_lng": [
              -22.327586,
              -46.929488
          ],
          "ativo_id": 817087,
          "client_id": 157645,
          "speed": {
              "val": 15,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Gabriela Caruso Soares, 464, Mogi Guaçu - SP, 13848-680, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:41:43",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FRT8A49",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 13046040,
              "description": "61265",
              "consume": 0,
              "producer": "",
              "ativo_name": "61265",
              "odometer": 907005440
          },
          "validate": 1,
          "lat_lng": [
              -22.4493,
              -46.981512
          ],
          "ativo_id": 820679,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "SP-147, Jardim Maria Beatriz, Mogi Mirim - SP, 13801-540, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:50:09",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "CVN-6414\t",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70004",
              "consume": 0,
              "producer": "",
              "ativo_name": "70004",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.726715,
              -47.327358
          ],
          "ativo_id": 820991,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Terrapavi Terraplenagens e Transportes, Avenida Bandeirantes, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:35:55",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GYS6J04",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 14538288,
              "description": "61112",
              "consume": 0,
              "producer": "",
              "ativo_name": "61112",
              "odometer": 979748030
          },
          "validate": 1,
          "lat_lng": [
              -22.449779,
              -46.980734
          ],
          "ativo_id": 821877,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Padre Roque, 2931, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:49:52",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "BTB-8673",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70008",
              "consume": 0,
              "producer": "",
              "ativo_name": "70008",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.726915,
              -47.327245
          ],
          "ativo_id": 823351,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Terrapavi Terraplenagens e Transportes, Avenida Bandeirantes, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:55",
          "direction": 216,
          "ativo": {
              "color": "",
              "plate": "FCQ-7I34",
              "fuel": "",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "00084",
              "consume": 0,
              "producer": "",
              "ativo_name": "00084",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.383024,
              -46.934783
          ],
          "ativo_id": 827747,
          "client_id": 157645,
          "speed": {
              "val": 17,
              "unit_measurement": "km/h"
          },
          "address": "Rua Mocóca, 401, Mogi Guaçu - SP, 13843-184, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:28",
          "direction": 329,
          "ativo": {
              "color": "",
              "plate": " OIO-7A67",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61220",
              "consume": 0,
              "producer": "",
              "ativo_name": "61220",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.099002,
              -47.27189
          ],
          "ativo_id": 830644,
          "client_id": 202880,
          "speed": {
              "val": 38,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Ottília Ferraz de Camargo, Indaiatuba - SP, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:38:40",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "OIH-8029",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61227",
              "consume": 0,
              "producer": "",
              "ativo_name": "61227",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.878797,
              -46.866682
          ],
          "ativo_id": 831039,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia José Bonifácio Coutinho Nogueira, Joaquim Egídio, Campinas - SP, 13106-001, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:26",
          "direction": 18,
          "ativo": {
              "color": "",
              "plate": "EME7C91",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01756",
              "consume": 0,
              "producer": "",
              "ativo_name": "01756",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.107424,
              -46.569433
          ],
          "ativo_id": 831238,
          "client_id": 92460,
          "speed": {
              "val": 48,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Fernão Dias, Mato Dentro, Atibaia - SP, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:51:29",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "DIU3224",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08476",
              "consume": 0,
              "producer": "",
              "ativo_name": "08476",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.234038,
              -46.866717
          ],
          "ativo_id": 833617,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Studio Cb Filmes, Vila Militar, Jundiaí - SP, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:57:16",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " OIJ5E17",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61208",
              "consume": 0,
              "producer": "",
              "ativo_name": "61208",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.142056,
              -46.917787
          ],
          "ativo_id": 833932,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Cecap, Jundiaí - SP, 13214-730, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:03:59",
          "direction": 162,
          "ativo": {
              "color": "",
              "plate": "OIC-7D57",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61203",
              "consume": 0,
              "producer": "",
              "ativo_name": "61203",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.117609,
              -47.233488
          ],
          "ativo_id": 836193,
          "client_id": 202880,
          "speed": {
              "val": 20,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Engenheiro Fábio Roberto Barnabé, Indaiatuba - SP, 13345-006, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:41:29",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " ESU-5725",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00996",
              "consume": 0,
              "producer": "",
              "ativo_name": "00996",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.758658,
              -47.360541
          ],
          "ativo_id": 836333,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua do Chumbo, 1361, Jardim Ipiranga, Americana - SP, 13468-600, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:58:40",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " GHI7C59",
              "fuel": "1",
              "model": "",
              "type": 16,
              "horimeter": 0,
              "description": "52101",
              "consume": 0,
              "producer": "",
              "ativo_name": "52101",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.356068,
              -46.919251
          ],
          "ativo_id": 836357,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Yvone de Araújo, 106, Mogi Guaçu - SP, 13848-389, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:35",
          "direction": 56,
          "ativo": {
              "color": "",
              "plate": "EOF-6314",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10886 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "10886 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.604214,
              -47.408089
          ],
          "ativo_id": 836981,
          "client_id": 87222,
          "speed": {
              "val": 21,
              "unit_measurement": "km/h"
          },
          "address": "Rua Adinir Irineu de Gaspari, 2272, Parque Res Santa Eulália, Limeira - SP, 13481-104, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:02:39",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "DPB-0740",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "07526",
              "consume": 0,
              "producer": "",
              "ativo_name": "07526",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.556703,
              -47.369179
          ],
          "ativo_id": 836984,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rododiesel Oficina Mecânica, Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:37",
          "direction": 130,
          "ativo": {
              "color": "",
              "plate": "GYS-6682",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10226 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "10226 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.493309,
              -47.209926
          ],
          "ativo_id": 845972,
          "client_id": 87222,
          "speed": {
              "val": 17,
              "unit_measurement": "km/h"
          },
          "address": "Rua Benedita Neves de Oliveira, 60, Engenheiro Coelho - SP, 13165-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:55:09",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " FRO-6H01",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61254",
              "consume": 0,
              "producer": "",
              "ativo_name": "61254",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.659801,
              -46.706285
          ],
          "ativo_id": 846096,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Benedito Fernandes, 107, Santo Amaro, São Paulo - SP, 04746-110, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:33",
          "direction": 65,
          "ativo": {
              "color": "",
              "plate": "HFD-6608",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11276 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11276",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.546306,
              -47.401875
          ],
          "ativo_id": 846926,
          "client_id": 87222,
          "speed": {
              "val": 21,
              "unit_measurement": "km/h"
          },
          "address": "Rua Bento Vaz de Lima, 30, Parque Res Anavec, Limeira - SP, 13485-095, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:47:10",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FQM-1486",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61275",
              "consume": 0,
              "producer": "",
              "ativo_name": "61275",
              "odometer": 287748000
          },
          "validate": 1,
          "lat_lng": [
              -22.44985,
              -46.981179
          ],
          "ativo_id": 849229,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Jardim Maria Beatriz, Mogi Mirim - SP, 13803-029, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 06:50:23",
          "direction": 87,
          "ativo": {
              "color": "",
              "plate": "ESU-5835",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "08816",
              "consume": 0,
              "producer": "",
              "ativo_name": "08816",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.264725,
              -46.827718
          ],
          "ativo_id": 855250,
          "client_id": 86155,
          "speed": {
              "val": 71,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia General Milton Tavares de Souza, Jundiaí - SP, 13205-005, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:44:12",
          "direction": 274,
          "ativo": {
              "color": "",
              "plate": "BTB-8648",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70015 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "70015 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.734398,
              -47.328461
          ],
          "ativo_id": 856286,
          "client_id": 136081,
          "speed": {
              "val": 32,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Bandeirantes, 2768, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:21",
          "direction": 305,
          "ativo": {
              "color": "",
              "plate": "FTQ1I54",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11436",
              "consume": 0,
              "producer": "",
              "ativo_name": "11436",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.456623,
              -46.97547
          ],
          "ativo_id": 859139,
          "client_id": 157645,
          "speed": {
              "val": 22,
              "unit_measurement": "km/h"
          },
          "address": "Rua Vicente Pereira de Lima, 540, Planalto Bela Vista, Mogi Mirim - SP, 13803-260, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:43:03",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FEI-1479",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "9286 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "9286 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.489188,
              -46.980625
          ],
          "ativo_id": 863537,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Mogi Mirim - SP, 13800-040, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:56:39",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "PQP2I36",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01616",
              "consume": 0,
              "producer": "",
              "ativo_name": "01616",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.142037,
              -46.917642
          ],
          "ativo_id": 864278,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Cecap, Jundiaí - SP, 13214-730, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:01",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GFD4D55",
              "fuel": "",
              "model": "",
              "type": 1,
              "horimeter": 0,
              "description": "00091",
              "consume": 0,
              "producer": "",
              "ativo_name": "00091",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449747,
              -46.98097
          ],
          "ativo_id": 864333,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "SP-340, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-029, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:34:54",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "KRF-9871",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51338 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "51338 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.849162,
              -47.027058
          ],
          "ativo_id": 865681,
          "client_id": 196231,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Restaurante Splendido, Parque Imperador, Campinas - SP, 13097-105, Brasil",
          "client": "TransNetti"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:52:04",
          "direction": 232,
          "ativo": {
              "color": "",
              "plate": " EPU4J52 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61022 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "61022 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.143096,
              -47.235836
          ],
          "ativo_id": 866026,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Esmeralda Martini Paula, 347, Indaiatuba - SP, 13347-636, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:41",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "KRF-8887",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51339",
              "consume": 0,
              "producer": "",
              "ativo_name": "51339",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.000895,
              -47.107302
          ],
          "ativo_id": 866783,
          "client_id": 196231,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Benedicto Aparecido Becker da Roza, 341, Jardim Nova América, Campinas - SP, 13053-008, Brasil",
          "client": "TransNetti"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:39:58",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " EYA-0570",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00010",
              "consume": 0,
              "producer": "",
              "ativo_name": "00010",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.557033,
              -47.369834
          ],
          "ativo_id": 867293,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:20",
          "direction": 113,
          "ativo": {
              "color": "",
              "plate": " DVT-7403",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11176",
              "consume": 0,
              "producer": "",
              "ativo_name": "11176",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.545459,
              -47.364848
          ],
          "ativo_id": 869468,
          "client_id": 87222,
          "speed": {
              "val": 90,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Engenheiro João Tosello, Jardim Nova Limeira, Limeira - SP, 13486-264, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:42",
          "direction": 87,
          "ativo": {
              "color": "",
              "plate": " DVT-7394",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11186",
              "consume": 0,
              "producer": "",
              "ativo_name": "11186",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.487696,
              -47.23631
          ],
          "ativo_id": 869469,
          "client_id": 87222,
          "speed": {
              "val": 95,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Engenheiro João Tosello, Engenheiro Coelho - SP, 13165-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:39",
          "direction": 291,
          "ativo": {
              "color": "",
              "plate": " HJI-0332",
              "fuel": "",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09596",
              "consume": 0,
              "producer": "",
              "ativo_name": "09596",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.182746,
              -46.855859
          ],
          "ativo_id": 869470,
          "client_id": 86155,
          "speed": {
              "val": 21,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Nami Azem, 78, Colônia, Jundiaí - SP, 13219-655, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:59:45",
          "direction": 34,
          "ativo": {
              "color": "",
              "plate": "FCR6D99",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51801",
              "consume": 0,
              "producer": "",
              "ativo_name": "51801",
              "odometer": 442156000
          },
          "validate": 1,
          "lat_lng": [
              -22.76614,
              -47.398122
          ],
          "ativo_id": 869504,
          "client_id": 136081,
          "speed": {
              "val": 30,
              "unit_measurement": "km/h"
          },
          "address": "Rua Wilcon Pereira, 50, Parque Residencial Santa Inês, Santa Bárbara d'Oeste - SP, 13457-056, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:45:53",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FFI-6187",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70018",
              "consume": 0,
              "producer": "",
              "ativo_name": "70018 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.58417,
              -47.367566
          ],
          "ativo_id": 875073,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Jardim Anhanguera, Limeira - SP, 13480-181, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "24/03/2024 22:34:22",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " GCN - 5879",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01386 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "01386 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.198955,
              -46.819319
          ],
          "ativo_id": 875516,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Auto Eletrica Huga, Avenida Pacaembu, 2051, Várzea Paulista - SP, 13222-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:02:53",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "EOF-5482",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61810",
              "consume": 0,
              "producer": "",
              "ativo_name": "61810",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.44938,
              -46.979854
          ],
          "ativo_id": 876449,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 124, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:40",
          "direction": 3,
          "ativo": {
              "color": "",
              "plate": "FCQ-1564",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 10104217,
              "description": "12286",
              "consume": 0,
              "producer": "",
              "ativo_name": "12286",
              "odometer": 75490693
          },
          "validate": 1,
          "lat_lng": [
              -22.575852,
              -47.366524
          ],
          "ativo_id": 876918,
          "client_id": 87222,
          "speed": {
              "val": 86,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Jardim Olga Veroni, Limeira - SP, 13487-154, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:45",
          "direction": 193,
          "ativo": {
              "color": "",
              "plate": "EZZ2F45",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12296",
              "consume": 0,
              "producer": "",
              "ativo_name": "12296",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.390352,
              -46.945058
          ],
          "ativo_id": 877023,
          "client_id": 157645,
          "speed": {
              "val": 19,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Mogi Mirim, Mogi Guaçu - SP, 13844-110, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:26:13",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FOP5C83",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12306",
              "consume": 0,
              "producer": "",
              "ativo_name": "12306",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.210157,
              -46.810286
          ],
          "ativo_id": 877346,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Particular, 373, Várzea Paulista - SP, 13223-025, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:44",
          "direction": 39,
          "ativo": {
              "color": "",
              "plate": "GFQ9F74",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 11761155,
              "description": "61272",
              "consume": 0,
              "producer": "",
              "ativo_name": "61272",
              "odometer": 84629362
          },
          "validate": 1,
          "lat_lng": [
              -22.286863,
              -47.140421
          ],
          "ativo_id": 878721,
          "client_id": 157645,
          "speed": {
              "val": 15,
              "unit_measurement": "km/h"
          },
          "address": "Rua José Barbosa da Silva, Martinho Prado Júnior, Mogi Guaçu - SP, 13855-135, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:32",
          "direction": 201,
          "ativo": {
              "color": "",
              "plate": "FOE8J65",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 10876896,
              "description": "61273",
              "consume": 0,
              "producer": "",
              "ativo_name": "61273",
              "odometer": 55567891
          },
          "validate": 1,
          "lat_lng": [
              -22.385774,
              -46.932458
          ],
          "ativo_id": 878849,
          "client_id": 157645,
          "speed": {
              "val": 8,
              "unit_measurement": "km/h"
          },
          "address": "Rua Afonso Franco Pinheiro, 156, Mogi Guaçu - SP, 13843-126, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:40:36",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GFM5J12",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 10507969,
              "description": "12316 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "12316 ",
              "odometer": 71537369
          },
          "validate": 1,
          "lat_lng": [
              -23.138598,
              -46.91806
          ],
          "ativo_id": 879032,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Professora Odila Richter, 255, Parque Centenário, Jundiaí - SP, 13214-760, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:46",
          "direction": 15,
          "ativo": {
              "color": "",
              "plate": "GKH6A46",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61271",
              "consume": 0,
              "producer": "",
              "ativo_name": "61271",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.338774,
              -47.16196
          ],
          "ativo_id": 879471,
          "client_id": 157645,
          "speed": {
              "val": 37,
              "unit_measurement": "km/h"
          },
          "address": "Rua Carmem Zafra Garcia de Puertas, Conchal - SP, 13835-000, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:46",
          "direction": 39,
          "ativo": {
              "color": "",
              "plate": " FGGP3A97",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12226",
              "consume": 0,
              "producer": "",
              "ativo_name": "12226",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.545906,
              -47.422709
          ],
          "ativo_id": 884206,
          "client_id": 87222,
          "speed": {
              "val": 1,
              "unit_measurement": "km/h"
          },
          "address": "Anel Viário, Res Terras de São Bento I, Limeira - SP, 13484-130, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:40",
          "direction": 356,
          "ativo": {
              "color": "",
              "plate": "GCD6A69  ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11466  ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11466 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.762622,
              -47.359221
          ],
          "ativo_id": 885799,
          "client_id": 136081,
          "speed": {
              "val": 7,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Giaconda Cibin, Jardim Brasília, Americana - SP, 13468-800, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:36:15",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "  GHW2I46",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12326",
              "consume": 0,
              "producer": "",
              "ativo_name": "12326",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.680921,
              -47.292503
          ],
          "ativo_id": 885954,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Ajinomoto do Brasil, Limeira - SP, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "11/07/2023 15:35:29",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FSC-5711\t",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "01315",
              "consume": 0,
              "producer": "",
              "ativo_name": "01315",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.850598,
              -47.046718
          ],
          "ativo_id": 893559,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Dr. Lourenço M. de Almeida Prado, 91, Parque Fazenda Santa Cândida, Campinas - SP, 13087-545, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:41",
          "direction": 91,
          "ativo": {
              "color": "",
              "plate": "GFJ-1680",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00002",
              "consume": 0,
              "producer": "",
              "ativo_name": "00002",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.153085,
              -46.873698
          ],
          "ativo_id": 897419,
          "client_id": 86155,
          "speed": {
              "val": 26,
              "unit_measurement": "km/h"
          },
          "address": "Jundiaí Mirim, Avenida Humberto Cereser, Jundiaí Mirim, Jundiaí - SP, 13216-700, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:39",
          "direction": 49,
          "ativo": {
              "color": "",
              "plate": "GIA-5540",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61280",
              "consume": 0,
              "producer": "",
              "ativo_name": "61280",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.32656,
              -46.925187
          ],
          "ativo_id": 898750,
          "client_id": 157645,
          "speed": {
              "val": 31,
              "unit_measurement": "km/h"
          },
          "address": "Alameda Rubens Martini, 320, Mogi Guaçu - SP, 13848-833, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:44:56",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FTS-9595",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61274",
              "consume": 0,
              "producer": "",
              "ativo_name": "61274",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.489124,
              -46.979701
          ],
          "ativo_id": 902701,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Mogi Mirim - SP, 13800-040, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:49:20",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "BWV-0870",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70036",
              "consume": 0,
              "producer": "",
              "ativo_name": "70036",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.727211,
              -47.326959
          ],
          "ativo_id": 909407,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Bandeirantes, 4100, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:52:40",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " GYS-6898",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10396",
              "consume": 0,
              "producer": "",
              "ativo_name": "10396",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.554124,
              -47.374989
          ],
          "ativo_id": 910254,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Pacheco's Parrilla, Bairro Pires, Limeira - SP, 13486-199, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:43:14",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " BTB-8647",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70014",
              "consume": 0,
              "producer": "",
              "ativo_name": "70014",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.584103,
              -47.367736
          ],
          "ativo_id": 916332,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Orlando Modolo, 1255, Jardim Anhanguera, Limeira - SP, 13487-162, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:36",
          "direction": 280,
          "ativo": {
              "color": "",
              "plate": "FKS-0205",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70011",
              "consume": 0,
              "producer": "",
              "ativo_name": "70011",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.726863,
              -47.401778
          ],
          "ativo_id": 918841,
          "client_id": 136081,
          "speed": {
              "val": 24,
              "unit_measurement": "km/h"
          },
          "address": "Rua Mogi Guaçu, Jardim Barão, Santa Bárbara d'Oeste - SP, 13453-717, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:46",
          "direction": 193,
          "ativo": {
              "color": "",
              "plate": "OZK-4284",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61809",
              "consume": 0,
              "producer": "",
              "ativo_name": "61809",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.41563,
              -46.953943
          ],
          "ativo_id": 918858,
          "client_id": 157645,
          "speed": {
              "val": 30,
              "unit_measurement": "km/h"
          },
          "address": "Rua do Tucura, Vila Santa Luzia, Mogi Mirim - SP, 13807-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:18",
          "direction": 115,
          "ativo": {
              "color": "",
              "plate": "FKW-6E71",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61277",
              "consume": 0,
              "producer": "",
              "ativo_name": "61277",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.274242,
              -46.945423
          ],
          "ativo_id": 919922,
          "client_id": 157645,
          "speed": {
              "val": 17,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luciano Fagundes Gerbi, Estiva Gerbi - SP, 13857-000, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:22",
          "direction": 75,
          "ativo": {
              "color": "",
              "plate": "FKD7H53",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61278",
              "consume": 0,
              "producer": "",
              "ativo_name": "61278",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.328193,
              -46.950518
          ],
          "ativo_id": 920583,
          "client_id": 157645,
          "speed": {
              "val": 21,
              "unit_measurement": "km/h"
          },
          "address": "Avenida dos Ypes, 160, Mogi Guaçu - SP, 13846-250, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:31:09",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " FQQ-7H71",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09406",
              "consume": 0,
              "producer": "",
              "ativo_name": "09406",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.328968,
              -46.710005
          ],
          "ativo_id": 922912,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua José Primo Lerussi, 822, Franco da Rocha - SP, 07858-020, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:19",
          "direction": 192,
          "ativo": {
              "color": "",
              "plate": " HFD6F82 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11296 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "11296 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.369635,
              -47.164247
          ],
          "ativo_id": 924130,
          "client_id": 87222,
          "speed": {
              "val": 77,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Professor Zeferino Vaz, Tujuguaba, Conchal - SP, 13839-000, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:47:32",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " OIJ-5067",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61225",
              "consume": 0,
              "producer": "",
              "ativo_name": "61225",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449657,
              -46.980932
          ],
          "ativo_id": 925995,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Padre Roque, 2931, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:41:06",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GHP5H78 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10756 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "10756 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.142105,
              -46.917785
          ],
          "ativo_id": 926409,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Cecap, Jundiaí - SP, 13214-730, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:28",
          "direction": 33,
          "ativo": {
              "color": "",
              "plate": " DCU9C89\t",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00067",
              "consume": 0,
              "producer": "",
              "ativo_name": "00067",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.114215,
              -46.589457
          ],
          "ativo_id": 926942,
          "client_id": 92460,
          "speed": {
              "val": 3,
              "unit_measurement": "km/h"
          },
          "address": "Estrada Municipal do Guaperuvú, 249, Caetetuba, Atibaia - SP, 12952-170, Brasil",
          "client": "Vesper Atibaia"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:59:33",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FVS6E24",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61279",
              "consume": 0,
              "producer": "",
              "ativo_name": "61279",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.330326,
              -46.930334
          ],
          "ativo_id": 929440,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Levi Martins, 3, Mogi Guaçu - SP, 13848-815, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:09",
          "direction": 169,
          "ativo": {
              "color": "",
              "plate": "FJZ4A52",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61276",
              "consume": 0,
              "producer": "",
              "ativo_name": "61276",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.427577,
              -46.952958
          ],
          "ativo_id": 929615,
          "client_id": 157645,
          "speed": {
              "val": 6,
              "unit_measurement": "km/h"
          },
          "address": "Rua Doutor Ulhoa Cintra, 141, Centro, Mogi Mirim - SP, 13800-061, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:27",
          "direction": 210,
          "ativo": {
              "color": "",
              "plate": "GCO2I86",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61270",
              "consume": 0,
              "producer": "",
              "ativo_name": "61270",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.353193,
              -46.91448
          ],
          "ativo_id": 931514,
          "client_id": 157645,
          "speed": {
              "val": 17,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Emília Marchi Martini, 3180, Mogi Guaçu - SP, 13848-020, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "22/03/2024 15:16:41",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " OII-8B27",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61215",
              "consume": 0,
              "producer": "",
              "ativo_name": "61215",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449705,
              -46.980476
          ],
          "ativo_id": 931522,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 226, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:01:29",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FTNOF31",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11736",
              "consume": 0,
              "producer": "",
              "ativo_name": "11736",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.138111,
              -46.914739
          ],
          "ativo_id": 931588,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Edgard Armonde, 370, Parque Centenário, Jundiaí - SP, 13214-767, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:41",
          "direction": 233,
          "ativo": {
              "color": "",
              "plate": " FRP9A46",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61269",
              "consume": 0,
              "producer": "",
              "ativo_name": "61269",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.431061,
              -46.939968
          ],
          "ativo_id": 931983,
          "client_id": 157645,
          "speed": {
              "val": 25,
              "unit_measurement": "km/h"
          },
          "address": "Rua Padre José Joaquim de O. Brazeiros, 196, Loteamento Linda Chaib, Mogi Mirim - SP, 13802-492, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:58:20",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " PUU2F48",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11426",
              "consume": 0,
              "producer": "",
              "ativo_name": "11426",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -21.593969,
              -48.350672
          ],
          "ativo_id": 935334,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Amazonas, 606, Matão - SP, 15997-118, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:50:32",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " FYF-0849",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "51806",
              "consume": 0,
              "producer": "",
              "ativo_name": "51806",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.726831,
              -47.327347
          ],
          "ativo_id": 935665,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Terrapavi Terraplenagens e Transportes, Avenida Bandeirantes, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:03",
          "direction": 258,
          "ativo": {
              "color": "",
              "plate": "FZX0I72",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61281",
              "consume": 0,
              "producer": "",
              "ativo_name": "61281",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.435947,
              -46.973042
          ],
          "ativo_id": 936430,
          "client_id": 157645,
          "speed": {
              "val": 37,
              "unit_measurement": "km/h"
          },
          "address": "Rua Santa Cruz, 766, Santa Cruz, Mogi Mirim - SP, 13800-440, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:01:08",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " OQP-4866\t",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10636",
              "consume": 0,
              "producer": "",
              "ativo_name": "10636",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141972,
              -46.917426
          ],
          "ativo_id": 938214,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Nelson Martinho, Cecap, Jundiaí - SP, 13214-718, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:59:12",
          "direction": 337,
          "ativo": {
              "color": "",
              "plate": " GSY6J06",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61109",
              "consume": 0,
              "producer": "",
              "ativo_name": "61109",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.130031,
              -46.714293
          ],
          "ativo_id": 941277,
          "client_id": 86155,
          "speed": {
              "val": 12,
              "unit_measurement": "km/h"
          },
          "address": "Art Pedras Cantareira, Estrada Municipal Atílio Squizato, Jarinu - SP, 13240-000, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 14:38:56",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " EJC7D39 ",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70120 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "70120 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.727156,
              -47.326904
          ],
          "ativo_id": 943532,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua 7, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:04:43",
          "direction": 72,
          "ativo": {
              "color": "",
              "plate": " ESU-5953",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "09126 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "09126 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.56644,
              -47.431891
          ],
          "ativo_id": 944065,
          "client_id": 87222,
          "speed": {
              "val": 27,
              "unit_measurement": "km/h"
          },
          "address": "Rua Arnaldo Stocco, 733, Limeránea, Limeira - SP, 13482-375, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:40:41",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "  CSK-2711",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "10316 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "10316 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.576049,
              -47.453764
          ],
          "ativo_id": 947622,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Professor Ari Pereira Souto, Jardim Águas da Serra, Limeira - SP, 13482-713, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:44:35",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GEH-2E25",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "52108 ",
              "consume": 0,
              "producer": "",
              "ativo_name": "52108 ",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.17696,
              -47.312436
          ],
          "ativo_id": 947629,
          "client_id": 202880,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida José Maria Marques de Oliveira, 1060, Jardim Alvorada, Salto - SP, 13327-300, Brasil",
          "client": "Transnetti Indaiatuba"
      },
      {
          "ignition": 1,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:13",
          "direction": 99,
          "ativo": {
              "color": "",
              "plate": " DST3A79",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70530",
              "consume": 0,
              "producer": "",
              "ativo_name": "70530",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.734228,
              -47.376377
          ],
          "ativo_id": 948293,
          "client_id": 136081,
          "speed": {
              "val": 21,
              "unit_measurement": "km/h"
          },
          "address": "Jardim Pérola, Santa Bárbara d'Oeste - SP, 13454-215, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:03:03",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " EJL-6990",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00011",
              "consume": 0,
              "producer": "",
              "ativo_name": "00011",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.812123,
              -47.213156
          ],
          "ativo_id": 953229,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Nova Veneza, Sumaré - SP, 13177-050, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:39:24",
          "direction": 325,
          "ativo": {
              "color": "",
              "plate": "  GBP2A47",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "00082",
              "consume": 0,
              "producer": "",
              "ativo_name": "00082",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.44933,
              -46.98011
          ],
          "ativo_id": 953236,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 154, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 15:01:17",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "OND-7923",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12356",
              "consume": 0,
              "producer": "",
              "ativo_name": "12356",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.141867,
              -46.917682
          ],
          "ativo_id": 953311,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Nelson Martinho, Cecap, Jundiaí - SP, 13214-718, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 11:58:00",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "OND-8593",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12336",
              "consume": 0,
              "producer": "",
              "ativo_name": "12336",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -23.226787,
              -46.842339
          ],
          "ativo_id": 953427,
          "client_id": 86155,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Kypao, Rua Pará, 40, Várzea Paulista - SP, 13225-130, Brasil",
          "client": "Vesper Jundiai"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:27:52",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " EHC-0560",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "11106",
              "consume": 0,
              "producer": "",
              "ativo_name": "11106",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.556803,
              -47.369005
          ],
          "ativo_id": 954395,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rodovia Anhanguera, Jardim Nova Limeira, Limeira - SP, 13486-850, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:14:55",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "GEZ-1940",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70007",
              "consume": 0,
              "producer": "",
              "ativo_name": "70007",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.85162,
              -47.165416
          ],
          "ativo_id": 955199,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua José Ramos da Paixão, 104, Área Cura, Sumaré - SP, 13180-590, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 13:31:21",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "ENI-1209",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70035",
              "consume": 0,
              "producer": "",
              "ativo_name": "70035",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.851762,
              -47.16565
          ],
          "ativo_id": 955201,
          "client_id": 136081,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Gumercindo de Couto, 503, Área Cura, Sumaré - SP, 13180-520, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:01:04",
          "direction": 76,
          "ativo": {
              "color": "",
              "plate": "EHE-5570",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70037",
              "consume": 0,
              "producer": "",
              "ativo_name": "70037",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.848116,
              -47.17721
          ],
          "ativo_id": 955210,
          "client_id": 136081,
          "speed": {
              "val": 41,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Américo Ribeiro dos Santos, 600, Área Cura, Sumaré - SP, 13181-715, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:01:01",
          "direction": 284,
          "ativo": {
              "color": "",
              "plate": "DSS-5679",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70038",
              "consume": 0,
              "producer": "",
              "ativo_name": "70038",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.808883,
              -47.215409
          ],
          "ativo_id": 955212,
          "client_id": 136081,
          "speed": {
              "val": 24,
              "unit_measurement": "km/h"
          },
          "address": "Nova Veneza, Sumaré - SP, 13174-530, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:01:54",
          "direction": 214,
          "ativo": {
              "color": "",
              "plate": "EZZ-0720",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70039",
              "consume": 0,
              "producer": "",
              "ativo_name": "70039",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.864371,
              -47.224093
          ],
          "ativo_id": 955213,
          "client_id": 136081,
          "speed": {
              "val": 14,
              "unit_measurement": "km/h"
          },
          "address": "Rua Santana, 213, Parque Orestes Ongaro, Hortolândia - SP, 13188-000, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:37",
          "direction": 330,
          "ativo": {
              "color": "",
              "plate": "DFV-5E99",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70040",
              "consume": 0,
              "producer": "",
              "ativo_name": "70040",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.859045,
              -47.290811
          ],
          "ativo_id": 955214,
          "client_id": 136081,
          "speed": {
              "val": 44,
              "unit_measurement": "km/h"
          },
          "address": "114, Sumaré - SP, 13172-255, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 1,
          "is_bloqued": 1,
          "dt_gps": "25/03/2024 15:04:30",
          "direction": 229,
          "ativo": {
              "color": "",
              "plate": "FXY-6378",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70043",
              "consume": 0,
              "producer": "",
              "ativo_name": "70043",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.834821,
              -47.156768
          ],
          "ativo_id": 955218,
          "client_id": 136081,
          "speed": {
              "val": 12,
              "unit_measurement": "km/h"
          },
          "address": "Rua São Bartolomeu, 525, Matão, Sumaré - SP, 13180-310, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:52:40",
          "direction": 42,
          "ativo": {
              "color": "",
              "plate": "BYP-9420",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "70047",
              "consume": 0,
              "producer": "",
              "ativo_name": "70047",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.812554,
              -47.21367
          ],
          "ativo_id": 955220,
          "client_id": 136081,
          "speed": {
              "val": 30,
              "unit_measurement": "km/h"
          },
          "address": "Log Falcon, Nova Veneza, Sumaré - SP, 13177-050, Brasil",
          "client": "Vesper Americana"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 01:27:46",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": " GBZ1J69\t",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61801",
              "consume": 0,
              "producer": "",
              "ativo_name": "61801",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449804,
              -46.980605
          ],
          "ativo_id": 955784,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 232, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:53:09",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FVI8A01",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61282",
              "consume": 0,
              "producer": "",
              "ativo_name": "61282",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.389465,
              -46.92818
          ],
          "ativo_id": 956386,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Avenida Clotilde Miachon Bueno, 751, Mogi Guaçu - SP, 13842-300, Brasil",
          "client": "ByBus"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:49:51",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "OND-8933",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "12376",
              "consume": 0,
              "producer": "",
              "ativo_name": "12376",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.611801,
              -47.40594
          ],
          "ativo_id": 956743,
          "client_id": 87222,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Holanda, 1, Jardim Res Ernesto Kuhl, Limeira - SP, 13481-811, Brasil",
          "client": "Vesper Limeira"
      },
      {
          "ignition": 0,
          "is_bloqued": 0,
          "dt_gps": "25/03/2024 14:54:20",
          "direction": 0,
          "ativo": {
              "color": "",
              "plate": "FSR3H44",
              "fuel": "1",
              "model": "",
              "type": 4,
              "horimeter": 0,
              "description": "61811",
              "consume": 0,
              "producer": "",
              "ativo_name": "61811",
              "odometer": 0
          },
          "validate": 1,
          "lat_lng": [
              -22.449266,
              -46.97991
          ],
          "ativo_id": 962149,
          "client_id": 157645,
          "speed": {
              "val": 0,
              "unit_measurement": "km/h"
          },
          "address": "Rua Luiz Gonzaga, 181, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
          "client": "ByBus"
      }
  ]
  );
 
  const menu: MenuLink[] = [
    { label: t("menu_names.dashboard"), href: "#", icon: "dashboard" },
    { label: t("menu_names.general_map"), href: "#", icon: "world" },
    { label: t("menu_names.mosaic"), href: "#", icon: "interface" },
    { label: t("menu_names.relatories"), href: "#", icon: "chart" },
    { label: t("menu_names.logistic"), href: "#", icon: "navigation" },
    { label: t("menu_names.driver_behavior"), href: "#", icon: "direction" },
    { label: t("menu_names.administrative_panel"), href: "#", icon: "briefcase" },
    { label: t("menu_names.registers"), href: "#", icon: "add" },
    { label: t("menu_names.settings"), href: "#", icon: "settings" },
  ];

  const isFirstRender = useRef(true);

  
  // useEffect(() => {
  //   if(isFirstRender.current) {
  //     isFirstRender.current = false;

  //     async function getAllData() {
  //       if(authTokens) {
  //         const vehicles: Vehicle[] = await getVehicles(authTokens.authToken);

  //         const clients: Client[] = await getClients(authTokens.authToken);

  //         const addressData: AddressRequestParams[] = vehicles.map((vehicle: Vehicle) => {
  //           const addressParams: AddressRequestParams = {              
  //             "code": vehicle.ativo_id,
  //             "latitude": vehicle.lat_lng[0].toString(),
  //             "longitude": vehicle.lat_lng[1].toString(),
  //           }
  //           return addressParams;
  //         });

  //         const address: Address[] = await getAddress(authTokens.authToken, addressData);

  //         const forrmatedVehicles: FormatedVehicle[] = vehicles.map((vehicle: Vehicle) => {
  //           const vehicleAddress: Address = address.filter((address: Address) => address.code == vehicle.ativo_id)[0];
  //           const vehicleCLient: Client = clients.filter((client: Client) => client.client_id === vehicle.client_id)[0];
  //           return {
  //             ...vehicle,
  //             address: vehicleAddress.label,
  //             client: vehicleCLient.client_description
  //           }
  //         })

  //         setVehicles(forrmatedVehicles);
  //         console.log(forrmatedVehicles);
  //       }
  //     }

  //     getAllData();
      
  //   }
  // }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {

  const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
  }

  const handleSearch = () => console.log(searchValue);

  const handleToggleSidebar = () => {
    setResizeMap(previous => !previous);

  }

  return (
    <StyledDiv>
      <NavContainer>
      <Navbar />
      </NavContainer>
        
      <MenuContainer>
        <Menu 
        menuLinks={menu}
        />
      </MenuContainer>

      <SideBarContainer>
        <Sidebar onClick={handleToggleSidebar}>
          <DividerBox>
            <Searchbar 
              placeholder="Pesquisar..." 
              value={searchValue}
              onChange={handleSearchChange}
              handleSearch={handleSearch}
            />
          </DividerBox>

          <VehiclesCardsContainer>
            {vehicles && vehicles.map((vehicle: FormatedVehicle) => 
                <DividerBox key={vehicle.ativo_id}>
                  <VehicleCard vehicle={vehicle}></VehicleCard>
                </DividerBox>
            )}  
          </VehiclesCardsContainer>
        </Sidebar>
      </SideBarContainer>
     <MapContainer>
        {
        <Map 
          size={resizeMap}
          apikey="v3XFar3gKIuWv7fn4sNSVWtQy9MD9-yq5rCh5f0tpfA"
          vehicles={vehicles}
        /> }
     </MapContainer>
      
    </StyledDiv>
  )
}

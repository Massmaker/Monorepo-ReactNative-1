import React from 'react';
import {View, Text, Platform} from 'react-native';
import style from './Landscape.style';

import {Link} from '../../components/Link'
import {routesMap} from '../../utils/router'

import { AreaChart, BarChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import topojson , {feature} from 'topojson-client';
import * as Geo from 'd3-geo';
import Svg, { G, Path} from 'react-native-svg';
import dataJSON from '../../assets/countries-110m.json';


const width = 300;
const height = 300;

//read a geographies array from Topojson file
const geographies = feature(dataJSON, dataJSON.objects.countries).features;

const projection = Geo.geoMercator()
                        .scale(Math.min(height, width) / 7)
                        .translate([width / 2, height / 2]);

const colors = ['yellow', 'blue', 'red'];



export function Landscape() {
  const isWEB = Platform.OS === 'web'
  const aFlexDirection = isWEB ? 'row' : 'column'

  const color_0 = '#1d4f5f'
  const data_0 = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

  const color_1 = '#411461'
  const data_1 = [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80]

  return (


    <View style={style.container}>
      <Text style={style.text}>Landscape Native</Text>
      <Link style={style.buttonContainer}
            routeName={routesMap.login.root.path}>
        <Text style={style.buttonText}>LOGOUT</Text>
      </Link>

      <View style={{flexDirection: aFlexDirection}}>
      <AreaChart
                style={{ width: 300, height: 200 }}
                data={data_0}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{ fill: color_0 }}
      >
        <Grid />
      </AreaChart>

      <BarChart style={{ width: 300, height: 200 , left: isWEB ? 100 : 0}}
                data={data_1}
                svg={{ fill: color_1 }}
                contentInset={{ top: 30, bottom: 30 }}
      >
        <Grid />
      </BarChart>
      </View>
      <Svg width={width} height={height} >
        <G>
          {
            geographies.map((d:Geo.GeoPermissibleObjects, index:any) => {
              let path = Geo.geoPath(projection)(d);
              return (
                <Path key={`path-${index}`}
                      d={path}
                      stroke='#adadad'
                      fill={colors[Math.floor(Math.random() * colors.length)]} //simpli color sountries with 3 different colors
                      strokeWidth={1}
                      >

                </Path>
              )
            })
          }
            
        </G>
      </Svg>

    </View>
  );
}

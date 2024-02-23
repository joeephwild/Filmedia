import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { interval, limit, tokenType } from "../utils/contants";
import { useQuery } from "@airstack/airstack-react";
import dayjs, { Dayjs } from "dayjs";
import formatFunction from "./trendingMInts/format";
import scoringFunction from "./trendingMInts/scoring";
import filterFunction from "./trendingMInts/filter";
import { TrendingQuery } from "../utils/Query";
import { Dimensions } from "react-native";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";



export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const imageUrls = [
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBUTERESFhUXEhoYFhgVGRcXGhkcGBoZGhcXFRgbHSghGBolHhcbIjEiJSkrMC4uGiA1ODMtNygtLisBCgoKDg0OGxAQGy0lICYxLTItLy4vLS4tLTUtLS8vNSsvLS0uLS0tMi8tLTUtLSstLS0tLS0rLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcCBAUDAQj/xABREAACAQIDBQQECAkIBwkAAAABAgADEQQSIQUGMUFRBxMiYTJxgZEUI0JSYnKhsRczNIKTorLBwhUWQ4Sjw9HwJDVzdJKz0jZTVFVjg5SktP/EABoBAQADAQEBAAAAAAAAAAAAAAABBAUDAgb/xAAuEQACAgEDAwEGBgMAAAAAAAAAAQIDEQQhMRJBURMFFDJhcbEiM0JSgZFiofD/2gAMAwEAAhEDEQA/ALTxuLZ2Ovh5D95mtAiXkklhGLKTk8sRESTyIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCe2GxLIbg6cxyM8YhrPJKk08o7vw+n1+6JwInH0UWve5+DIRETsVBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAMYiIJMhECIIEREAREQBERAERMajhQWYgAC5JNgPMk8IBlE4VfevDg2oipXbpRW41+mxVCPUTMTtnEHhRpIPp1CxHrVUt7mlazWUQ+KS+/wBi3XodRZvGD+33O/Eh/wDOHF38ApV/KnSZF/TNVKn2AnynSp7wMqhq9AoLeIo4qBfXcKT+aCfKeY66iX6v72PU/Z2pj+nP03O9E0KW2sKy5hiKVvNgpv0INiD5GbOGxVOoCadRHANiUYMB5GxlpNPgpuLXKPaIiSQIiIAiIgCIiAIiIAiIgGMREEmUQIggREQBERAEREA4209qVM7UqGQFbZ3bxBSQGCqgIu2Ug3JAGZfS1A5FXZyVCGrM9ZhwNU3AI5qgsinXkom1iaYXFVx8/u6vvTurf2P2zRxGOOYols5cIt+Ry52c9VCkG3M6aXnzWuvtlbKGdl2Pq/Z+npjTGxLd9zeRABYAAdBpMawU2DW1OgPO2vDn19k83daVMliTbiSdWJ+y5PqHqE5uzafwgms9ilyFHFWsbH8wEaD5RGY/Jy0Eu5pN9jebGFtKK5+WYnKg/O+V+aD7Jz8dsqu9naqrsuvd2NOm30cwYsp87kdQZsmuKNfKxAp1bspOgVxcuCeQYDN683UTkVt5qhdjSpAreyFzlFh8oAAsb8dbaAdTOkISfwo5znFfEztYA0KtKy01UA2ZCoBUg6ggcCCOI6TXNJc5SqzI6i9KsrBXZOYz2uGU2BHMZTzNoniKuMeq1QYgUi9swpIATYWBLMTrawvbkOk5zbBVzmr1q9Y/+o5I/wAftliGnaeerH3K89RFrGM/Ys7YO3Upu1Gvi1qAIXSpUamCACAyOwABtcEHjqb8J67S31wyWWie+c+jZgiddar2W3mL252leYfB0qfoU0X1AD7Z6rTAJPM8+fq9XlNKGrnGCi9/mZNmirnNyWy8diwtlb1UHYUnr0nrE6iiGyLe+VVZ/wAYdLXXU8coHCRSn8NWelUSrSsHQ3XkCNQUb6LAkH2HiBLV2TtFMRRWrTvZhqDa6kaMjW+UDoZe09/qL5mfqtN6TTXBtxESwVBERAEREAREQDGIiCTIREQQIiIAiIgCeGNxdOjTapUbKii5PH1AAakk6ADUkgT3lf8AaDta9QUV1WkM9S3N2HhU/VU5jp8teYnO2zoj1HWip2zUTR2zvc7Vu9REQKuXK92ZlJuveFTZCDe3G1zqbzlbM3lpti+9bQMLWFiA1gpswYi5AWw0PhMlew90Up0lqYhgKp8RBtlpk/JUni3VuJN+VhPXbW7aVaZzBaqW4jiB1U6/58phXdNknKXL7n0tDdUVGPC7HMxeITE4lKQ1pIbv0Z8uYUz+aQSOhYHlPba2O+CMXBDKx1pX8Wa3Gl5m2qnQnXTUyDE16VY4Jand5fjVcC7aeG6dMynXjbxDWb1PChLtdnex8bnM3qHQacBacfdsNZe33O/vO2y3N3E4qvjCS/d0qKajvCLXXizAcQDw14i/ScjE7YwaGxxhbX+iS4Pquh09s8+0Kp3eAwVNPRenmYj5VrWufdp5CV5NSFMILCRmztnN5bLA/nDs/nUxB9WYX9xFp74bbuzHdUVMazMwVQKrXJJsANeplcSxux7YWes+LceGl4KfQuw8R/NUj2uDynRRXhHjL8khx+yaVGm9Wph8UqIpZj8IU2A9T6zjbTxeEw7IKoxFIvTDqHd2bK3AsFY256EAyUb04tKtbuXP+j4ZBicZ521oUPWxGYjmMsp3HYmvj8YXtmq16oAA87KqjyAsPUIcY+CE35LAwq0Hod7TaoKQOtZqAJUqfETV7vvGXkbtbUiS7cMFMQ6isj06tAVUNO+V7MFzZT6LAEA663HzRaH9pOJTB4Chs6iRqoL+aob3I+nUu35pmlu3Wr/BMKtBnVyK4Jp6MULAFS/IXtrdbW0MldMH1Y4PM4ysj0Z5LyrYhE0d0UnhmIH3z1EqKluxXYMVRCxudC+p+kyqLes39s6m4WOfD1xh2uKdUsvdn+iqqCSB0vlZT1OXzv6r1inLGCtboHCDknnBZMREuGeIiIAiIgGMREEmQiBEECIiAIiIBr7Qxa0aT1W4IhY9TYcB5nh7ZWOyaZq4un3lyWrGrUtc3K5qpA+jdQAOlhLA3rpFsFXA4inmt1yEPb25ZAd1auXaNK/BgQP+Cpf+H3zP1zeUjV9nRWG+5YdHCA2eqoaoddQDkv8AJS/ADqONrmatakDVK4dVRwQalQCyi+oVlFhUYjkfRBvcXW/VE0di/iFbm96jetzmPuvb1ATONQhe+u7Yp1KWLV2JU929wuoqGw9EC3iII5ces4ssTe8D4DXJNgtPP/wEOPtWVzUGhHkZPKIONvyM2zMC+vhunuvx90gEslKVCvhWwtZ8j581NidCCSbC/Egki3T2TiVdylUXOMogX5ix++32zRW6yUuHgjOz8FUr1UpUxd3YKo8z16DqZf8AQp0dmbPA4rRp8uNRyeXm7mwHK/lIHunsGpg6xrIr1XyFUPwauwW/EgrpcjTjwJkg2jgdpYqpSNTD1ClJ+8UKFpAuALOwarmOW+gBU+lqNLw5xistkqLk9iJb97QajQGDZgcRWf4TjSPntrTojU2VRbThopHEz37INjg1KmMq2CUVKqTwDEXdr/RT9sSWY/cxKqO+Iwp5s7CpSV9Nb5slRyfW5mhsbYGIbDmhQ784RgwZM9BKgufEpYp4+BBsV6aieI3RfJ7dckVlvRthsZi6tc3szWQH5KDRF9dhr5knnLe7NtjBqIZ8wyUkQAHLZmHeVLka/KTgRznArbi0qVQXwVcC+j16lPur8u8amzZRe3Ee+9paWxdn/B6AQsCblnbgCx1NuijgPICeLrF04T5PVUX1ZZ4YHA5WqKKtcFHGUtUepdWAYAq5I0JK8L2A1vrIc2u2iE4fDKdvWEzVPbo15KsZtUYehUxBF2qv8Sh0zeELTv0BC5zzAJ5icHcPZpqYhsQ1yKZbxEDx1qgs7DzCsb20+MtyM56eLlYhqZqNTb/7JYURE2j54REQBERAMYiIJMogRBAiIgCIiAfGAIsdQeMqPGYZ8LiCq3z4eoCn0lFmS55hlsDbnccpbsju9uwDiFFSkB3yC1ibZ145CeoNypPUjTMSK+pqc47cot6O5Vzw+GdLZuPp16S1aZurD2g81bowOhEyw9Lu8wuMmYsPLMSzA+VySPI25a1rh8XiMI5Iz0ST4lqKQrW0uwawb6yngONp0jv81rNSwzdfjCP1MrffMhxaNxSTJJto99h6x/oloVCCeDt3bAEX+QLk35mxGgua+XhG922MbjsM6IrZNGYUgQoUak1GJJOgOhsDfgTafZLjhEKSbNSvggxuDa/EcRO/uBgcPTr1Ce7Ffux3OYKOObOU6t6F/L1mcua+Ow6ulmtprrwkJ9icG/vfj9sU6lqGHxLi2rjvWN78lpkKo8wNbzc3e3s2wAFxOz2IGpIDLUyjie7Zi7+sAnTgZrbC3MxlTx1q2LpUrXFIVagJHVhmuL8lFj1I4Cc7u7KXDhlSgtMEAk3zO7c8zcwBYak635AE+m4pYISecm7XxSNhzUWzI1PNcHQqw436WN7ytdrba2ilEUcHRQLmJrVajot6jtmammZxYIxyluZU9NbA2rgG+CYinStmZKhReAu92y+osT75ngEoV8KhChkNOwDWv0YMRzvcHzvPCeNz01khu6mOxOHps+0sRQCEG6d4tQsuU3ARSbtf5o1F730tKMPiGoYRfhKqlNKYDZmNRiOCoFA8bWsvE3PWQza266YZTVooVoVvSQizUnbTK3VSTYdDpqCLb2xNlY3aC0qmJdlo5FYE2W4Kj8Qg4XBPxja2OlwdOsa3Y/wnKdka1mTFPD4namIL606S3XObHu1uLpT5PVPM6qCNb2CmwcDg6dGmtKkuVFFgNT7STqSTqSdSSZlhcMlNFp01CoosqjgBPWatNKrW3JiajUSte/AiInYriIiAIiIBjERBJkIiIIEREAREQBERAE+ZR0E+xAOBvzWy4JwPlPTX2F1LfqgyvJMe0fEgLQp39Koz265QE++qJCKOha50zX9+syta82Y8I2tBHFWfLPVmt92mpJOgAA1JJ0AHGS7dnYaU6gbEa1rBlpDxCkDwapbTObcToLWW+pPhsDZa0qPwuscrEDuQRcoH8IYJa7VWzWUeYFrkidbDhUx2GwmM+LTEUqjpSDHMXUplGJqA+NmXNdb5dLeLQyvCty4LkpKPJv47buEom1WvTVr2y3zNfplW5v5WmlX3sw6kjLVJAuRZUOt7fjWW3AywP5Mod0aIpIKZUrlUBRY6aAcJxN3dnYVcVjRSSmCtdAyqANe5pMCwH1iB6jOvuy8nP1vkRRN8KZFxRq8L+nhv4axnjgt4KVLMi4LGIufMSwQIC/zS9QWGnAeyWnUoKylSoykWI8py9k0lbEYp9CBUWmOB9FAzfrVCPZPXu6I9ZkTG1sPXRkyu2YFe6dSjVBbxCnnstTQ/JJnrunUT4KlNGzCjejc8T3ei5xYWfLlzAjQ3HKdrfHGYM4GstSpRuyMKYLAN3lvi8g9LOGsRl1GlpHd1amY1ipLqXHxmUr3jLmTMwIHjyLTVtBqvAXtO2mh6c8LuVda+urL7EgiImgZAiIgCIiAIiIBjERBJkIgRBAiIgCIiAIiIAiIgFbdp2KYYqgALqirnPzRWZkBPrZF904uyaK1a9Kg1rPWykHXMoZmce1UYSZ7/AOyA+Cx1RtWajTy2vcCgS6D153bh1ErvYW1VpPhcTVIAXEIKh5AOjoW9Xxmb2zN1Vf4s+TZ0Vma8eCZ71bw4yhWwWMpYc1MJTJesq2ZgxzIwYW8JQE2bhmuDbnWHaJve20NotiaZZUSy4exIZVQkq2nBixLeV/KX9S2eq1TUpsy5tXUEFHPzip4N5ra+l7zjba3G2fiWztRCVL37ylZGv1ItlY/WBleu5RWMFuVeXkhWx98Nu4illq40ogXxMEpq1rfKcLfNboQepnC+GVEqM9KtXUsdXFR1dud3ZSCbnXXrLAxe4bmn3dLEqq6elTJJt1IcDXnYC85y9nNUEFsTRsDqCjC/l6U4ynOTy2Xa/SgsIiuJ2hihYPisS11BIatVa19QCC3G1j7ZwNs4t6aDu2ZSzalSQdPMSy6+4TMzPUxtFbtfRLgeVzUHKaeN3I2Vb/SdpCy6+F6Kcet8xk1t9ScjzbODg1ErLdbEouNpNWYhSSrNfUZ1KZrnhbNe/lP0lsbGXVabKqsE8JQWpsq2UlB8i1xdDwvYFhrIbsTcjYrkNSw9WsvEVHNQJ1FrlQ4PkCJL9l0E7w92oWlSQ0UA4XuDUt1C5FX1hxyl6i1ytxH+TI1dcVVmXPY60RE0THEREAREQBERAMYiIJMogRBAiIgCIiAIiIAiIgHF3yNsBX+oB72USm9r4HwZLeB2AsORvZT9v3dJb2/jWwFTzqUR761OV3US4tM7WSxNGv7Pjmt/U3dyN7KmHRaGKN6YACOT6P0WJ5dCeVr252MMfTK5lzMMpJygk6C9rcbnl1tKkxOFDEEe3/Gc0bUx2Ca9E5qY/o2ucn+zIIIXyGg6Sl09T2L+enkvZHBAIIIIuCOYPAiY1qCOLOqsOjAEe4ypdk9qVepUp0u58TuqKc4IuxCi90va585YyDaPNMP7HJ/uxJVFj4R5lfXHlnvT2FhBU7wYeln5HIvh+qLWXztxmxSxI0sjBczi9rAZCRc9ASDaaITaJPDDKOudifd3f75mmw2fXE12qj5ig009oBJb3gHmJ0jpbZcrH1OM9bTFbPP0McLX74umHGWnmOeqosM1znFPq9+LcBrxOk7FCiqKEQAKoAAHIDhMqVNVUKoCqBYAAAADgABwEymnTTGpYRkajUSull8eBEROxwEREAREQBERAMYiIJMhERBAiIgCIiAIiIAiIgEW7RKwGGSnzqV09yXqXPldAPaJBp2N7tpCviiFN0og0wRwLkjvT52KqvrRus48yNXPqs27G7oq3CpZ77iYVKQbiJnErFs59DY1IYmhV4FcRSN+H9InG3H2iXlKar08ylbkXFgRxB5EeY4y2Ni7QGIw9OsPlL4h81ho6+xgR7JpaKeU0zK9oww4yRuxES8ZgiIgCIiAIiIAiIgCIiAYxEQSZCIEQQIiIAiIgCJHt5d8sHgmCVagNQ8EFyQPnVLA5V9hJ5AyD7S7Tq9V+6wVF6jnlTVteuXQ1HXzC0zIbO0KJz3RaeJxVOmAXYLc2F+LHoo4sfIayru0/e8M4wOStSQsjV3YZWKkBkUJ6Sg6E5rEW4T5hN3N58Zew+CIwFyzdyxHR3Gauw8mJnQbsJtQdqm0B3x1BKWp35hyWLG/ztPUZzlNPZv+i3XplB5e7I9SrUgAFZLAC1iOHK0zFZTwYSI7RwOK2bWNNzS4m2R0q02tzFjdePPKZs0d7D8uiPWrW+wj98z56SfMdzRjdHvsSgMOs+yPfzsp/wDdVPev+Mwbe1eVFvawH7jOfu1v7T16sPJJJpYvePE4ArUw9cAM/iov4lfSxYDipsBci3Aed41it6KzeiqJ+sfZfT7JI91ezytjn7zF4uhQQ8b1Kb1mHIKgayD61rfNM706eVcuqTwcrZxnHpxkt3dzbtHG4dK1EjxDxLcFkI0KsBwIPvFjznUlcv2Guh7zB7Ts3ySUKn9Ij3+ya9Zd6NmfjaYxlEWuV+N052ZQKo9bAiXlYmZk9I/0ss6JH90d51x1EVO6akxLKVJDDMls63FiGFwbEA2YHraQTonkqyi4vDEREHkREQBERAEREAxiIgkyiBEECIiAJH99d5qWAw4dyczuEUKFLa+myhjYlVuddL5QeMkErSj2p7PXE4lMXhHrIX7tGAp1B3a6W7t7CzNmYm+oK/NFvMm0tjvp6+uW/B5/y7usKrYhqLVxUALJUSo1ZagFrnO2R1YC5IJswNyc4t7U+2DAYdSmzNlZWY8LU6V+hK0gxY+U9amG3Px1ytRcLUPMFqFvzXBpfZN7analhNmH4PTwKvURV8dE0qVGoCBapTZM3hI5W0NxracNuMM1Dltt3e7Hj4jDHDoeaotLT61clvas8PwQbYxbZsfjk6jO9WuwPqNlHsM9Pwobfxn5Ds6yngy0qtX+0Nk94nw7C3wxf43EPRB61Uo/ZQF/fJ3XhA38H2C0V1rY9z/s6a0/tZmmeI7JdgU9Km0qyH6VfCr9hpznjsX2lW/K9pITz1rVv2yt5u4XsDoj8bj3b6lJU+9mkZ8yB8Tst3dPDalQ+rE4U/3c9R2RbBPDaNf9Phj/AHc9D2D4L/xmI91L/pnk3YLhvk46r7aaH94kZX7mMGa9jGyD6OPr/pMOfupz5V7CcEw+Kx1YHqwpOPcAv3zVqdgC/J2iR68OD91UTy/ALVU3p7SUHr3LL9oqmTn/ACJPaj2G16RLYfarI3VaTIfay1ptfzV3rwi3w20krgcEdszHy+OQj9YTT/A1tHh/Kxt/733Z5nS7GtoUvHR2uy1ORAqpr9YVCfsjq+f+iDEmvWLY3bDU8Fi8ED3CjLSFfMpIzlmbvFYqyeC3EywaNUMoZTcMoIPUEXEglHs9q4uo1XeDG+Kgq00NN6aK1PVwXqFQb3YjgDYDWSrdqrSOGRaLq9OmXpIysHDLRdqaMGGhuqA3857re+CnrI7KR1IiJ2KAiIgCIiAIiIBjERBJkIntiqBRiDw5HqJ4wnncSTTwxERBBwd+NsDCYGrVIJOiAA5SS5C6NrYgEm9jw4GR1u2DZFamFxOzKjWFspShVUAcAC7C/uEkG2tqbMXFU6O0nw/dik1QU665wzsciNYggZQKvH5wtwnxN1d1cWb0xg2PSjXKfqJUFvdOFjWd8mlpY4hnyRYY/c3Fnx0GwzH6NWkB6+6Jp++SXdjdrZuz6eIx2AqNi6PdXakvc1mulyDSbQggZrqTc+sAT2r9jOxnHgWul+aVSfdnzCRLbnY/jcG3wjZOJqMy65SRTq9fC4sr8PRIHtnj8L2TLJsYjtvxFZsmA2cWa2mYtUPtp01/ing23t8cUL0sM1EHpSp0v/0EmeWyu19sDhaWFfZ7fCaQyVA1qAuD4TkCk5iuW+g1vPcdpe8WI/JdmAKeBFCu/wCuWC/ZJx8gebbn724j8bjWp+RxJQe0UQYHY7ter+UbSQ9fHXq/tWmTYnfWt6KPTHQDCU/2zmnxt1t76vp4xk/rAX/liTl+UB+AbEHjtBP0Tn+OF7CMSPR2ig9VNx9zzH8HW9B47SPtxeJ/cs+/g43n/wDNP/t4r/pk9T/cD0bsX2kvobTX+2X7mM+Hsr2+vobVH6fFL9wMxXcDepeG02/+XiD96zL+au968Mczf1i/7SyMvygYN2Y7yctqKf61ih/BPNt1d7sOPi8VUqAfNxOf3CtaerbJ30XUVnb1VcOf2rQm099KPp0XqDoaeGf/AJVjGX8gYYDs62jteo1fauINGrRYUCvdoXYKoqA3Rgg/G8QDwk03a2JSwHeYOlWaoqFagLlSw70EFTlAt4qbG3nK9wuwt49rVqxqVHwy5x3qO1WilyijSiLs11A1Oh6yYbo7kjZFU0ziO9bEUizWXIF7llAsLkm/fHU9JMXut/4OGpWa2S2IidzLEREAREQBETOjSLGyjX7vMwSlnZHlE7X8lJ1/z74nL1oln3Ww9dpfiz/nkZwIiRTwTq/jQiInYqlGdsn+sv6vT+95X9WfIkLhmtT+Wi1ewP8AKT9Y/sz9CxEq2fEdERun/rat/u+H/aryTxE8EiIiQBERAE+NEQD7ERAOThPyzEf7Oj/eSqML/wBqsR/u7/esROlfxHK74GWJERLZkiIiAIiIAna2P6H+fOInK74SzpfzDfiIlU0j/9k=',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXLmsz4SlfVThziUTKVw_AMreYZfnFpaImLQXiPfhn2g&s',
  'https://static.vecteezy.com/system/resources/thumbnails/008/079/781/small_2x/nft-non-fungible-tokens-crypto-art-nft-blockchain-pixel-art-character-on-background-free-vector.jpg',
];

const RenderMintCard = ({ item }: any) => {
  const [imageSource, setImageSource] = useState('');

  const generateRandomImage = () => {
    const randomIndex =
      Math.floor(Math.random() * imageUrls.length);
    setImageSource(imageUrls[randomIndex]);
  };

  useEffect(() => {
    generateRandomImage();
  }, [])



  const { token, score, projectDetails } = item;
  console.log(projectDetails?.collectionName);
  const message = `have been minted more than ${score} times   
  the last ${interval} hours`;

  return (
    <View style={styles.container} className='text-center'>
      {token?.imageUrl ? (
        <Image source={{ uri: token?.imageUrl }} style={styles.image} />
      ) : (
        <Image source={{ uri: imageSource }} style={styles.image} />
      )}
      <Text style={styles.header}>{token?.name}</Text>
      <Text style={styles.body}>{message}</Text>
      <TouchableOpacity
        className={`flex-row items-center justify-center w-[40%] mx-auto
        mt-7  py-2 rounded-full bg-[#ADF802] text-black`}
      >
        <View className="flex-row items-center">
          {/* <FontAwesome name='heart' size={18} color="red" /> */}
          <Text
            className={` font-bold ml-4 text-lg`}
          >
            {"Mint"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 200,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
    textAlign: 'center'
  },
  body: {
    color: "#222",
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    marginTop: 10,
  }
})


const TrendingMintsSwiper = ({ data }: any) => {
  const [mints, setMintsData] = useState<any[]>([]);
  const isCarousel = React.useRef(null)


  const {
    data: queryData,
    error,
    loading,
  } = useQuery(TrendingQuery, {
    startTime: dayjs().subtract(interval, "h").format("YYYY-MM-DDTHH:mm:ss[Z]"),
    endTime: dayjs().format("YYYY-MM-DDTHH:mm:ss[Z]"),
    chain: "ethereum",
    limit,
    tokenType,
  });

  useEffect(() => {
    if (!loading && !error) {
      const mintsData =
        formatFunction(queryData)?.map((mint: any) => ({
          ...mint,
          chain: "ethereum",
        })) ?? [];
      // console.log(mintsData, "mintin")
      const scoredData = scoringFunction(mintsData);
      const filteredData = filterFunction(scoredData, 9); // only mints with more than  9 score are returned
      setMintsData(filteredData);
    }
  }, [loading, error, queryData]);
  console.log(mints);
  const SLIDER_WIDTH = Dimensions.get('window').width + 80
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

  return (
    <View>
      <Text className='text-whie text-[25px] font-nunito text-white border-b
      border-white border-dotted  my-5 mb-7 mx-auto'>Trending Mints </Text>
      <View className='flex flex-col
      bg-black/20 justify-center items-center'>

        <Carousel
          data={mints}
          renderItem={({ item }) => <RenderMintCard item={item} />}
          layout="default"
          layoutCardOffset={9}
          ref={isCarousel}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
        />
      </View>
    </View>

  );
};

export default TrendingMintsSwiper;

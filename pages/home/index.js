import React, { useState, useEffect, useRef, useContext } from 'react'
import {
	Layout,
	Dropdown,
	Space,
	Statistic,
	Badge,
	Menu,
	Popover,
	Spin,
	Modal,
} from 'antd'
const { Header, Content, Footer } = Layout
import { RocketTwoTone, DownOutlined } from '@ant-design/icons'
import md5 from 'js-md5'
import Images from 'next/image'
import { Base64 } from 'js-base64'
import { useRouter } from 'next/router'
import MyContext from '../../lib/context'
import PhoTable from '../component/PhoTable'
import Selector from '../component/Selector'
import NextBtn from '../component/NextBtn'
import style from './index.module.css'
import { logout } from '../../lib/auth'
import {
	fetchTaskHistory,
	fetchGameData,
	fetchGamePush,
	fetchTaskLast,
	fetchBmpImg,
	fetchJpgImg,
} from '../api/index'
export default function Home() {
	const { user, isLoggedIn, setUser } = useContext(MyContext)
	const [start, setStart] = useState(false)
	const [showPic, setShowPic] = useState(true)
	const [modelText, setModelText] = useState('0')
	const [num, setNum] = useState(0)
	const [result, setResult] = useState([])
	const [timers, setTimers] = useState([])
	const [level, setLevel] = useState(1)
	const [resultObj, setResultObj] = useState({})
	const [gameData, setGameData] = useState([])
	const [historyData, setHistoryData] = useState([])
	const [rate, setRate] = useState('')
	const [startDate, setStartDate] = useState(0)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [spinning, setSpinning] = useState(true)
	const [times, setTimes] = useState(0)
	const saveCallBack = useRef()
	const router = useRouter()
	const callBack = () => {
		setNum(num + 1)
	}
	useEffect(() => {
		if (!isLoggedIn) {
			router.push('/')
		}
	}, [isLoggedIn])

	useEffect(() => {
		saveCallBack.current = callBack
		return () => {}
	})
	useEffect(() => {
		fetchTaskLast().then((res) => {
			if (res.success) {
				setLevel(res.msg.level)
				const val = JSON.stringify({
					level: res.msg.level,
					verification: 'GET_MIX_256',
				})
				const key = md5(val)
				fetchGameData({ level: res.msg.level, getKey: key })
					.then(async (res) => {
						const data = JSON.parse(Base64.decode(res.msg.data))
						for (let i = 0; i < 20; i++) {
							var img = new Image()
							img.src = `http://124.223.223.225/imgs/negative/NEGATIVE_${i}.JPG`
							await callFunction(img)
						}
						var img1 = new Image()
						for (let i = 0; i <= 20; i++) {
							var img1 = new Image()
							img1.src = `http://124.223.223.225/imgs/neutral/NEUTRAL_${i}.bmp`
							await callFunction(img1)
						}
						setStartDate(new Date().getTime())
						setGameData(data)
					})
					.then(() => {
						setSpinning(false)
						!times && setIsModalVisible(true)
					})
				fetchTaskHistory().then((res) => {
					setHistoryData(res.msg)
				})
			}
		})
	}, [level, times])

	useEffect(() => {
		if (showPic && num > 1 + (level - 1) * 2) {
			const obj = {}
			Object.keys(resultObj)
				.sort()
				.map((key) => {
					obj[key] = resultObj[key]
				})
			result[Math.trunc(num / 2) - 2 - (level - 1)] = obj
			setResultObj({})
		}
		if (num === 42 + (level - 1) * 2) {
			const duration = new Date().getTime() - startDate
			const val = JSON.stringify({
				data: result,
				duration: duration,
				level: level,
				verification: 'PUSH_MIX_256',
			})
			fetchGamePush({
				data: result,
				level: level,
				duration: duration,
				pushKey: md5(val),
			}).then((res) => {
				setRate(res.msg.rate)
			})
		}
		if (start && num <= 41 + (level - 1) * 2) {
			const tick = () => {
				saveCallBack.current()
				setShowPic(!showPic)
			}
			const timer = setInterval(tick, !showPic ? 2000 : 1000)
			timers.push(timer)
			setTimers(timers)
			return () => {
				clearInterval(timer)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [num, start, isLoggedIn])

	function callFunction(img) {
		return new Promise((resolve, reject) => {
			img.onload = () => {
				resolve(true)
			}
		})
	}

	const selectRes = (type, val) => {
		resultObj[type] = val
	}

	const nextLevel = () => {
		setLevel(1)
		setStart(false)
		setNum(0)
		setTimes(times + 1)
		if (rate > 80) {
			setModelText('1')
			setIsModalVisible(true)
		}
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}
	const menu = (
		<Menu>
			<Menu.Item
				key={2}
				danger={true}
				onClick={() => {
					logout()
					setUser(null)
				}}
			>
				退出登陆
			</Menu.Item>
		</Menu>
	)
	const content = (
		<div
			style={{
				maxHeight: '140px',
				overflow: 'scroll',
			}}
		>
			{historyData.map(({ taskTime, number }, index) => (
				<div
					key={index}
					style={{
						display: 'flex',
						alignItems: 'center',
						marginBottom: '5px',
					}}
				>
					<Badge
						className="site-badge-count-109"
						count={number}
						style={{
							margin: '4px',
							backgroundColor: number >= 20 ? '#52c41a' : '',
						}}
					/>
					<span className={style.date}>{taskTime} </span>
				</div>
			))}
		</div>
	)

	return (
		<Spin tip="Loading..." spinning={spinning}>
			<Layout style={{ height: '100vh' }}>
				<style jsx>{`
					.site-layout-background {
						background: #fff;
					}
					.button {
						width: 100%;
						display: ${!start ? 'flex' : 'none'};
						padding: 20px;
						justify-content: center;
					}
					.suffix {
						font-size: 18px;
						color: #4aa3f8;
					}
				`}</style>
				<Header
					style={{
						zIndex: 1,
						width: '100%',
						padding: '0 30px',
						background: '#fff',
						height: 'auto',
					}}
				>
					<div className={style.headerContent}>
						<div className={style.logo}>N-back</div>
						<Statistic
							title="进度"
							value={` ${
								Math.trunc((num + 1 - level * 2) / 2) > 0
									? Math.trunc((num + 1 - level * 2) / 2)
									: 0
							} /20`}
							suffix={<span className="suffix">{` ^ ${level}`}</span>}
							style={{
								textAlign: 'center',
							}}
							prefix={<RocketTwoTone />}
						/>
						<Dropdown overlay={menu}>
							<a
								style={{
									width: '120px',
									textAlign: 'end',
								}}
								onClick={(e) => e.preventDefault()}
							>
								<Space>
									{user?.name}
									<DownOutlined />
								</Space>
							</a>
						</Dropdown>
					</div>
				</Header>
				<Content
					className="site-layout"
					style={{
						marginTop: 15,
					}}
				>
					<div
						className="site-layout-background"
						style={{
							padding: 24,
							height: '100%',
						}}
					>
						{showPic && num <= 40 + (level - 1) * 2 && (
							<PhoTable data={gameData[Math.trunc(num / 2)]} />
						)}
						{!showPic && num > 2 * level && <Selector selectRes={selectRes} />}
						{num > 40 + (level - 1) * 2 && (
							<NextBtn rate={rate} nextLevel={nextLevel} />
						)}
						<div className="button">
							<button
								className={style.button}
								onClick={() => {
									setStartDate(new Date().getTime())
									setStart(true)
								}}
							>
								开始！
							</button>
						</div>
					</div>
				</Content>
				<Footer
					style={{
						textAlign: 'center',
						fontWeight: 500,
					}}
				>
					记忆测试 ©2022
				</Footer>
				<div className={style.fixed}>
					<Popover placement="topRight" content={content} title="历史记录">
						<div>
							<Images
								alt="ll"
								width={50}
								height={50}
								src={'/images/hover.png'}
								style={{
									opacity: '.7',
								}}
							/>
						</div>
					</Popover>
				</div>
				<Modal
					title={
						modelText === '0' ? '请认真阅读程序规则！' : '您已进入下一个等级'
					}
					visible={isModalVisible}
					footer={null}
					onCancel={handleCancel}
				>
					{modelText === '0' ? (
						<div>
							<p>
								1、接下来会不断呈现闪烁的图片和中心的文字，您需要判断当前呈现的图片位置和中心呈现的文字是否与前n个一致。
							</p>
							<p>
								2、在n=1时，需判断当前呈现图片位置和前1个图片位置是否一致，以及中心文字颜色和前1个是否一致。
							</p>
							<p>3、位置一致按F键，颜色一致按J键，请尽量做的又快又好。</p>
						</div>
					) : (
						<div>
							<p>{`1、您需要判断当前呈现的图片位置和中心呈现的文字是否与前面第${level}个一致。`}</p>
							<p>2、位置一致按F键，颜色一致按J键。</p>
						</div>
					)}
				</Modal>
			</Layout>
		</Spin>
	)
}

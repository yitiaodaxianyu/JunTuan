local _M = {}

local musicName = nil
local musicID = nil
local musicVolume = 0
local soundsVolume = 0

-- 暂停音效
function _M.pauseSound(id)
	ccexp.AudioEngine:pause(id)
end
-- 暂停音乐
function _M.pauseMusic()
	if musicID then
		ccexp.AudioEngine:pause(musicID)
	end
end
-- 继续音效
function _M.resumeSound(id)
	ccexp.AudioEngine:resume(id)
end
-- 继续音乐
function _M.resumeMusic()
	if musicID then
		ccexp.AudioEngine:resume(musicID)
	end
end
-- 停止播放音效
function _M.stopSound(id)
	ccexp.AudioEngine:stop(id)
end
-- 停止播放音乐
function _M.stopMusic()
	if musicID then
		ccexp.AudioEngine:stop(musicID)
		musicID = nil
	end
end
-- 设置音效音量
function _M.setSoundsVolume(volume)
	soundsVolume = volume
end
-- 设置音乐音量
function _M.setMusicVolume(volume)
	musicVolume = volume
	if musicID then
		ccexp.AudioEngine:setVolume(musicID, musicVolume)
	end
end
-- 播放音效
function _M.playSound(name, isLoop, callback)
	local soundID = ccexp.AudioEngine:play2d(name, isLoop or false, soundsVolume)
	if callback then
		ccexp.AudioEngine:setFinishCallback(soundID, callback)
	end
	return soundID
end
-- 播放音乐
function _M.playMusic(name, isLoop, callback)
	if musicID then
		if musicName ~= name then
			_M.stopMusic()
			musicID = ccexp.AudioEngine:play2d(name, isLoop or true, musicVolume)
		end
	else
		musicID = ccexp.AudioEngine:play2d(name, isLoop or true, musicVolume)
	end
	if callback then
		ccexp.AudioEngine:setFinishCallback(musicID, callback)
	end
	return musicID
end

return _M
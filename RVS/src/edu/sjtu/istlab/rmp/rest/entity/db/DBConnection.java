package edu.sjtu.istlab.rmp.rest.entity.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import edu.sjtu.istlab.rmp.resource.metamodel.entity.AttributeColumn;
import edu.sjtu.istlab.rmp.resource.metamodel.entity.Condition;
import edu.sjtu.istlab.rmp.resource.metamodel.entity.ResourceBase;
import edu.sjtu.istlab.rmp.rest.entity.exception.RmpResourceException;
import edu.sjtu.istlab.rmp.rest.entity.exception.RmpSQLException;
import edu.sjtu.istlab.rmp.rest.entity.instance.AbstractBase;

/**
 * 
 * @author Xcc
 * 
 */
public abstract class DBConnection {
	protected ResourceBase _metaModel;
	protected AbstractBase _resourceInstance;
	protected Connection connection;
	protected PreparedStatement preparedStatement;
	protected static Map<String, Connection> _connectionsMap = new HashMap<String, Connection>();
	protected static final String LIMIT = " LIMIT 2000";

	

	public DBConnection(AbstractBase resourceInstance) {
		_metaModel = resourceInstance.getMetaModel();
		_resourceInstance = resourceInstance;
	}

	/**
	 * 
	 * @return 瀹屾垚鍒涘缓鏃惰繑鍥濼RUE
	 * @throws RmpSQLException 涓�埇鎯呭喌涓嬶紝璁板綍宸插瓨鍦ㄦ椂鍑虹幇姝ゅ紓甯�
	 */
	public Boolean INSERT_SINGLE() throws RmpSQLException {
		String sql = "INSERT INTO `" + getTableName() + "` (";
		String pkValue = _resourceInstance.getKeyValue()[0];

		List<String> orderedValues = new ArrayList<String>();
		Map<String, String> valuseMap = new HashMap<String, String>();
		if (!_resourceInstance.getRecords().isEmpty()) {
			valuseMap = _resourceInstance.getRecords();
		}
		List<AttributeColumn> columns = _metaModel.getAllAttributeColumns();
		for (int i = 0; i < columns.size(); i++) {
			sql = sql + "`" + columns.get(i).getColumnName() + "`,";
			orderedValues.add(valuseMap.get(columns.get(i).getColumnName()));
		}
		sql = sql + "`primarykey`) VALUES (";
		for (int i = 0; i < orderedValues.size(); i++) {

			if (_metaModel.getColumn(columns.get(i).getColumnName()).getType().equalsIgnoreCase("string")) {
				sql = sql + "'" + orderedValues.get(i) + "',";
			}
			else {
				sql = sql + orderedValues.get(i) + ",";
			}
		}
		sql = sql + "'" + pkValue + "') ";
		System.out.println("INSERT_SINGLE: " + sql);
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.executeUpdate();
			return true;
		}
		catch (SQLException e) {
			throw new RmpSQLException(e.getMessage(), e.getSQLState(), sql, getTableName(), pkValue);
		}
	}

	/**
	 * 
	 * @return 瀹屾垚鍒涘缓鏃惰繑鍥濼RUE
	 * @throws RmpSQLException 涓�埇鎯呭喌涓嬶紝璁板綍宸插瓨鍦ㄦ椂鍑虹幇姝ゅ紓甯�
	 */
	public Boolean INSERT_ASSOCIATION() throws RmpSQLException {
		String sql = "INSERT INTO `" + getTableName() + "` (";
		String domianValue = _resourceInstance.getKeyValue()[0];
		String rangeValue = _resourceInstance.getKeyValue()[1];

		List<String> orderedValues = new ArrayList<String>();

		Map<String, String> valuseMap = new HashMap<String, String>();

		if (!_resourceInstance.getRecords().isEmpty()) {
			valuseMap = _resourceInstance.getRecords();
		}
		List<AttributeColumn> columns = _metaModel.getAllAttributeColumns();
		for (int i = 0; i < columns.size(); i++) {
			sql = sql + "`" + columns.get(i).getColumnName() + "`,";
			orderedValues.add(valuseMap.get(columns.get(i).getColumnName()));
		}
		sql = sql + "`domainkey`,`rangekey`) VALUES (";
		for (int i = 0; i < orderedValues.size(); i++) {

			if (_metaModel.getColumn(columns.get(i).getColumnName()).getType().equalsIgnoreCase("string")) {
				sql = sql + "'" + orderedValues.get(i) + "',";
			}
			else {
				sql = sql + orderedValues.get(i) + ",";
			}
		}
		sql = sql + "'" + domianValue + "','" + rangeValue + "') ";
		System.out.println("INSERT_ASSOCIATION: " + sql);
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.executeUpdate();
			return true;
		}
		catch (SQLException e) {
			throw new RmpSQLException(e.getMessage(), e.getSQLState(), sql, getTableName(), domianValue + AbstractBase.SPLIT + rangeValue);

		}
	}

	/**
	 * 
	 * @return
	 * @throws RmpResourceException 
	 * @throws RmpSQLException 
	 */
	public Boolean UPDATE_SINGLE() throws RmpResourceException, RmpSQLException {

		String pkValue = _resourceInstance.getKeyValue()[0];
		List<AttributeColumn> columns = _metaModel.getAllAttributeColumns();
		Map<String, String> valuseMap = _resourceInstance.getRecords();

		String sql = "UPDATE  `" + getTableName() + "` SET    ";
		if (columns.size() == 0) {
			return false;
		}

		for (int i = 0; i < columns.size(); i++) {

			// 浠庡鎴风鎻愪氦鐨勬洿鏂拌祫婧愬彲浠ユ槸鍏冩ā鍨嬬殑涓�釜瀛愰泦銆傚嵆锛氫笉闇�濉弧鍏冩ā鍨嬩腑瀹氫箟鐨勫瓧娈点�
			String tempValue = valuseMap.get(columns.get(i).getColumnName());
			if (columns.get(i).getType().equalsIgnoreCase("string")) {
				if (tempValue != null) {
					sql = sql + "`" + columns.get(i).getColumnName() + "`='" + tempValue + "',";
				}
			}
			else {
				if (tempValue != null) {
					sql = sql + "`" + columns.get(i).getColumnName() + "`=" + tempValue + ",";
				}
			}
		}
		sql = sql.substring(0, sql.length() - 1);
		sql = sql + " WHERE primarykey='" + pkValue + "'";

		sql = sql + addConditions();

		System.out.println("UPDATE_SINGLE: " + sql);
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.executeUpdate();
			return true;
		}
		catch (SQLException e) {
			throw new RmpSQLException(e.getMessage(), e.getSQLState(), sql, getTableName(), pkValue);
		}
	}

	/**
	 * 
	 * @return
	 * @throws RmpResourceException 
	 * @throws RmpSQLException 
	 * 
	 */
	public Boolean UPDATE_ASSOCIATION() throws RmpResourceException, RmpSQLException {

		String domianValue = _resourceInstance.getKeyValue()[0];
		String rangeValue = _resourceInstance.getKeyValue()[1];
		Map<String, String> valuseMap = _resourceInstance.getRecords();
		List<AttributeColumn> columns = _metaModel.getAllAttributeColumns();
		String sql = "UPDATE  `" + getTableName() + "` SET    ";
		if (columns.size() == 0) {
			return false;
		}
		for (int i = 0; i < columns.size(); i++) {

			// 浠庡鎴风鎻愪氦鐨勬洿鏂拌祫婧愬彲浠ユ槸鍏冩ā鍨嬬殑涓�釜瀛愰泦銆傚嵆锛氫笉闇�濉弧鍏冩ā鍨嬩腑瀹氫箟鐨勫瓧娈点�
			String tempValue = valuseMap.get(columns.get(i).getColumnName());
			if (columns.get(i).getType().equalsIgnoreCase("string")) {
				if (tempValue != null) {
					sql = sql + "`" + columns.get(i).getColumnName() + "`='" + tempValue + "',";
				}
			}
			else {
				if (tempValue != null) {
					sql = sql + "`" + columns.get(i).getColumnName() + "`=" + tempValue + ",";
				}
			}
		}
		sql = sql.substring(0, sql.length() - 1);
		sql = sql + " WHERE domainkey='" + domianValue + "' AND rangekey='" + rangeValue + "'";
		sql = sql + addConditions();
		System.out.println("UPDATE_ASSOCIATION: " + sql);
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.executeUpdate();
			return true;
		}
		catch (SQLException e) {
			throw new RmpSQLException(e.getMessage(), e.getSQLState(), sql, getTableName(), domianValue + AbstractBase.SPLIT + rangeValue);

		}
	}

	public Boolean DELETE_SINGLE() throws RmpResourceException, RmpSQLException  {
		String pkValue = _resourceInstance.getKeyValue()[0];

		String sql = "DELETE  FROM `" + getTableName() + "` WHERE primarykey='" + pkValue + "'";
		sql = sql + addConditions();
		System.out.println("DELETE_SINGLE: " + sql);
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.executeUpdate();
			return true;
		}
		catch (SQLException e) {
			throw new RmpSQLException(e.getMessage(), e.getSQLState(), sql, getTableName(), pkValue);
		}
	}

	public Boolean DELETE_ASSOCIATION() throws RmpSQLException, RmpResourceException{
		String domianValue = _resourceInstance.getKeyValue()[0];
		String rangeValue = _resourceInstance.getKeyValue()[1];

		String sql = "DELETE  FROM `" + getTableName() + "` WHERE domainkey='" + domianValue + "' AND rangekey='" + rangeValue + "'";
		sql = sql + addConditions();
		System.out.println("DELETE_ASSOCIATION: " + sql);
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.executeUpdate();
			return true;
		}
		catch (SQLException e) {
			throw new RmpSQLException(e.getMessage(), e.getSQLState(), sql, getTableName(), domianValue + AbstractBase.SPLIT + rangeValue);
		}
	}

	protected Boolean isFuzzy(List<Condition> conditions) {
		for (Condition condition : conditions) {
			if (condition.getVariable().equalsIgnoreCase("fuzzy")) {
				conditions.remove(condition);
				if (condition.getValue().equalsIgnoreCase("1")) {
					return true;
				}
				else {
					return false;
				}
			}
		}
		return false;
	}

	/**
	 * 
	 * `username`='xx' AND `password`='asdopsaud' 
	 * @see createConditions()
	 * @return Where 璇彞
	 * @throws RmpResourceException 
	 * @throws Exception 
	 */
	protected String addConditions() throws RmpResourceException{
		String sql = "";
		List<Condition> conditions = _resourceInstance.getConditions();
		// 鍒ゆ柇鏄惁涓烘ā绯婃潯浠讹紝骞朵笖绉婚櫎璇ュ弬鏁�
		Boolean isfuzzy = isFuzzy(conditions);
		for (Condition condition : conditions) {
			//濡傛灉condition鏄腑鐨勫弬鏁板湪鍏冩ā鍨嬩腑娌℃湁瀵瑰簲鐨勫睘鎬э紝闇�鍒ゆ柇銆�
			if(_metaModel.getColumn(condition.getVariable()) == null) {
				//鍏冩ā鍨嬩腑涓嶄細瀹氫箟domainkey锛宺angekey锛屽拰primarykey锛岄渶瑕佹帓闄ゃ�
				if (condition.getVariable().equalsIgnoreCase("domainkey")||condition.getVariable().equalsIgnoreCase("rangekey")||condition.getVariable().equalsIgnoreCase("primarykey")) {
					sql = sql + " AND `" + condition.getVariable() + "`" + condition.getSymbol() + "'" + condition.getValue() + "'";
				}
				//闄ゆ涔嬪锛屽叾浠栦换浣曟病鏈夎瀹氫箟鐨勫弬鏁板鏋滃嚭鐜板湪鏉′欢涓紝鍒欐姏鍑哄紓甯搞�
				else{
					throw new RmpResourceException( "The attribute '" + condition.getVariable() + "' is not existed in '"+_metaModel.getName()+"'", 351);
				}			
			}
			//浠ヤ笅鐨勫弬鏁伴兘鏄彲浠ユ帴鏀剁殑銆�
			//鍒ゆ柇鏄惁鏄ā绯婃煡璇�
			else if(isfuzzy) {
				if (!_metaModel.getColumn(condition.getVariable()).getType().equalsIgnoreCase("string")) {
					sql = sql + " AND `" + condition.getVariable() + "`" + condition.getSymbol() + condition.getValue();
				}
				else {
					sql = sql + " AND `" + condition.getVariable() + "` LIKE '%" + condition.getValue() + "%'";
				}
			}
			//濡傛灉涓嶆槸妯＄硦鏌ヨ
			else {
				if (!_metaModel.getColumn(condition.getVariable()).getType().equalsIgnoreCase("string")) {
					sql = sql + " AND `" + condition.getVariable() + "`" + condition.getSymbol() + condition.getValue();
				}
				else {
					sql = sql + " AND `" + condition.getVariable() + "`" + condition.getSymbol() + "'" + condition.getValue() + "'";
				}
			}
		}
		return sql;
	}

	/**
	 * creates connection object
	 * 
	 * @throws SQLException if connection failed
	 * @throws ClassNotFoundException 
	 */
	public Connection openConnection() throws SQLException, ClassNotFoundException{

		Class.forName(_metaModel.getDriver());

		String dburl = "jdbc:mysql://" + _metaModel.getDBURL().split("/")[0] + ":50003/" + _metaModel.getDBURL().split("/")[1];
		this.connection = _connectionsMap.get(dburl);

		if (this.connection == null) {
			this.connection = DriverManager.getConnection(dburl, _metaModel.getUserName(), _metaModel.getPassword());
			_connectionsMap.put(dburl, this.connection);
		}
		return connection;
	}

	/**
	 * Closes database connection
	 */
	public void closeConnection() {
		String dburl = "jdbc:mysql://" + _metaModel.getDBURL().split("/")[0] + ":50003/" + _metaModel.getDBURL().split("/")[1];
		if (this.connection != null) {
			try {
				this.preparedStatement.close();
				this.connection.close();
				_connectionsMap.remove(dburl);
			}
			catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	protected String getTableName() {
		return _metaModel.getTableName();
	}

	protected String getOwnerSQL() throws Exception {

		List<ResourceBase> temp = _metaModel.getOwnerPath().getResourceList();

		if (temp.isEmpty()) {
			if (_metaModel.isAssociationResource()) {
				return "SELECT domainkey FROM (SELECT domainkey FROM `" + _metaModel.getTableName() + "` T1) T2";
			}
			return "SELECT primarykey FROM (SELECT primarykey FROM `" + _metaModel.getTableName() + "` T1) T2";
		}

		String result = "SELECT  primarykey FROM (SELECT primarykey,`username` FROM `" + temp.get(0).getTableName() + "` T1) T2 WHERE `username`='" + _resourceInstance.getRequest().getUserName() + "'";
		for (int i = 0; i < temp.size(); i++) {
			ResourceBase tempObject = temp.get(i);
			if (i < temp.size()) {
				if (tempObject.isAssociationResource()) {
					String assString = "SELECT  rangeKey FROM `" + tempObject.getTableName() + "` WHERE domainKey IN ";
					result = assString + "(" + result + ")";
				}
			}
		}
		return result;
	}

}
